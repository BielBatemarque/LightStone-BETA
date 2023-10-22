import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";

export const MaisInformacoesColaborador = () => {
    const { id } = useParams(':id');
    return(
        <>
            <Title>Colaborador: {id}</Title>
        </>
    );
};