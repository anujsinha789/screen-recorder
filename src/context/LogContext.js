import React from "react";

const initialState = {
  loggedIn: false,
};

export const LogContext = React.createContext(initialState);

export const LogProvider = (props) => {
  const [loggedIn, dispatch] = React.useReducer((state, action) => {
    if (action.type === "change") return !state;
    else return state;
  }, initialState.loggedIn);
  return (
    <LogContext.Provider value={{ loggedIn, dispatch }}>
      {props.children}
    </LogContext.Provider>
  );
};
