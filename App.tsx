import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginRegisterScreen from './src/screens/auth/login_register';
import AppContextProvider, {useAppContext} from './src/context/app_context';
import SignInOptions from './src/screens/signin_options';
import Home from './src/screens/main_navigator';
import MainNavigator from './src/screens/main_navigator';

const App = () => {

  return (
    <AppContextProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AppContextProvider>
  );
}

export default App;
