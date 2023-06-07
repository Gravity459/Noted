//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// create a component
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.input_box}>
        <TextInput
          style={{textDecorationLine: 'none'}}
          placeholder="Enter Username"
          value={username}
          onChangeText={newText => setUsername(newText)}
        />
      </View>
      <View style={styles.input_box}>
        <TextInput
          style={{textDecorationLine: 'none'}}
          placeholder="Enter Password"
          value={password}
          onChangeText={newText => setPassword(newText)}
        />
      </View>

      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
  },

  input_box: {
    marginTop: 10,
    width: '98%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  button: {
    width: '50%',
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
});

//make this component available to the app
export default Login;
