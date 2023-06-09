
import {createContext, useContext, useEffect, useState} from 'react';

const AppContext = createContext<any | null>(null);

export const useNotesContext = () => useContext(AppContext);

const NotesContextProvider = ({children}: any) => {
  const [userNotes, setUserNotes] = useState<any>([]);


  const updateUserNotes = (notes: any) => {
    
    console.log("see now")
    console.log(notes);

    if(notes){

      console.log(notes);
      setUserNotes(notes);
    }
    else{
      
      console.log("the notes were undefined in the notes context")
      console.log(userNotes);
    }
  };

  return (
    <AppContext.Provider value={{userNotes, updateUserNotes}}>
      {children}
    </AppContext.Provider>
  );
};

export default NotesContextProvider;
