import { useParams } from 'react-router-dom';
import { Title } from '../../components/Title/index';
import { useEffect, useState } from 'react';

export const MaisInformacoesCliente = () => {
    const { id } = useParams(':id');
    const [cliente, setCliente] = useState({});

    const handleLoadCliente = async () => {
        const request = await fetch(`http://localhost:8000/clientes/${id}`);
        const response = await request.json();

        setCliente(response);
    }

    useEffect(() => {
        handleLoadCliente();
    }, []);

    return(
        <>
            <Title>Cliente: {cliente.nome}</Title>
        </>
    );
}