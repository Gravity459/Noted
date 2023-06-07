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

// create a component
const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [emailsRecords, setEmailRecords] = useState<any>([]);
  const [usernamesRecords, setUsernamesRecords] = useState<any>([]);
  const [accountsRecords, setAccountsRecords] = useState<any>([]);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('accounts')
      .then((recordsObj: any) => {
        if(recordsObj)
        {
          return JSON.parse(recordsObj);
        }
      })
      .then((recordsObj: any) => {
        console.log(recordsObj);
        if (Object.keys(recordsObj).length != 0) {
          console.log('something in records');

          setEmailRecords(recordsObj.emails);
          setUsernamesRecords(recordsObj.usernames);
          setAccountsRecords(recordsObj.accounts);
        } else {
          setEmailRecords([]);
          setUsernamesRecords([]);
          setAccountsRecords([]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });

    // AsyncStorage.removeItem('accounts');
  }, []);

  useEffect(() => {
    console.log('wao');
    console.log(emailsRecords);
    console.log(usernamesRecords);
    console.log(accountsRecords);
  }, [emailsRecords, usernamesRecords, accountsRecords]);

  const checkEmail = () => {
    console.log('Checking Email Address');

    console.log(emailsRecords);
    if (emailsRecords) {
      if (emailsRecords.includes(email) == true) {
        Alert.alert(
          'Email Error',
          'Email is already registered. Try to Login instead!',
        );
        console.log('Email is already registered');
        return false;
      }
      console.log('It is a new Email');
      return true;
    }
    console.log('There were no Email Addresses previously');
    return true;
  };

  const checkUsername = () => {
    console.log('Checking Username');

    if (usernamesRecords) {
      if (usernamesRecords.includes(username) == true) {
        Alert.alert(
          'Username Error',
          'Username is taken. Try a new username instead!',
        );
        console.log('Username is already taken');
        return false;
      }
      console.log('This is a new Username');
      return true;
    }

    console.log('There were no Usernames previously');
    return true;
  };

  const saveData = () => {
    if (checkEmail() && checkUsername()) {
      if (emailsRecords) {
        // const newEmailRecords = [...emailsRecords, email]
        // const newUsernameRecords = [...usernamesRecords, username]
        // const newAccountRecords = [...accountsRecords, {emailAddress: email, password: password}]

        emailsRecords.push(email);
        usernamesRecords.push(username);
        accountsRecords.push({username: username, password: password});

        setEmailRecords(emailsRecords);
        setUsernamesRecords(usernamesRecords);
        setAccountsRecords(accountsRecords);

        // setEmailRecords(newEmailRecords);
        // setUsernamesRecords(newUsernameRecords);
        // setAccountsRecords(newAccountRecords);
      } else {
        setEmailRecords([email]);
        setUsernamesRecords([username]);
        setAccountsRecords([{username: username, password: password}]);
      }

      const updatedRecords = {
        emails: emailsRecords,
        usernames: usernamesRecords,
        accounts: accountsRecords,
      };

      AsyncStorage.setItem('accounts', JSON.stringify(updatedRecords));
      console.log(updatedRecords);
    } else {
      console.log('oh well something was wrong with username or email');
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
          secureTextEntry={true}
          style={{textDecorationLine: 'none'}}
          placeholder="Enter Password"
          value={password}
          onChangeText={newText => setPassword(newText)}
        />
      </View>

      <TouchableOpacity onPress={saveData} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
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
export default Register;
