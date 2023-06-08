//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAppContext } from '../context/app_context';

// create a component
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {user, updateUser, updateSignedIn} = useAppContext();

  const [accountsRecords, setAccountsRecords] = useState<any>([]);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('accounts')
      .then((recordsObj: any) => {
        return JSON.parse(recordsObj);
      })
      .then((recordsObj: any) => {
        console.log(recordsObj);
        if (Object.keys(recordsObj).length != 0) {
          // console.log('something in records');

          setAccountsRecords(recordsObj.accounts);
        } else {
          setAccountsRecords([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(accountsRecords);
  }, [accountsRecords]);


  const checkCreds = () => {
    // console.log(username);
    // console.log(password);

    const records = [...accountsRecords]

    const resultCheck = records.map((credsPair) => {
      if(credsPair.username === username && credsPair.password === password)
      {
        console.log('Matched');
        console.log(credsPair.username);
        console.log(credsPair.password);
        updateUser(credsPair.username);
        updateSignedIn(true);
        return true;
      }
      else{
        return false;
      }
    })

    if(resultCheck.includes(true)) 
    {
      return true;
    }
    else{
      return false;
    }

  }

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
          secureTextEntry={true}
          style={{textDecorationLine: 'none'}}
          placeholder="Enter Password"
          value={password}
          onChangeText={newText => setPassword(newText)}
        />
      </View>

      <TouchableOpacity onPress={checkCreds} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {isLoading ? <ActivityIndicator color="orange" /> : <></>}
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
