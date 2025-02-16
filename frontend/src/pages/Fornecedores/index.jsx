import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../components/Datagrid/styled";
import { ListFilter } from "../../components/ListFilter";
import { globalContext } from "../../context/context";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";
import { ConfirmarExclusaoModal } from "../../components/Modal/ConfirmarExclusaoModal";

export const FornecedoresPage = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();
  const { state } = useContext(globalContext);

  // Estados para controle do modal de exclusão
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);

  const handleLoadFornecedores = async () => {
    try {
      const response = await fetch("http://localhost:8000/fornecedores/");
      const request = await response.json();
      setFornecedores(request);
    } catch (error) {
      console.error("Erro ao carregar fornecedores:", error);
    }
  };

  const handleFilter = async (nomeFornecedor) => {
    try {
      const request = await fetch(
        `http://localhost:8000/fornecedores/filtrar_fornecedores/?nome=${nomeFornecedor}`
      );
      const response = await request.json();
      setFornecedores(response);
    } catch (error) {
      console.error("Erro ao filtrar fornecedores:", error);
    }
  };

  useEffect(() => {
    handleLoadFornecedores();
  }, []);

  const handleOpenDeleteModal = (id) => {
    setFornecedorSelecionado(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setFornecedorSelecionado(null);
    setIsDeleteModalOpen(false);
  };

  const formatCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, ""); // Remove tudo que não for número
  
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  };

  const handleDeleteConfirm = async () => {
    try {
      const request = await fetch(
        `http://localhost:8000/fornecedores/${fornecedorSelecionado}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${state.token}`,
          },
        }
      );

      if (request.ok) {
        SucssesNotifications("Sucesso ao excluir fornecedor.");
        handleLoadFornecedores();
      } else {
        FailNotifications("Erro ao tentar excluir fornecedor.");
      }
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
    } finally {
      handleCloseDeleteModal();
    }
  };

  return (
    <div className="Fornecedores">
      <FlexCointainer pontas="true" size={"98%"}>
        <Title>Fornecedores</Title>
        <Button
          children={"Novo Fornecedor"}
          action={() => navigate("/Fornecedores/cadastrarFornecedor/")}
        />
      </FlexCointainer>
      <ListFilter action={handleFilter} />
      <DataGrid>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor, index) => (
            <tr key={index}>
              <td>{fornecedor.nome_empresa}</td>
              <td>{formatCNPJ(String(fornecedor.cnpj))}</td>
              <td>{fornecedor.logradouro}</td>
              <td className="actions">
                <button
                  className="edit"
                  onClick={() =>
                    navigate(
                      `/Fornecedor/maisInformacoesFornecedor/${fornecedor.id}/`
                    )
                  }
                >
                  Editar
                </button>
                <button
                  className="delete"
                  onClick={() => handleOpenDeleteModal(fornecedor.id)}
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
          mensagem="Tem certeza que deseja excluir este fornecedor?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </div>
  );
};
