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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userSelecionado, setUserSelecionado] = useState(null);
  const navigate = useNavigate();

  const handleLoadUsers = async () => {
    try {
      const request = await fetch("http://localhost:8000/users/");
      const response = await request.json();
      setUsers(response);
    } catch (e) {
      console.log(`Erro na requisição à API: ${String(e)}`);
    }
  };

  useEffect(() => {
    handleLoadUsers();
  }, []);

  const handleFilter = async (nomeUsuario) => {
    try {
      const request = await fetch(
        `http://localhost:8000/users/filtrar_usuarios/?nome=${nomeUsuario}`
      );
      const response = await request.json();
      setUsers(response);
    } catch (e) {
      console.error(`Erro ao filtrar usuários: ${String(e)}`);
    }
  };

  const handleOpenDeleteModal = (userId) => {
    setUserSelecionado(userId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setUserSelecionado(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteUser = async () => {
    try {
      const request = await fetch(
        `http://localhost:8000/users/${userSelecionado}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (request.ok) {
        SucssesNotifications("Usuário deletado com sucesso.");
        handleLoadUsers();
      } else {
        FailNotifications("Não foi possível deletar o usuário.");
      }
    } catch (e) {
      console.error(`Erro ao deletar usuário: ${String(e)}`);
    } finally {
      handleCloseDeleteModal();
    }
  };

  return (
    <>
      <FlexCointainer size={"98%"} pontas="true">
        <Title>Usuários</Title>
        <Button action={() => navigate(`/Usuarios/cadastrarUsuario/`)}>
          Cadastrar usuário
        </Button>
      </FlexCointainer>

      <ListFilter action={handleFilter} />
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
          {users.map((user, index) => (
            <tr key={index}>
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

      {/* Modal de confirmação de exclusão */}
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
