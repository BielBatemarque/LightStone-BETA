import { Title } from "../../components/Title";
import { FundoForm, FundoTitle } from "../Clientes/styles";

export const CadastrarOrcamento = () => {
    return(
        <>
            <FundoTitle>
                <Title mt={'0px'}>Novo Orçamento</Title>
            </FundoTitle>
            <FundoForm></FundoForm>
        </>
    );
}