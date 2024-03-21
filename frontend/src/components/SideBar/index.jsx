import { useContext } from "react";
import { MenuItem } from "../MenuItem";
import { HelloCard, LogoutButton, SideBarDiv, StyledCOllum } from "./styles";
import { BsPerson } from 'react-icons/bs'
import { globalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from 'react-icons/lu';
import { GiStoneWall } from 'react-icons/gi'
import { BsPersonWorkspace } from 'react-icons/bs';
import { IoPersonAddSharp } from 'react-icons/io5';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { SucssesNotifications } from "../Notifications";

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
                SucssesNotifications('Sucesso ao encerrar sessão');
            }else if(request.status === 401){
                window.alert('Não existe sessão ativa');
            }
        };

        const handleFormatUsername = (name) => {
            return name.charAt(0).toUpperCase() + name.slice(1);
        };

        return(
            <SideBarDiv>
                <StyledCOllum>
                    <MenuItem text={'Menu'} linkTo={'/Home/'} icon={<LuLayoutDashboard />}/>
                    <MenuItem text={'Clientes'} linkTo={'/Clientes/'} icon={<BsPerson />}/>
                    <MenuItem text={'Colaboradores'}  linkTo={'/Colaboradores/'} icon={<BsPersonWorkspace />}/>
                    <MenuItem text={'Fornecedores'} linkTo={'/Fornecedores/'} icon={<IoPersonAddSharp />}/>
                    <MenuItem text={'Materiais'} linkTo={'/Materiais/'} icon={<GiStoneWall />} />
                </StyledCOllum>

                <HelloCard>
                    <p>Olá, {handleFormatUsername(state.username)}</p>
                </HelloCard>
                <LogoutButton onClick={handleLogout}> <RiLogoutBoxLine />Sair</LogoutButton>
            </SideBarDiv>
        );
    };