//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../context/app_context';

// create a component
const Home = () => {

    const { user } = useAppContext();


    return (
        <View style={styles.container}>
            <Text>Welcome {user}!</Text>
        </View>
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
export default Home;
