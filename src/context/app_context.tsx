import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

const AppContext = createContext<any | null>(null);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({children}: any) => {
  const [user, setUser] = useState('gravity');
  const [isSignedIn, setSigned] = useState<boolean>(false);

  useEffect(() => {
    
    setSigned(true);

  }, []);

  const updateUser = (username: any) => {
    console.log(`Username changed to: ${username}`)
    setUser(username);
  };

  const updateSignedIn = (status: any) => {
    console.log(`Signed In status updated to ${status}`);
    setSigned(status);
  }

  return (
    <AppContext.Provider value={{user, updateUser, isSignedIn, updateSignedIn}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
