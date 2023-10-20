import { ItemListagem } from "./styles";

export const Item = ({ children, action }) => {
    return(
        <ItemListagem onClick={action}>{children}</ItemListagem>
    );
};