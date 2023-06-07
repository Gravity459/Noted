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
} from 'react-native';

// create a component
const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [emailRecords, setEmailRecords] = useState<any>([]);
  const [usernamesRecords, setUsernamesRecords] = useState<any>([]);
  const [accountsRecords, setAccountsRecords] = useState<any>([]);

  const [records, setRecords] = useState<any>({})

  useEffect(() => {
    AsyncStorage.getItem('records').then((recordsObj:any) => {
      
      return JSON.parse(recordsObj);

    }).then((recordsObj:any) => {

      setEmailRecords(recordsObj.emails);
      setUsernamesRecords(recordsObj.usernames);
      setAccountsRecords(recordsObj.accounts);

      setRecords({emails: emailRecords, usernames: usernamesRecords, accounts: accountsRecords});

    }).finally( () => { 
      console.log(records);
    })

  }, [password]);

  const checkEmail = () => {

    console.log('checking email')

    console.log(records)
    if (records.emails) {
      if (records['emails'].includes(email) == true) {
        Alert.alert(
          'Email Error',
          'Email is already registered. Try to Login instead!',
        );
        console.log('email is registered')
        return false;
      }
      console.log("it is a new email")
      return true;
    }
    console.log("there were no emails")
    return true;
  };

  const checkUsername = () => {

    console.log('checking username')

    if (records.usernames) {
      if (records.usernames.includes(username) == true) {
        Alert.alert(
          'Username Error',
          'Username is taken. Try a new username instead!',
        );
        console.log('username taken');
        return false;
      }
      console.log("usernames was empty")
      return true;
    }

    return true;
  };

const retrieveData = () => {

  AsyncStorage.getItem('records').then((recordsObj:any) => {
      
    return JSON.parse(recordsObj);

  }).then((recordsObj:any) => {

    const emailRecords = recordsObj.emails;
    const usernamesRecords = recordsObj.usernames;
    const accountsRecords = recordsObj.accounts;

    setRecords({emails: emailRecords, usernames: usernamesRecords, accounts: accountsRecords});

  }).finally( () => { 
    console.log(records);
  })

}

  const saveData = () => {

    retrieveData();
    const newRecords = records;
    
    if (checkEmail() && checkUsername()) {
      
      if(newRecords.emails) {
        
        newRecords.emails.append(email);
        newRecords.usernames.append(username);
        newRecords.accounts.append({emailAddress: email, password: password});
      }
      
      else 
      {
        newRecords.emails = [email];
        newRecords.usernames = [username];
        newRecords.accounts = [{emailAddress: email, password: password}];
      }
      
      AsyncStorage.setItem('records', JSON.stringify(newRecords));
      console.log(newRecords);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.input_box}>
        <TextInput
          style={{textDecorationLine: 'none'}}
          placeholder="Enter Email"
          value={email}
          onChangeText={newText => setEmail(newText)}
        />
      </View>
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

      <TouchableOpacity onPress={saveData} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
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
export default Register;
