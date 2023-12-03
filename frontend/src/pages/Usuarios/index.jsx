import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { FlexCointainer } from '../../components/FlexContainer';
import { Listing } from '../../components/Listing';
import { Title } from '../../components/Title/index';
import { Item } from '../../components/ItemListagem';
import { useNavigate } from 'react-router-dom';

export const Usuarios = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleLoadUsers = async () => {
        try{
            const request = await fetch('http://localhost:8000/users/');
            const response = await request.json();
            setUsers(response);

        }catch(e){
            console.log(`Erro na requisição a API: ${String(e)}`);
        }
        
    };

    useEffect(() => {
        handleLoadUsers();
    }, [])

    return(
        <>
            <FlexCointainer size={'93%'} pontas='true'>
                <Title>Usuários</Title>
                <Button action={() => navigate(`/Usuarios/cadastrarUsuario/`)}>Cadastrar usuário</Button>
            </FlexCointainer>
            <Listing>
                {users.map((user, index) => (
                    <Item key={index} action={() => navigate(`/Usuarios/MaisInformacoesUsuario/${user.id}`)}>{user.username}</Item>
                ))}
            </Listing>
        </>
    );
};