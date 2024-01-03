import { useEffect, useState } from "react";
import { Title } from "../../components/Title";
import { Button } from '../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FailNotifications, SucssesNotifications } from '../../components/Notifications';
import { FundoForm, FundoTitle, StyledForm } from '../Clientes/styles';
import { FloatLabel } from "../../components/FloatLabel";
import { StyledSelect } from "../Materiais/styles";


export const MaisInformacoesUsuarios = () => {
    const [usuario, setUsuario] = useState({});
    const { id } = useParams(':id');
    const { state } = useAuth();
    const navigate = useNavigate();

    const handleLoadingUser = async () => {
        const request = await fetch(`http://localhost:8000/users/${id}`);
        const response = await request.json();

        setUsuario(response);
    };

    useEffect(() => {
        handleLoadingUser();
    }, []);

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        const request = await fetch(`http://localhost:8000/users/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
            body: JSON.stringify(usuario),
        });

        if(request.ok){
            SucssesNotifications('Sucesso ao editar usuário');
            navigate('/Usuarios/');
        }else{
            FailNotifications('Falha ao editar');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUsuario({...usuario, [name]: value});
    };

    const handleDeleteUser = async () => {
        const request = await fetch(`http://localhost:8000/users/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
        });

        if(request.ok){
            SucssesNotifications('Sucesso ao deletar usuário');
            navigate('/Usuarios/');
        }else{
            FailNotifications('Falha ao deletar usuário');
        }
    };

    console.log(usuario);

    return(
        <>
            <FundoTitle>
                <Title mt={0}>Editar Usuário</Title>
            </FundoTitle>
            <FundoForm>

                <StyledForm onSubmit={handleUpdateUser}>
                    <FloatLabel type="text" name="username" text="nome de usuário" onChange={handleChange} value={usuario.username}/><br />
                    <FloatLabel type="email" name="email" text="Email" onChange={handleChange} value={usuario.email}/><br />
                    <span>
                        <label style={{marginRight: '1rem'}}>Super-Usuário: </label>
                        <StyledSelect name="is_staff" onChange={handleChange} value={usuario.is_staff}>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </StyledSelect>
                    </span>
                    <FloatLabel type="password" name="password" text="Senha" onChange={handleChange} value={usuario.password}/><br />
                    <Button>Editar Usuário</Button>
                    <Button color={'red'} action={handleDeleteUser}>Deletar Usuário</Button>
                </StyledForm>

            </FundoForm>
        </>
    );
};