import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { FlexCointainer } from '../../components/FlexContainer';
import { Title } from '../../components/Title/index';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '../../components/Datagrid/styled';

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
    }, []);


    return(
        <>
            <FlexCointainer size={'93%'} pontas='true'>
                <Title>Usuários</Title>
                <Button action={() => navigate(`/Usuarios/cadastrarUsuario/`)}>Cadastrar usuário</Button>
            </FlexCointainer>
            <DataGrid>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>email</th>
                        <th>Super-User</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.is_staff ? 'Sim' : 'Não'}</td>
                            <td className='actions'>
                                <button className='edit'>Editar</button>
                                <button className='delete'>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </DataGrid>
        </>
    );
};