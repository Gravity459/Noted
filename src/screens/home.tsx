//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAppContext} from '../context/app_context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddNewNote from './add_note';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNotesContext } from '../context/notes_context';
import AsyncStorage from '@react-native-async-storage/async-storage';


// create a component
const Home = ({navigation}: any) => {
  const { user } = useAppContext();
  const { userNotes, updateUserNotes } = useNotesContext();

  const [notes, setNotes] = useState<any>([]);

  useEffect(() => {
    AsyncStorage.getItem(`${user}-notes`)
    .then((response:any) => {return JSON.parse(response)})
    .then(response => {
      console.log(response);

      if(response)
      {
        console.log("There were some notes");
        setNotes(response);
      }
      else
      {
        console.log("There were no notes");
        setNotes([]);
      }
    })
    .catch(err => console.log(err))
    .finally(() =>
      console.log("Notes are fetched")
    );
    
  }, [])

  useEffect(() => {
    console.log("notes are now in!");
    console.log(notes);
    console.log("did you see the notes!");
    

    if(notes)
    {
      console.log(notes);
      updateUserNotes(notes);
      console.log("notes were not empty");

    }
    else{
      console.log("notes were empty");
    }

  }, [notes])


  const displayNotes = () => {

  }




  const addNewNote = () =>{
    navigation.navigate('New Note');

  }

  return (
    <>
      <TouchableOpacity onPress={addNewNote}>
        <Text>Click Me for a New Note!</Text>
      </TouchableOpacity>

      {/* <FlatList renderItem={displayNotes} data={notes}> */}
      {/* </FlatList> */}
    
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Home;
