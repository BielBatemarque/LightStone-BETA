import { useContext } from "react";
import { MenuItem } from "../MenuItem";
import { SideBarDiv } from "./styles";
import { BsPerson } from 'react-icons/bs'
import { globalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from 'react-icons/lu';

export const SideBar = () => {
    const { state, dispatch } = useContext(globalContext);
    const { token } = state;
    const navigate = useNavigate();
    
    console.log(state, token);

    const handleLogout = async () => {
        const request = await fetch('http://localhost:8000/logout/', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            }
        });

        const response = await request.json();
        console.log(response);

        if(request.status === 200){
            dispatch({type: 'logout'});
            navigate('/');
        }else if(request.status === 401){
            window.alert('Não existe sessão ativa');
        }
    }

    return(
        <SideBarDiv>
            <MenuItem text={'Menu'} linkTo={'/Home/'} icon={<LuLayoutDashboard />}/>
            <MenuItem text={'Clientes'} linkTo={'/Clientes/'} icon={<BsPerson />}/>
            <MenuItem text={'Colaboradores'}  linkTo={'/Colaboradores/'}/>
            <MenuItem text={'Estoque'} linkTo={'/Estoque/'}/>
            <MenuItem text={'Fornecedores'} linkTo={'/Fornecedores/'}/>
            <MenuItem text={'Materiais'} linkTo={'/Materiais/'}/>

            <button type="button" onClick={handleLogout}>Sair</button>
        </SideBarDiv>
    );
}