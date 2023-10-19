import { Title } from "../../components/Title";

export const MovimentacaoDeEstoque = ({ tipoMovimentacao }) => {
    return(
        <>
            <Title>Movimentação: {tipoMovimentacao}</Title>
        </>
    );
}