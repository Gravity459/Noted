//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAppContext} from '../context/app_context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './home';
import Profile from './profile';
import NotesContextProvider from '../context/notes_context';

const Tab = createBottomTabNavigator();

// create a component
const MainPage = () => {
  const { user } = useAppContext();


  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
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
export default MainPage;
