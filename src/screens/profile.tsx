//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  DeviceEventEmitter,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useAppContext} from '../context/app_context';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const Profile = ({navigation}: any) => {
  const {user, updateSignedIn} = useAppContext();
  const [isEditing, setEditing] = useState(false);

  const [profilePicture, setProfilePicture] = useState<string | null>('');

  useEffect(() => {
    console.log("here is the user")
    console.log(user);
  }, [user])

  useEffect(() => {
    DeviceEventEmitter.addListener('event.pictureupdate', eventData =>
      updatePicture(eventData),
    );

    const key = `${user.username}-profilepicture`;
    AsyncStorage.getItem(key).then(pic => {
      if (pic) {
        setProfilePicture(pic);
      } else {
        setProfilePicture('');
      }
    });
    return () => {
      DeviceEventEmitter.removeAllListeners('event.pictureupdate');
    };
  }, []);

  const updatePicture = (newPicture: string) => {
    console.log({newPicture});

    if (newPicture) {
      setProfilePicture(newPicture);
      
      const key = `${user.username}-profilepicture`;
      AsyncStorage.setItem(key, newPicture);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Take Picture');
          }}
          style={{padding: 16}}>
          {profilePicture !== '' ? (
            <View style={styles.imageBox}>
              <Image
                source={{uri: 'data:image/png;base64,' + profilePicture}}
                resizeMode="contain"
                style={{height: 200, width: 200, borderRadius: 100}}
              />
            </View>
          ) : (
            <View style={styles.imageBox}>
              <Icon name="user" size={100} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfoContainer}>
        <View style={styles.usernameBox}>
          <Text>Username: </Text>
          <Text>{user.username}</Text>
        </View>

        <View style={styles.usernameBox}>
          <Text>Email: </Text>
          <Text>{user.email}</Text>
        </View>

        <View style={styles.usernameBox}>
          <TouchableOpacity onPress={() => {updateSignedIn(false)}}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },

  imageContainer: {
    width: '100%',
    height: '40%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageBox: {
    width: 250,
    height: 250,
    borderRadius: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileInfoContainer: {
    width: '100%',
    // height: '40%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  usernameBox: {
    // width: '100%',
    margin: 10,
    flexDirection: 'row',
    textAlign: 'center',

    // backgroundColor: 'red',
    padding: 10,

    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default Profile;
