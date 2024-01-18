import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { FundoForm, FundoTitle } from "../Clientes/styles";

export const MaisInformacoesVenda = () => {
    const { id } = useParams(':id');
    return(
        <>
            <FundoTitle>
                <Title mt={0}>Venda: {id}</Title>
            </FundoTitle>
            <FundoForm>
                
            </FundoForm>
        </>
    );
}