import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { ContainerBtns } from "../Estoques/styles";
import { CadastrarClienteModal } from "../../components/Modal/CadastrarClienteModal";
import { DataGrid } from "../../components/Datagrid/styled";
import { ListFilter } from "../../components/ListFilter/index";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";
import { ConfirmarExclusaoModal } from "../../components/Modal/ConfirmarExclusaoModal";

export const OrcamentosPage = () => {
  const [orcamentos, setOrcamentos] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);

  const orcamentosRequest = async () => {
    try {
      const request = await fetch(
        `http://localhost:8000/orcamentos/reotorna_listagem_orcamentos_com_cliente/`
      );
      const response = await request.json();
      setOrcamentos(response);
    } catch (e) {
      console.error(`Erro ao carregar orçamentos: ${String(e)}`);
    }
  };

  useEffect(() => {
    orcamentosRequest();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormataValorMonetário = (valor) => {
    return `R$ ${Number(valor).toFixed(2).replace(".", ",")}`;
  };

  const handleFilter = async (nomeCliente) => {
    try {
      const request = await fetch(
        `http://localhost:8000/orcamentos/retorna_orcamentos_cliente/?cliente=${nomeCliente}`
      );
      const response = await request.json();
      setOrcamentos(response);
    } catch (e) {
      console.error(`Erro ao filtrar orçamentos: ${String(e)}`);
    }
  };

  const handleOpenDeleteModal = (orcamentoId) => {
    setOrcamentoSelecionado(orcamentoId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setOrcamentoSelecionado(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteOrcamento = async () => {
    try {
      const request = await fetch(
        `http://localhost:8000/orcamentos/${orcamentoSelecionado}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (request.ok) {
        SucssesNotifications("Orçamento excluído com sucesso.");
        orcamentosRequest();
      } else {
        FailNotifications("Não foi possível excluir o orçamento.");
      }
    } catch (e) {
      console.error(`Erro ao excluir orçamento: ${String(e)}`);
    } finally {
      handleCloseDeleteModal();
    }
  };

  return (
    <>
      <FlexCointainer pontas="true" size="98%">
        <Title>Orçamentos</Title>
        <ContainerBtns>
          <Button color={"blue"} action={handleOpenModal}>
            Novo Cliente
          </Button>
          <Button action={() => navigate("/Orcamentos/NovoOrcamento/")}>
            Novo Orçamento
          </Button>
        </ContainerBtns>
      </FlexCointainer>

      <ListFilter action={handleFilter} />
      <DataGrid>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Valor total</th>
            <th>Qtnd. Peças</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orcamentos.map((orcamento, index) => (
            <tr key={index}>
              <td>{orcamento.cliente.nome}</td>
              <td>{handleFormataValorMonetário(orcamento.valor_total)}</td>
              <td>{orcamento.pecas.length}</td>
              <td className="actions">
                <button
                  className="edit"
                  onClick={() =>
                    navigate(
                      `/Orcamentos/MaisInformacoesOrcamento/${orcamento.id}`
                    )
                  }
                >
                  Editar
                </button>
                <button
                  className="delete"
                  onClick={() => handleOpenDeleteModal(orcamento.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </DataGrid>

      {/* Modal de cadastro de cliente */}
      <CadastrarClienteModal isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Modal de confirmação de exclusão */}
      {isDeleteModalOpen && (
        <ConfirmarExclusaoModal
          mensagem="Tem certeza que deseja excluir este orçamento?"
          onConfirm={handleDeleteOrcamento}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </>
  );
};
