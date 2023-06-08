//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAppContext} from '../context/app_context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddNewNote from './add_note';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNotesContext } from '../context/notes_context';
import AsyncStorage from '@react-native-async-storage/async-storage';


// create a component
const Home = ({navigation}: any) => {
  const { user } = useAppContext();
  const { userNotes, updateUserNotes } = useNotesContext();

  const [notes, setNotes] = useState<any>({});

  useEffect(() => {
    // AsyncStorage.getItem(`${user}-notes`)
    // .then((response:any) => {return JSON.parse(response)})
    // .then(response => {
    //   console.log(response);

    //   if(Object.keys(response).length != 0 && response)
    //   {
    //     setNotes(response);
    //   }
    //   else
    //   {
    //     setNotes({});
    //   }
    // })
    // .catch(err => console.log(err))
    // .finally(() =>
    //   console.log("Notes are fetched")
    // );
    
  }, [])

  useEffect(() => {
    console.log("notes are now in!");
    console.log(notes);

    updateUserNotes(notes);
  }, [notes])

  const addNewNote = () =>{
    navigation.navigate('New Note');

  }

  return (
    <>
      <TouchableOpacity onPress={addNewNote}>
        <Text>Click Me for a New Note!</Text>
      </TouchableOpacity>
    
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
