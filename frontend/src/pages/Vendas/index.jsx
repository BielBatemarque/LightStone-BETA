import { useEffect, useState } from "react";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { ContainerBtns } from "../Estoques/styles";
import { ListFilter } from "../../components/ListFilter";
import { DataGrid } from "../../components/Datagrid/styled";
import {
  SucssesNotifications,
  FailNotifications,
} from "../../components/Notifications";
import { ConfirmarExclusaoModal } from "../../components/Modal/ConfirmarExclusaoModal";

export const VendasPage = () => {
  const [vendas, setVendas] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vendaSelecionada, setVendaSelecionada] = useState(null);
  const navigate = useNavigate();

  const handleLoadVendas = async () => {
    try {
      const request = await fetch(
        "http://localhost:8000/vendas/listagem_vendas_cliente/"
      );
      const response = await request.json();
      setVendas(response);
    } catch (e) {
      console.error(`Erro ao carregar vendas: ${String(e)}`);
    }
  };

  useEffect(() => {
    handleLoadVendas();
  }, []);

  const handleFilter = async (nomeCliente) => {
    try {
      const request = await fetch(
        `http://localhost:8000/vendas/retorna_vendas_filtradas/?cliente=${nomeCliente}`
      );
      const response = await request.json();
      console.log(response);
      setVendas(response);
    } catch (e) {
      console.error(`Erro ao filtrar vendas: ${String(e)}`);
    }
  };

  const handleFormataValorNumero = (valor) => {
    return `R$ ${Number(valor).toFixed(2).replace(".", ",")}`;
  };

  const handleOpenDeleteModal = (vendaId) => {
    setVendaSelecionada(vendaId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setVendaSelecionada(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteVenda = async () => {
    try {
      const request = await fetch(
        `http://localhost:8000/vendas/${vendaSelecionada}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (request.ok) {
        SucssesNotifications("Venda excluída com sucesso.");
        handleLoadVendas();
      } else {
        FailNotifications("Não foi possível excluir a venda.");
      }
    } catch (e) {
      console.error(`Erro ao excluir venda: ${String(e)}`);
    } finally {
      handleCloseDeleteModal();
    }
  };

  return (
    <>
      <FlexCointainer pontas="true" size={"98%"}>
        <Title>Vendas</Title>
        <ContainerBtns>
          <Button action={() => navigate("/Orcamentos/")} color={"gray"}>
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
                  Detalhes
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

      {/* Modal de confirmação de exclusão */}
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
