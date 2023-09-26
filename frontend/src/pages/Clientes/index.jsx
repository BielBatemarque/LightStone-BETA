import { useEffect, useState } from "react";
import { Item } from "../../components/ItemListagem";
import { Listing } from "../../components/Listing";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";

export const ClientesPage = () => {
    const[clientes, setClientes] = useState([]);

    useEffect(() => {
        handleCarregaClientes();
    }, []);

    const handleCarregaClientes = async () => {
        const request = await fetch('http://localhost:8000/clientes/');
        const response = await request.json();

        setClientes(response);
    };
    console.log(clientes);

    return(
        <div className="Clientes">
           <FlexCointainer pontas={true} size={'92%'}>
            <Title>Clientes</Title>
            <Button>Novo Cliente</Button>
           </FlexCointainer>
           <Listing>
                {clientes.map(cliente => (
                    <Item>{cliente.nome}</Item>
                ))}
           </Listing>
        </div>
    );
}