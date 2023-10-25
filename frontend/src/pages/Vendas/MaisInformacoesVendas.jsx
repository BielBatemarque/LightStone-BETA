import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";

export const MaisInformacoesVenda = () => {
    const { id } = useParams(':id');
    return(
        <>
            <Title>Venda: {id}</Title>
        </>
    );
}