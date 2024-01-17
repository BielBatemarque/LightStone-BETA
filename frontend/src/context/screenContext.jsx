import React, { useReducer } from "react";


const initialScreenState = {
    modalOpen : false,
};

export const ScreenContext = React.createContext(initialScreenState);

export const ScreenReducer = (state, action) => {
    switch(action.type){
        case 'Opening':
            return { ...state, modalOpen: true};
        case 'Closed':
            return { ...state, modalOpen: false};
        default:
            return state;
    };

};

export const ScrenState = ({ children }) => {
    const [screenState, dispatch] = useReducer(ScreenReducer, initialScreenState);

    return(
        <ScreenContext.Provider value={{screenState, dispatch}}>{children}</ScreenContext.Provider>
    );
};