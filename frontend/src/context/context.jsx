import React, { useReducer } from "react";

const initialState = {
    token:'',
    logado: false,
    username: '',
    isSuperUser: null,
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
            return {...state, token: action.payload, logado:true, username: action.username, isSuperUser: action.isSuperUser};

        case 'logout':
            return {...state, token: '', logado: false, username: '', isSuperUser: null};

        default:
            return{...state};
    };
};