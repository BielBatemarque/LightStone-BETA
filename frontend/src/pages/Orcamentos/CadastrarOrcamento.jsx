import { Title } from "../../components/Title";
import { FlexDiv, FundoForm, FundoTitle } from "../Clientes/styles";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { FloatLabel } from "../../components/FloatLabel";
import { FormLinePecas } from "./styles";
import { StyledSelect } from "../../pages/Materiais/styles";
import { useAuth } from "../../hooks/useAuth";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "./modal";
import { DataGrid } from "../../components/Datagrid/styled";

export const CadastrarOrcamento = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [peca, setPeca] = useState({});
  const [materiais, setMateriais] = useState([]);
  const { state } = useAuth();
  const [listaPecasOrcamento, setListaPecasOrcamento] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [valorOrcamento, setValorOrcamento] = useState(0);
  const [orcamento, setOrcamento] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const materiaisRes = await fetch("http://localhost:8000/materiais/");
      setMateriais(await materiaisRes.json());
      const clientesRes = await fetch("http://localhost:8000/clientes/");
      setClientes(await clientesRes.json());
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPeca((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPeca = async () => {
    try {
      const response = await fetch("http://localhost:8000/pecas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${state.token}`,
        },
        body: JSON.stringify(peca),
      });
      if (response.ok) {
        const newPeca = await response.json();
        setListaPecasOrcamento([...listaPecasOrcamento, newPeca]);
        setValorOrcamento(
          (prev) => prev + newPeca.preco_m2 * newPeca.quantidade_metros
        );
        SucssesNotifications("Peça adicionada com sucesso!");
        setModalOpen(false);
      } else {
        throw new Error();
      }
    } catch {
      FailNotifications("Erro ao adicionar peça.");
    }
  };

  const handleRemovePeca = (pecaId) => {
    const pecaRemovida = listaPecasOrcamento.find((p) => p.id === pecaId);

    setListaPecasOrcamento((prevLista) =>
      prevLista.filter((p) => p.id !== pecaId)
    );

    if (pecaRemovida) {
      setValorOrcamento(
        (prev) => prev - pecaRemovida.preco_m2 * pecaRemovida.quantidade_metros
      );
    }

    SucssesNotifications("Peça removida!");
  };

  const handleSubmit = async () => {
    const orcamentoComPecas = {
      ...orcamento,
      pecas: listaPecasOrcamento.map((p) => p.id),
      valor_total: valorOrcamento,
    };
    try {
      const response = await fetch("http://localhost:8000/orcamentos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${state.token}`,
        },
        body: JSON.stringify(orcamentoComPecas),
      });
      if (response.ok) {
        SucssesNotifications("Orçamento cadastrado!");
        navigate("/Orcamentos/");
      } else {
        throw new Error();
      }
    } catch {
      FailNotifications("Erro ao cadastrar orçamento.");
    }
  };

  console.log(listaPecasOrcamento);

  return (
    <>
      <FundoTitle>
        <Title mt="0px">Novo Orçamento</Title>
      </FundoTitle>
      <FundoForm>
        {listaPecasOrcamento.length > 0 ? (
          <DataGrid>
            <thead>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Qntd M²</th>
              <th>Ações</th>
            </thead>
            <tbody>
              {listaPecasOrcamento.map((peca) => (
                <tr>
                  <td>{peca.nome}</td>
                  <td>{peca.descrição}</td>
                  <td>{peca.quantidade_metros}</td>
                  <td>
                    <FaTrash
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleRemovePeca(peca.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </DataGrid>
        ) : (
          <p style={{ textAlign: "center" }}>Nenhuma peça adicionada</p>
        )}
        <FlexDiv justfy="center">
          <Button color="gray" action={() => setModalOpen(true)}>
            <FaPlus /> Adicionar Peça
          </Button>
        </FlexDiv>
        <br />
        <FlexDiv justfy="center">
          <StyledSelect
            name="cliente"
            onChange={(e) =>
              setOrcamento({ ...orcamento, cliente: e.target.value })
            }
          >
            <option value="">Selecione um Cliente</option>
            {clientes.map((cliente, index) => (
              <option key={index} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </StyledSelect>
        </FlexDiv>
        <FlexDiv justfy="center">
          <FloatLabel
            name="valor_total"
            text="Valor total"
            value={valorOrcamento}
            type="text"
            disabled
          />
        </FlexDiv>
        <FlexDiv justfy="center">
          <Button action={handleSubmit}>Salvar Orçamento</Button>
        </FlexDiv>
      </FundoForm>
      {modalOpen && (
        <Modal title="Adicionar Peça" onClose={() => setModalOpen(false)}>
          <FormLinePecas>
            <FloatLabel
              size={20}
              text="Nome"
              name="nome"
              onChange={handleChange}
            />
            <FloatLabel
              size={20}
              text="Descrição"
              name="descrição"
              onChange={handleChange}
            />
            <FloatLabel
              size={20}
              text="Quantidade de m²"
              name="quantidade_metros"
              onChange={handleChange}
            />
            <StyledSelect name="material" onChange={handleChange}>
              <option value="">Selecione um Material</option>
              {materiais.map((mat, index) => (
                <option key={index} value={mat.id}>
                  {mat.nome}
                </option>
              ))}
            </StyledSelect>
            <Button action={handleAddPeca}>Confirmar</Button>
          </FormLinePecas>
        </Modal>
      )}
    </>
  );
};
