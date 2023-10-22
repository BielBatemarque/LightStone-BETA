import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { useEffect, useState } from "react";

export const MaisInformacoesColaborador = () => {
    const [colaborador, setColaborador] = useState({});
    const { id } = useParams(':id');

    const handleLoadColaborador = async () => {
        const request = await fetch(`http://localhost:8000/colaboradores/${id}`);
        const response = await request.json();

        setColaborador(response);
    };

    useEffect(() => {
        handleLoadColaborador();
    }, []);

    return(
        <>
            <Title>Colaborador: {colaborador.nome}</Title>
        </>
    );
};