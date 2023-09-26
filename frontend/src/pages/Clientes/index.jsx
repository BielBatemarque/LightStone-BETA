import { useEffect, useState } from "react";
import { Item } from "../../components/ItemListagem";
import { Listing } from "../../components/Listing";
import { AtentionNotification, FailNotifications, SucssesNotifications } from '../../components/Notifications';

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
           <button onClick={() => SucssesNotifications('opa')}>opa</button>
           <button onClick={() => FailNotifications('opa')}>opa</button>
           <button onClick={() => AtentionNotification('opa')}>opa</button>
        </div>
    );
}