import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/home';
import LoginRegisterScreen from './src/screens/login_register';
import AppContextProvider from './src/context/app_context';

const Stack = createStackNavigator();

function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="MainPage" component={Home} />
          <Stack.Screen
            name="Login Register"
            options={{headerShown: true}}
            component={LoginRegisterScreen}
          />
          {/* <Stack.Screen
          name="Cities"
          component={CitiesList}
          options={{headerShown: true, title: 'Cites of a Country'}}
        /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}

export default App;
