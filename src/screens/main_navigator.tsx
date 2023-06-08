//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { useAppContext } from '../context/app_context';
import SignInOptions from './signin_options';
import LoginRegisterScreen from './auth/login_register';
import Login from '../components/login';
import MainHome from './home';
import Home from './home';

const Stack = createStackNavigator();

// create a component
const MainNavigator = () => {

    const { isSignedIn } = useAppContext();
    

    return (
        
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isSignedIn ? (
            <>
            <Stack.Screen name="Home Screen" component={Home} />
            </>
          ) : (
            <>
              <Stack.Screen 
              name="Auth Front" 
              component={SignInOptions} 
              />

              <Stack.Screen
                name="Login Register"
                options={{headerShown: true}}
                component={LoginRegisterScreen}
              />

            </>
          )}

        </Stack.Navigator>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default MainNavigator;
