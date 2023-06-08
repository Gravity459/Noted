//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';

// create a component
const SignInOptions = ({navigation}: any) => {

  const loadLogin = () => {
    console.log('Login Pressed!');
    navigation.navigate('Login Register', {component_name: 'Login'});
    console.log('well hello there!')
  };
  
  const loadRegister = () => {
    console.log('Register Pressed!');
    navigation.navigate('Login Register', {component_name: 'Register'});
  };

  return (
    <View style={styles.container}>
      <View style={styles.empty}></View>

      <View style={styles.app_name_container}>
        <Text style={styles.app_name}>Noted!</Text>
      </View>

      <View style={styles.buttons_container}>
        <TouchableOpacity onPress={loadLogin} style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={loadRegister} style={styles.button}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>

        
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
    backgroundColor: 'orange',
  },

  empty: {
    width: '100%',
    height: '33%',
    // backgroundColor: 'white',
  },

  app_name_container: {
    width: '100%',
    height: '33%',
    //   backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },

  app_name: {
    fontSize: 40,
    paddingBottom: 30,
    color: 'white',
  },

  buttons_container: {
    width: '100%',
    height: '33%',
    // backgroundColor: 'blue',
    alignItems: 'center',
  },

  login_button: {
    width: '50%',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'blue',
  },

  register_button: {
    width: '50%',
  },

  button: {
    width: '50%',
    backgroundColor: '#841584',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    
  },
  buttonText: {
    color: 'white',
  },
});

//make this component available to the app
export default SignInOptions;
