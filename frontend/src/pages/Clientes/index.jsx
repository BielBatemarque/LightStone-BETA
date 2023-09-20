import { Item } from "../../components/ItemListagem";
import { Listing } from "../../components/Listing";

export const ClientesPage = () => {
    return(
        <div className="Clientes">
           <h1>Clientes</h1>
           <Listing>
                <Item>Cliente 1</Item>
                <Item>Cliente 2</Item>
           </Listing>
        </div>
    );
}