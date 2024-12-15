import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title/index";
import { ContainerBtns } from "./styles";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../components/Datagrid/styled";
import { ListFilter } from "../../components/ListFilter";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";
import { ConfirmarExclusaoModal } from "../../components/Modal/ConfirmarExclusaoModal";

export const EstoquesPage = () => {
  const [estoques, setEstoques] = useState([]);
  const [estoqueSelecionado, setEstoqueSelecionado] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoadingEstoques = async () => {
    const request = await fetch(
      "http://localhost:8000/estoques/listagem_estoque_material/"
    );
    const response = await request.json();
    setEstoques(response);
  };

  const handleFilter = async (nomeMaterial) => {
    const request = await fetch(
      `http://localhost:8000/estoques/filtrar_estoque/?material=${nomeMaterial}`
    );
    const response = await request.json();
    setEstoques(response);
  };

  const handleDeleteEstoque = async () => {
    if (!estoqueSelecionado) return;

    try {
      const response = await fetch(
        `http://localhost:8000/estoques/${estoqueSelecionado}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        SucssesNotifications("Estoque excluído com sucesso");
        await handleLoadingEstoques(); // Atualiza os dados da tabela
        handleCloseDeleteModal();
      } else {
        const errorData = await response.json();
        console.error("Erro ao excluir estoque:", errorData);
        FailNotifications("Não foi possível excluir o estoque");
      }
    } catch (error) {
      console.error("Erro na requisição de exclusão:", error);
      FailNotifications("Erro na comunicação com o servidor");
    }
  };

  const handleOpenDeleteModal = (id) => {
    setEstoqueSelecionado(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEstoqueSelecionado(null); // Garante limpeza do estado
  };

  useEffect(() => {
    handleLoadingEstoques();
  }, []);

  return (
    <>
      <FlexCointainer pontas="true" size={"93%"}>
        <Title>Estoque</Title>
        <ContainerBtns>
          <Button
            color={"red"}
            action={() => navigate("/Estoque/movimentacaoDeEstoque/saida")}
          >
            Registrar Saída
          </Button>
          <Button
            action={() => navigate("/Estoque/movimentacaoDeEstoque/entrada")}
          >
            Registrar Entrada
          </Button>
        </ContainerBtns>
      </FlexCointainer>
      <ListFilter action={handleFilter} />
      <DataGrid>
        <thead>
          <tr>
            <th>Material</th>
            <th>Qntd. M²</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estoques.map((estoque, index) => (
            <tr key={index}>
              <td>{estoque.material.nome}</td>
              <td>{estoque.quantidade_metros}</td>
              <td className="actions">
                <button
                  className="edit"
                  onClick={() =>
                    navigate(`/Estoque/maisInformacoesEstoque/${estoque.id}/`)
                  }
                >
                  Editar
                </button>
                <button
                  className="delete"
                  onClick={() => handleOpenDeleteModal(estoque.id)}
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
          mensagem="Tem certeza que deseja excluir este estoque?"
          onConfirm={handleDeleteEstoque}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </>
  );
};
