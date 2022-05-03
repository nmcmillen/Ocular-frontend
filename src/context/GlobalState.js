import React, {
    createContext,
    useReducer,
    useContext,
  } from 'react';
  
  import jwtDecode from 'jwt-decode'
  
  let user = JSON.parse(localStorage.getItem('user'))


  // Check this to return the correct username instead of id
  // JSON web token to return more data per josh
  const initialState = {
    currentUser: user ? jwtDecode(user.access) : null,
    person: {}
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