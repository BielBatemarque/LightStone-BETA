import { useEffect, useState } from "react";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { ContainerBtns } from "../Estoques/styles";
import { ListFilter } from "../../components/ListFilter";
import { DataGrid } from "../../components/Datagrid/styled";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";
import { ConfirmarExclusaoModal } from "../../components/Modal/ConfirmarExclusaoModal";

export const VendasPage = () => {
  const [vendas, setVendas] = useState([]);
  const [vendaSelecionada, setVendaSelecionada] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoadVendas = async () => {
    try {
      const request = await fetch(
        "http://localhost:8000/vendas/listagem_vendas_cliente/"
      );
      const response = await request.json();
      setVendas(response);
    } catch (error) {
      console.error("Erro ao carregar vendas:", error);
    }
  };

  const handleFilter = async (nomeCliente) => {
    try {
      const request = await fetch(
        `http://localhost:8000/vendas/retorna_vendas_filtradas/?cliente=${nomeCliente}`
      );
      const response = await request.json();
      setVendas(response);
    } catch (error) {
      console.error("Erro ao filtrar vendas:", error);
    }
  };

  const handleFormataValorNumero = (valor) => {
    let valorNumero = Number(valor).toFixed(2);
    return `R$ ${valorNumero.replace(".", ",")}`;
  };

  const handleDeleteVenda = async () => {
    if (!vendaSelecionada) return;

    try {
      const response = await fetch(
        `http://localhost:8000/vendas/${vendaSelecionada}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        SucssesNotifications("Venda excluída com sucesso!");
        await handleLoadVendas(); // Atualiza a tabela de vendas
        handleCloseDeleteModal();
      } else {
        const errorData = await response.json();
        console.error("Erro ao excluir venda:", errorData);
        FailNotifications("Não foi possível excluir a venda");
      }
    } catch (error) {
      console.error("Erro na requisição de exclusão:", error);
      FailNotifications("Erro na comunicação com o servidor");
    }
  };

  const handleOpenDeleteModal = (id) => {
    setVendaSelecionada(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setVendaSelecionada(null); // Garante limpeza do estado
  };

  useEffect(() => {
    handleLoadVendas();
  }, []);

  return (
    <>
      <FlexCointainer pontas="true" size={"98%"}>
        <Title>Vendas</Title>
        <ContainerBtns>
          <Button
            action={() => navigate("/Orcamentos/")}
            color={"gray"}
          >
            Orçamentos
          </Button>
          <Button action={() => navigate("/Vendas/CadastrarVenda/")}>
            Nova Venda
          </Button>
        </ContainerBtns>
      </FlexCointainer>
      <ListFilter action={handleFilter} />
      <DataGrid>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda, index) => (
            <tr key={index}>
              <td>{venda.cliente.nome}</td>
              <td>{handleFormataValorNumero(venda.valor_total)}</td>
              <td className="actions">
                <button
                  className="edit"
                  onClick={() =>
                    navigate(`/Vendas/MaisInformacoesVenda/${venda.id}/`)
                  }
                >
                  Editar
                </button>
                <button
                  className="delete"
                  onClick={() => handleOpenDeleteModal(venda.id)}
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
          mensagem="Tem certeza que deseja excluir esta venda?"
          onConfirm={handleDeleteVenda}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </>
  );
};
