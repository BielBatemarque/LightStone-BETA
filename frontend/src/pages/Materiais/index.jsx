import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { ListFilter } from "../../components/ListFilter";
import { DataGrid } from "../../components/Datagrid/styled";
import { globalContext } from "../../context/context";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";
import { ConfirmarExclusaoModal } from "../../components/Modal/ConfirmarExclusaoModal";

export const MateriaisPage = () => {
  const [materiais, setMateriais] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [materialSelecionado, setMaterialSelecionado] = useState(null);
  const navigate = useNavigate();
  const { state } = useContext(globalContext);

  const handleLoadingMateriais = async () => {
    try {
      const request = await fetch("http://localhost:8000/materiais/");
      const response = await request.json();
      setMateriais(response);
    } catch (error) {
      console.error("Erro ao carregar materiais:", error);
    }
  };

  useEffect(() => {
    handleLoadingMateriais();
  }, []);

  const FormataValorMonetario = (valor) => {
    return `R$ ${Number(valor).toFixed(2).replace(".", ",")}`;
  };

  const handleOpenDeleteModal = (materialId) => {
    setMaterialSelecionado(materialId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setMaterialSelecionado(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const request = await fetch(
        `http://localhost:8000/materiais/${materialSelecionado}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${state.token}`,
          },
        }
      );

      if (request.ok) {
        SucssesNotifications("Sucesso ao deletar material");
        handleLoadingMateriais();
      } else {
        FailNotifications("Não foi possível deletar material");
      }
    } catch (error) {
      console.error("Erro ao excluir material:", error);
    } finally {
      handleCloseDeleteModal();
    }
  };

  return (
    <>
      <FlexCointainer pontas="true" size={"98%"}>
        <Title>Materiais</Title>
        <Button action={() => navigate("/Materiais/cadastrarMaterial/")}>
          Novo Material
        </Button>
      </FlexCointainer>
      <ListFilter />
      <DataGrid>
        <thead>
          <tr>
            <th>Nome do Material</th>
            <th>Cor Base</th>
            <th>Ultimo Fornecedor</th>
            <th>Preço por M²</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {materiais.map((material, index) => (
            <tr key={index}>
              <td>{material.nome}</td>
              <td>{material.cor_base}</td>
              <td>{material.fornecedor}</td>
              <td>{FormataValorMonetario(material.preco_m2)}</td>
              <td className="actions">
                <button
                  className="edit"
                  onClick={() =>
                    navigate(
                      `/Materiais/maisInformacoesMaterial/${material.id}/`
                    )
                  }
                >
                  Editar
                </button>
                <button
                  className="delete"
                  onClick={() => handleOpenDeleteModal(material.id)}
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
          mensagem="Tem certeza que deseja excluir este material?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </>
  );
};
