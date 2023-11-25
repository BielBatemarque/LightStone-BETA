import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { useEffect, useState } from "react";
import { Estoque } from '../../models/Estoque';

export const MaisInformacoesEstoque = () => {
    const [estoque, setEstoque] = useState(new Estoque());
    const { id } = useParams(':id');

    const handleLoadEstoque = async () => {
        const request = await fetch(`http://localhost:8000/estoques/${id}/`);
        const response = await request.json();

        setEstoque(response);
    };

    useEffect(() => {
        handleLoadEstoque();
    });

    return(
        <>
            <Title>Mais Informações: {estoque.material}</Title>
        </>
    );
};