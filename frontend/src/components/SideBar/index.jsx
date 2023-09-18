import { MenuItem } from "../MenuItem";
import { SideBarDiv } from "./styles";

export const SideBar = () => {
    return(
        <SideBarDiv>
            <MenuItem text={'Clientes'}/>
            <MenuItem text={'Colaboradores'} />
            <MenuItem text={'Estoque'}/>
            <MenuItem text={'Fornecedores'}/>
            <MenuItem text={'Materiais'}/>
        </SideBarDiv>
    );
}