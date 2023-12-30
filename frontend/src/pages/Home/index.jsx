import { useContext } from "react";
import { globalContext } from "../../context/context";
import { Title } from '../../components/Title';
import { FundoDashBoard } from "./styles";

export const HomePage = () => {
    const { state } = useContext(globalContext);
    console.log(state);
    
    return(
       <>
            <FundoDashBoard>
                <Title>DashBoard</Title>
                <p>Tela onde será incluso o dashBoard</p>
            </FundoDashBoard>
       </> 
    );
};