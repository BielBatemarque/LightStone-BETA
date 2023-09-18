import { MenuItem } from "../MenuItem";
import { SideBarDiv } from "./styles";

export const SideBar = () => {
    return(
        <SideBarDiv>
            <MenuItem text={'Menu'} linkTo={'/Home/'}/>
            <MenuItem text={'Clientes'} linkTo={'/Clientes/'}/>
            <MenuItem text={'Colaboradores'}  linkTo={'/Colaboradores/'}/>
            <MenuItem text={'Estoque'} linkTo={'/Estoque/'}/>
            <MenuItem text={'Fornecedores'} linkTo={'/Fornecedores/'}/>
            <MenuItem text={'Materiais'} linkTo={'/Materiais/'}/>
        </SideBarDiv>
    );
}