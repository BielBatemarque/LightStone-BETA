import React, { useReducer } from "react";

const initialState = {
    token:'',
    logado: false,
};

export const globalContext = React.createContext(initialState);

export const AppContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, globalContext);

    return(
        <globalContext.Provider value={{ state, dispatch }}>{children}</globalContext.Provider>
    );
};

export const reducer = (state, action) => {
    switch(action.type){
        case 'autentication':
            return {...state, token: action.payload, logado:true};

        case 'logout':
            return {...state, token: '', logado: false};

        default:
            return{...state};
    }
};