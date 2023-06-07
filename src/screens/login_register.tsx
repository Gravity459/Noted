//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from '../components/login';
import Register from '../components/register';

// create a component
const LoginRegisterScreen = ({navigation, route}: any) => {

    // useEffect(() => {
    //     const { component_name } = route.params;
    //     navigation.setOptions({headerTitle: `${component_name}`})
    // }, [])





    return (
        <View style={styles.container}>
            {/* <Login /> */}
            <Register />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

//make this component available to the app
export default LoginRegisterScreen;
