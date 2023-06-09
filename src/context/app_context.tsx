import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

const AppContext = createContext<any | null>(null);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({children}: any) => {
  const [user, setUser] = useState({});
  const [isSignedIn, setSigned] = useState<boolean>(false);

  useEffect(() => {
    
    setSigned(false);

  }, []);

  const updateUser = (userData: any) => {
    console.log(`Username changed to: ${userData.username}`)
    setUser(userData);
  };

  const updateSignedIn = (status: any) => {
    console.log(`Signed In status updated to ${status}`);
    // setUser({});
    setSigned(status);
  }

  return (
    <AppContext.Provider value={{user, updateUser, isSignedIn, updateSignedIn}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
