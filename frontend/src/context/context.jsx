import React, { useReducer } from "react";

const initialState = {
    token:'',
    logado: false,
    username: '',
};

export const globalContext = React.createContext(initialState);

export const AppContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <globalContext.Provider value={{ state, dispatch }}>{children}</globalContext.Provider>
    );
};

export const reducer = (state, action) => {
    switch(action.type){
        case 'autentication':
            return {...state, token: action.payload, logado:true, username: action.username};

        case 'logout':
            return {...state, token: '', logado: false, username: ''};

        default:
            return{...state};
    };
};