import { useContext } from "react";
import { globalContext } from "../../context/context";

export const HomePage = () => {
    const { state } = useContext(globalContext);
    console.log(state);
    
    return(
       <>
            Home
       </> 
    );
};