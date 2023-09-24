import { useContext } from "react";
import { MenuItem } from "../MenuItem";
import { SideBarDiv } from "./styles";
import { BsPerson } from 'react-icons/bs'
import { globalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from 'react-icons/lu';
import { IoIosCash } from 'react-icons/io';
import { GiStoneWall } from 'react-icons/gi'
import { BsPersonWorkspace } from 'react-icons/bs';
import { IoPersonAddSharp } from 'react-icons/io5';
import { CgShutterstock } from 'react-icons/cg'

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
            <MenuItem text={'Colaboradores'}  linkTo={'/Colaboradores/'} icon={<BsPersonWorkspace />}/>
            <MenuItem text={'Estoque'} linkTo={'/Estoque/'} icon={<CgShutterstock />}/>
            <MenuItem text={'Fornecedores'} linkTo={'/Fornecedores/'} icon={<IoPersonAddSharp />}/>
            <MenuItem text={'Materiais'} linkTo={'/Materiais/'} icon={<GiStoneWall />} />
            <MenuItem text={'Vendas'} linkTo={'/Vendas/'} icon={<IoIosCash />}/>

            <button type="button" onClick={handleLogout}>Sair</button>
        </SideBarDiv>
    );
}