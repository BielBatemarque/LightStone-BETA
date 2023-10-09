import { useContext } from "react";
import { globalContext } from "../../context/context";
import { Title } from '../../components/Title';

export const HomePage = () => {
    const { state } = useContext(globalContext);
    console.log(state);
    
    return(
       <>
           <Title>DashBoard</Title>
       </> 
    );
};