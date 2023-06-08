//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from '../components/login';
import Register from '../components/register';

// create a component
const LoginRegisterScreen = ({navigation, route}: any) => {


    const [componentName, setComponentName] = useState("");

    useEffect(() => {
        const { component_name } = route.params;
        setComponentName(component_name);

        navigation.setOptions({headerTitle: `${component_name}`})
    }, [])


    useEffect(() => {
        console.log(`Component Name is set to ${componentName}`);
    }, [componentName])





    return (
        <View style={styles.container}>
            {
                (componentName == "Login") ? (
                    <Login />
                ) : (
                    <Register />
                )
            }
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
