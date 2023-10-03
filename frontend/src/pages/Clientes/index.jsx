import { useEffect, useState } from "react";
import { Item } from "../../components/ItemListagem";
import { Listing } from "../../components/Listing";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { useNavigate } from 'react-router-dom';

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
        <div className="Clientes">
           <FlexCointainer pontas='true' size={'92%'}>
            <Title>Clientes</Title>
            <Button action={() => navegate('/Clientes/cadastrarCliente/')}>Novo Cliente</Button>
           </FlexCointainer>
           <Listing>
                {clientes.map((cliente, index) => (
                    <Item key={index}>{cliente.nome}</Item>
                ))}
           </Listing>
        </div>
    );
}