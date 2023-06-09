//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAppContext} from '../context/app_context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddNewNote from './add_note';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNotesContext} from '../context/notes_context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const Home = ({navigation}: any) => {
  const {user} = useAppContext();
  const {userNotes, updateUserNotes} = useNotesContext();
  
  const [notes, setNotes] = useState<any>([]);

  useEffect(() => {
    const key = `${user.username}-notes`;

    console.log(`The key is : ${key}`)
    AsyncStorage.getItem(key)
      .then((response: any) => {
        return JSON.parse(response);
      })
      .then(response => {
        console.log(response);

        if (response) {
          console.log('There were some notes');
          setNotes(response);
        } else {
          console.log('There were no notes');
          setNotes([]);
        }
      })
      .catch(err => console.log(err))
      .finally(() => console.log('Notes are fetched'));

    // AsyncStorage.removeItem(`${user}-notes`);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed!');
      console.log(userNotes);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log('notes are now in!');
    console.log(notes);
    console.log('did you see the notes!');

    if (notes) {
      console.log(notes);
      updateUserNotes(notes);
      console.log('notes were not empty');
    } else {
      console.log('notes were empty');
    }
  }, [notes]);

  const displayNotes = (itemObject: any) => {
    const {index, item} = itemObject;

    var title = item.title;
    var text = item.text;

    if (title.length > 10) {
      title = title.substring(0, 10) + '...';
    }

    if (text.length > 20) {
      text = text.substring(0, 35) + '...';
    }

    const modifyNotesForFavorite = (item: any) => {
      console.log(item);

      const updatedNotes = userNotes.map((n: any) => {
        if (n.id === item.id) {
          const updatedItem = {
            id: item.id,
            title: title,
            text: item.text,
            favourite: !item.favourite,
          };
          return updatedItem;
        } else {
          return n;
        }
      });

      const key = `${user.username}-notes`;
      AsyncStorage.setItem(key, JSON.stringify(updatedNotes));
      updateUserNotes(updatedNotes);

    };

    const deleteNote = (item: any) => {
      console.log(item);

      const updatedNotes = userNotes.filter((note:any) => note.id !== item.id);

      const key = `${user.username}-notes`;

      AsyncStorage.setItem(key, JSON.stringify(updatedNotes));
      updateUserNotes(updatedNotes);
    };

    return (
      <View>
        <View style={styles.noteBox}>
          <View style={styles.noteTitle}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Update Note', {
                  note: item,
                })
              }>
              <Text style={{fontSize: 20}}>{title}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.noteText}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Update Note', {
                  note: item,
                })
              }>
              <Text>{text}</Text>
            </TouchableOpacity>
          </View>

          {item.favourite ? (
            <View style={styles.noteFavorite}>
              <TouchableOpacity
                onPress={() => {
                  modifyNotesForFavorite(item);
                }}>
                <Icon name="favorite" size={25} color={'red'} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.noteFavorite}>
              <TouchableOpacity
                onPress={() => {
                  modifyNotesForFavorite(item);
                }}>
                <Icon name="favorite-outline" size={25} color={'black'} />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.noteDelete}>
            <TouchableOpacity
              onPress={() => {
                deleteNote(item)
              }
              }>
              <Icon name="delete" size={25} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const addNewNote = () => {
    navigation.navigate('New Note');
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperLayer}>
        <View style={styles.title}>
          <Text style={{fontSize: 30, fontWeight: '600'}}>Home</Text>
        </View>

        <View style={styles.addNoteButton}>
          <TouchableOpacity onPress={addNewNote}>
            <Icon name="add" size={40} color={'orange'} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.notesContainer}>
        {
          userNotes.length > 0 ? (
            <FlatList renderItem={displayNotes} data={userNotes} />

          ) : 
          (
            <View style={{width: '100%', alignItems: 'center'}}>

            <Text
            >Add a new note by tapping '+'</Text>
            </View>
          )
        }
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: '100%',
    flexDirection: 'column',
  },

  upperLayer: {
    minHeight: 80,
    flexDirection: 'row',
    padding: 10,

    // backgroundColor: 'blue',
  },

  title: {
    width: '75%',
    // paddingLeft: 20,
    justifyContent: 'center',
    paddingLeft: 20,
    fontSize: 50,
    backgroundColor: 'orange',
    borderRadius: 10,
  },

  addNoteButton: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'yellow',
    marginLeft: 5,
    borderRadius: 10,
    backgroundColor: 'bisque',
  },

  notesContainer: {
    // height: 'auto',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    borderRadius: 10,

    backgroundColor: 'bisque',
  },

  noteBox: {
    width: '95%',
    height: 40,
    margin: 10,
    flexDirection: 'row',
    borderRadius: 5,

    alignItems: 'center',

    backgroundColor: 'goldenrod',
  },

  noteTitle: {
    marginLeft: 10,
    marginRight: 10,
    width: '20%',
    // backgroundColor: 'red',
  },

  noteText: {
    marginLeft: 10,
    marginRight: 10,
    width: '40%',
    // backgroundColor: 'blue',
  },

  noteFavorite: {
    marginLeft: 10,
    marginRight: 5,
    width: '10%',
    // backgroundColor: 'yellow',
  },

  noteDelete: {
    marginLeft: 5,
    marginRight: 10,
    width: '10%',
    // backgroundColor: 'green',
  },
});

//make this component available to the app
export default Home;
