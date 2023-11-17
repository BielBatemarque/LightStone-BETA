import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";

export const MovimentacaoDeEstoque = () => {
    const { tipoMovimentacao } = useParams();
    return(
        <>
            <Title>Movimentação: {tipoMovimentacao}</Title>
        </>
    );
}