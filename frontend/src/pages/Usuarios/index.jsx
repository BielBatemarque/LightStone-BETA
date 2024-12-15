import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title/index";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../components/Datagrid/styled";
import { ListFilter } from "../../components/ListFilter";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";
import { ConfirmarExclusaoModal } from "../../components/Modal/ConfirmarExclusaoModal";

export const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [userSelecionado, setUserSelecionado] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  // Carregar todos os usuários
  const handleLoadUsers = async () => {
    try {
      const request = await fetch("http://localhost:8000/users/");
      if (!request.ok) throw new Error("Erro ao carregar usuários");

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
        : "http://localhost:8000/users/"; // Retorna todos os usuários se o filtro estiver vazio
      const request = await fetch(url);
      if (!request.ok) throw new Error("Erro ao filtrar usuários");

      const response = await request.json();
      setUsers(response);
    } catch (e) {
      console.error(`Erro ao filtrar usuários: ${String(e)}`);
    }
  };

  // Função para deletar um usuário
  const handleDeleteUser = async () => {
    if (!userSelecionado) return;

    try {
      const response = await fetch(
        `http://localhost:8000/users/${userSelecionado}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        SucssesNotifications("Usuário excluído com sucesso");
        await handleLoadUsers(); // Atualiza a lista de usuários
        handleCloseDeleteModal();
      } else {
        const errorData = await response.json();
        console.error("Erro ao excluir usuário:", errorData);
        FailNotifications("Não foi possível excluir o usuário");
      }
    } catch (error) {
      console.error("Erro na requisição de exclusão:", error);
      FailNotifications("Erro na comunicação com o servidor");
    }
  };

  const handleOpenDeleteModal = (id) => {
    setUserSelecionado(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserSelecionado(null); // Garante a limpeza do estado
  };

  useEffect(() => {
    handleLoadUsers(); // Carrega todos os usuários ao montar o componente
  }, []);

  return (
    <>
      <FlexCointainer size={"98%"} pontas="true">
        <Title>Usuários</Title>
        <Button action={() => navigate(`/Usuarios/cadastrarUsuario/`)}>
          Cadastrar usuário
        </Button>
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
              <td>{user.is_staff ? "Sim" : "Não"}</td>
              <td className="actions">
                <button
                  className="edit"
                  onClick={() =>
                    navigate(`/Usuarios/MaisInformacoesUsuario/${user.id}/`)
                  }
                >
                  Editar
                </button>
                <button
                  className="delete"
                  onClick={() => handleOpenDeleteModal(user.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </DataGrid>

      {isDeleteModalOpen && (
        <ConfirmarExclusaoModal
          mensagem="Tem certeza que deseja excluir este usuário?"
          onConfirm={handleDeleteUser}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </>
  );
};
