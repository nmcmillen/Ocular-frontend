import React, {
    createContext,
    useReducer,
    useContext,
  } from 'react';
  
  import jwtDecode from 'jwt-decode'
  
  let user = JSON.parse(localStorage.getItem('user'))
  // set person to get the local storage here
  let person = JSON.parse(localStorage.getItem('person'))


  // Check this to return the correct username instead of id
  // JSON web token to return more data per josh
  const initialState = {
    currentUser: user ? jwtDecode(user.access) : null,
    // set person similar to current user with ? thing
    // @TODO: look at a ternary or if else statment so if person in storage is deleted
    // that you clear local storage and reload the page
    person
    // person: {}
  }
  
  const GlobalStateContext = createContext(initialState);
  const DispatchStateContext = createContext(undefined)
  
  export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
      (state, newValue) => ({ ...state, ...newValue }),
      initialState
    );
  
    return (
      <GlobalStateContext.Provider value={state}>
        <DispatchStateContext.Provider value={dispatch}>
          {children}
        </DispatchStateContext.Provider>
      </GlobalStateContext.Provider>
    )
  }
  
  export const useGlobalState = () => [
    useContext(GlobalStateContext),
    useContext(DispatchStateContext)
  ];