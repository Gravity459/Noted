//import liraries
import React, {Component, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNotesContext } from '../context/notes_context';
import { useAppContext } from '../context/app_context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const UpdateNote = ({navigation, route} : any) => {

    const { note } = route.params;


  const [title, setTitle] = useState(note.title);
  const [bodyText, setBodyText] = useState(note.text);

  const { user } = useAppContext();
  const { userNotes, updateUserNotes } = useNotesContext();
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const inputLines = Number((windowHeight*0.5).toFixed(0));

    
  




  const saveNote = () => {
    console.log('Saving the new note now');

    if(title === "")
    {
      setTitle("Untitled");
    }

    if(bodyText === "")
    {
        setBodyText("note is empty");
    }




    const noteData = {id: note.id, title: title, text: bodyText, favourite: note.favourite};


    const updatedNotes = userNotes.map((n:any) => {
        if(n.id === note.id)
        {
            return noteData;
        }
        else{
            return n;
        }
    })

    console.log(updatedNotes);
    const key = `${user.username}-notes`;
    AsyncStorage.setItem(key, JSON.stringify(updatedNotes));
    updateUserNotes(updatedNotes);

    console.log('All Notes have been saved!');
    navigation.goBack();

  };

  return (
    <View style={styles.container}>
      <View style={styles.upperLayer}>
        <View style={styles.title}>
          <TextInput
            style={{
              fontSize: 20,
              backgroundColor: 'antiquewhite',
              borderRadius: 15,
              paddingLeft: 10,
            }}
            value={title}
            onChangeText={newText => setTitle(newText)}
          />
        </View>

        <View style={styles.saveButton}>
          <TouchableOpacity onPress={saveNote}>
            <Icon name="save-alt" size={40} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.noteBody}>
        <TextInput
          editable
          multiline
          autoFocus={true}
          numberOfLines={inputLines}
          maxLength={1000}
          style={styles.noteInput}
          value={bodyText}
          placeholder='Type here...'
          onChangeText={newText => setBodyText(newText)}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },

  upperLayer: {
    height: '12%',
    // backgroundColor: 'blue',
    flexDirection: 'row',
    paddingTop: 10,
  },

  title: {
    width: '75%',
    paddingLeft: 20,
    justifyContent: 'center',
    // backgroundColor: 'orange',
  },

  saveButton: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
  },

  noteBody: {
    height: '85%',
    padding: 10,
    // backgroundColor: 'red',
  },

  noteInput: {
    width: '100%',
    // height: '100%',
    margin: 0,
    textAlignVertical: "top",
    fontSize: 18,
    backgroundColor: 'antiquewhite',
    alignItems: 'flex-start',
    borderRadius: 10,
    padding: 15,

  },
});

//make this component available to the app
export default UpdateNote;
