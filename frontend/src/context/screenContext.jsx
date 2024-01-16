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
    const [state, dispatch] = useReducer(ScreenContext, ScreenReducer);

    return(
        <ScreenContext.Provider value={{state, dispatch}}>{children}</ScreenContext.Provider>
    );
};