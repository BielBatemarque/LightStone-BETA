import { useContext } from "react";
import { globalContext } from "../../context/context";
import { Title } from '../../components/Title';
import { FundoDashBoard } from "./styles";
import { FundoForm, FundoTitle } from "../Clientes/styles";

export const HomePage = () => {
    const { state } = useContext(globalContext);
    console.log(state);
    
    return(
       <>
            <FundoTitle>
                <Title mt={0}>Dados Gerais</Title>
            </FundoTitle>
            <FundoDashBoard>
            </FundoDashBoard>
       </> 
    );
};