import { useEffect, useState } from "react";
import { Item } from "../../components/ItemListagem";
import { Listing } from "../../components/Listing";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import { Filtro } from "../../components/Filtro";

export const ClientesPage = () => {
    const[clientes, setClientes] = useState([]);
    const navegate = useNavigate();

    useEffect(() => {
        handleCarregaClientes();
    }, []);

    const handleCarregaClientes = async () => {
        const request = await fetch('http://localhost:8000/clientes/');
        const response = await request.json();

        setClientes(response);
    };

    return(
        <>
            <FlexCointainer pontas='true' size={'92%'}>
                <Title>Clientes</Title>
                <Filtro />
                <Button action={() => navegate('/Clientes/cadastrarCliente/')}>Novo Cliente</Button>
           </FlexCointainer>
           <Listing>
                {clientes.map((cliente, index) => (
                    <Item key={index} action={() => navegate(`/Clientes/maisInformacoesCliente/${cliente.id}/`)}>{cliente.nome}</Item>
                    ))}
            </Listing>
        </>
    );
};