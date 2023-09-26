import { useEffect, useState } from "react";
import { Item } from "../../components/ItemListagem";
import { Listing } from "../../components/Listing";

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
           <h1>Clientes</h1>
           <Listing>
                {clientes.map(cliente => (
                    <Item>{cliente.nome}</Item>
                ))}
           </Listing>
        </div>
    );
}