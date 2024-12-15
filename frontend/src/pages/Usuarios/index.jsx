import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { FlexCointainer } from '../../components/FlexContainer';
import { Title } from '../../components/Title/index';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '../../components/Datagrid/styled';
import { ListFilter } from '../../components/ListFilter';

export const Usuarios = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Carregar todos os usuários
    const handleLoadUsers = async () => {
        try {
            const request = await fetch('http://localhost:8000/users/');
            if (!request.ok) throw new Error('Erro ao carregar usuários');

            const response = await request.json();
            setUsers(response);
        } catch (e) {
            console.error(`Erro na requisição à API: ${String(e)}`);
        }
    };

    // Filtrar usuários pelo nome
    const handleFilter = async (nomeUsuario) => {
        try {
            const url = nomeUsuario
                ? `http://localhost:8000/users/filtrar_usuarios/?nome=${nomeUsuario}`
                : 'http://localhost:8000/users/'; // Retorna todos os usuários se o filtro estiver vazio
            const request = await fetch(url);
            if (!request.ok) throw new Error('Erro ao filtrar usuários');

            const response = await request.json();
            setUsers(response);
        } catch (e) {
            console.error(`Erro ao filtrar usuários: ${String(e)}`);
        }
    };

    useEffect(() => {
        handleLoadUsers(); // Carrega todos os usuários ao montar o componente
    }, []);

    return (
        <>
            <FlexCointainer size={'98%'} pontas='true'>
                <Title>Usuários</Title>
                <Button action={() => navigate(`/Usuarios/cadastrarUsuario/`)}>Cadastrar usuário</Button>
            </FlexCointainer>

            {/* Componente de filtro */}
            <ListFilter action={handleFilter} />

            {/* Tabela de usuários */}
            <DataGrid>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Super-User</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.is_staff ? 'Sim' : 'Não'}</td>
                            <td className='actions'>
                                <button className='edit' onClick={() => navigate(`/Usuarios/MaisInformacoesUsuario/${user.id}/`)}>Editar</button>
                                <button className='delete'>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </DataGrid>
        </>
    );
};
