import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ initialStae, reducer, children }) => {
  <StateContext.Provider value={useReducer(reducer, initialStae)}>
    {children}
  </StateContext.Provider>;
};

export const useStateProvider = () => useContext(StateContext);
