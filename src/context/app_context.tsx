import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

const AppContext = createContext<any | null>(null);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({children}: any) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    // AsyncStorage.getItem('context-counter').then(counter_value => {
    //   if (counter_value) {
    //     setCounter(Number(counter_value));
    //   }
    // });
  }, []);

  const updateUser = (username: any) => {
    console.log(`Username changed to: ${username}`)
    setUser(username);
  };

  return (
    <AppContext.Provider value={{user, updateUser}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
