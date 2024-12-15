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
  const navigate = useNavigate();
  const { state } = useContext(globalContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [materialSelecionado, setMaterialSelecionado] = useState(null);

  const handleLoadingMateriais = async () => {
    const request = await fetch("http://localhost:8000/materiais/");
    const response = await request.json();
    setMateriais(response);
  };

  const handleFiltrarMateriais = async (nomeMaterial) => {
    try {
      const request = await fetch(
        `http://localhost:8000/materiais/filtrar_materiais/?nome=${nomeMaterial}`
      );
      const responseFiltrado = await request.json();
      setMateriais(responseFiltrado);
    } catch (error) {
      console.error("Erro ao filtrar materiais:", error);
    }
  };

  useEffect(() => {
    handleLoadingMateriais();
  }, []);

  const FormataValorMonetario = (valor) => {
    return `R$ ${Number(valor).toFixed(2).replace(".", ",")}`;
  };

  const handleDeleteMaterial = async () => {
    if (!materialSelecionado) return;
  
    try {
      const response = await fetch(
        `http://localhost:8000/materiais/${materialSelecionado}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${state.token}`,
          },
        }
      );
  
      if (response.ok) {
        SucssesNotifications("Sucesso ao deletar material");
        await handleLoadingMateriais(); // Atualiza os dados da tabela
        handleCloseDeleteModal();
      } else {
        const errorData = await response.json();
        console.error("Erro ao deletar material:", errorData);
        FailNotifications("Não foi possível deletar o material");
      }
    } catch (error) {
      console.error("Erro na requisição de exclusão:", error);
      FailNotifications("Erro na comunicação com o servidor");
    }
  };  

  const handleOpenDeleteModal = (id) => {
    setMaterialSelecionado(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setMaterialSelecionado(null); // Garante limpeza do estado
  };  

  return (
    <>
      <FlexCointainer pontas="true" size={"98%"}>
        <Title>Materiais</Title>
        <Button action={() => navigate("/Materiais/cadastrarMaterial/")}>
          Novo Material
        </Button>
      </FlexCointainer>
      <ListFilter action={handleFiltrarMateriais} />
      <DataGrid>
        <thead>
          <tr>
            <th>Nome do Material</th>
            <th>Cor Base</th>
            <th>Último Fornecedor</th>
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
      {isDeleteModalOpen && (
        <ConfirmarExclusaoModal
          mensagem="Tem certeza que deseja excluir este material?"
          onConfirm={handleDeleteMaterial}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </>
  );
};
