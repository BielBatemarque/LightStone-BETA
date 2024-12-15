import React, { useEffect, useState } from "react";
import { Title } from "../../components/Title";
import { useAuth } from "../../hooks/useAuth";
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FormContainer,
  Title as StyledTitle,
  FieldGroup,
  StyledField,
  StyledSelect,
  StyledInput,
  StyledButton,
} from "./styles";

export const CadastrarOrcamento = () => {
  const [addPc, setAddpc] = useState(false);
  const [peca, setPeca] = useState({});
  const [materiais, setMateriais] = useState([]);
  const { state } = useAuth();
  const [listaPecasOrcamento, setListaPecasOrcamento] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [valorOrcamento, setValorOrcamento] = useState(0);
  const [orcamento, setOrcamento] = useState({});
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setAddpc((prevState) => !prevState);
  };

  const handlChangePc = (e) => {
    const { name, value } = e.target;
    setPeca({ ...peca, [name]: value });
  };

  const handleChangeOrcamento = (e) => {
    const { name, value } = e.target;
    setOrcamento({
      ...orcamento,
      valor_total: valorOrcamento,
      [name]: value,
    });
  };

  const handleLoadMateriais = async () => {
    const request = await fetch("http://localhost:8000/materiais/");
    const response = await request.json();

    setMateriais(response);
  };

  const handleLoadClientes = async () => {
    const request = await fetch("http://localhost:8000/clientes/");
    const response = await request.json();

    setClientes(response);
  };

  const handleCadastraPeca = async () => {
    const request = await fetch("http://localhost:8000/pecas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${state.token}`,
      },
      body: JSON.stringify(peca),
    });

    const response = await request.json();
    if (request.ok) {
      try {
        setListaPecasOrcamento((prevLista) => [...prevLista, response]);
        SucssesNotifications("Peça adicionada com sucesso.");
        setValorOrcamento((valor) => valor + response.preco_m2 * response.quantidade_metros);
      } catch (erro) {
        FailNotifications("Não foi possível adicionar a peça.");
      }
    }
  };

  useEffect(() => {
    handleLoadMateriais();
  }, [addPc]);

  useEffect(() => {
    handleLoadClientes();
  }, []);

  const removePecaOrcamento = (pecaToRemove) => {
    setListaPecasOrcamento((prevLista) => prevLista.filter((peca) => peca.id !== pecaToRemove.id));

    SucssesNotifications("Peça removida com sucesso.");
  };

  const handleCadastraOrcamento = async () => {
    const pecasIds = listaPecasOrcamento.map((peca) => peca.id);
    const orcamentoComPecas = {
      ...orcamento,
      pecas: pecasIds,
      valor_total: valorOrcamento,
    };

    const request = await fetch("http://localhost:8000/orcamentos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${state.token}`,
      },
      body: JSON.stringify(orcamentoComPecas),
    });

    if (request.ok) {
      SucssesNotifications("Orçamento cadastrado com sucesso.");
      navigate("/Orcamentos/");
    } else {
      FailNotifications("Não foi possível cadastrar o orçamento.");
    }
  };

  return (
    <Container>
      <StyledTitle>Novo Orçamento</StyledTitle>
      <FormContainer>
        <h2 style={{ margin: "0px 0 20px 0", textAlign: "center" }}>Lista de Peças:</h2>

        {listaPecasOrcamento.length >= 1 ? (
          listaPecasOrcamento.map((peca, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "space-between", margin: "5px 0" }}>
              <span>{peca.nome}</span>
              <FaTrash 
                onClick={() => removePecaOrcamento(peca)} 
                style={{ cursor: "pointer", color: "red" }}
              />
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>Nenhuma peça adicionada.</p>
        )}

        <StyledButton onClick={handleButtonClick}>Adicionar Peça</StyledButton>

        {addPc && (
          <FieldGroup>
            <StyledField>
              <label>Nome</label>
              <StyledInput name="nome" onChange={handlChangePc} />
            </StyledField>

            <StyledField>
              <label>Descrição</label>
              <StyledInput name="descricao" onChange={handlChangePc} />
            </StyledField>

            <StyledField>
              <label>Quantidade de m²</label>
              <StyledInput name="quantidade_metros" onChange={handlChangePc} />
            </StyledField>

            <StyledField>
              <label>Material</label>
              <StyledSelect name="material" onChange={handlChangePc}>
                <option value="" disabled>Selecione um material</option>
                {materiais.map((mat, index) => (
                  <option key={index} value={mat.id}>{mat.nome}</option>
                ))}
              </StyledSelect>
            </StyledField>

            <StyledButton onClick={handleCadastraPeca}>Confirmar</StyledButton>
          </FieldGroup>
        )}

        <FieldGroup>
          <StyledField>
            <label>Cliente</label>
            <StyledSelect name="cliente" onChange={handleChangeOrcamento}>
              <option value="" disabled>Selecione um cliente</option>
              {clientes.map((cliente, index) => (
                <option key={index} value={cliente.id}>{cliente.nome}</option>
              ))}
            </StyledSelect>
          </StyledField>

          <StyledField>
            <label>Valor total</label>
            <StyledInput 
              name="valor_total" 
              value={valorOrcamento} 
              type="text" 
              onChange={handleChangeOrcamento}
            />
          </StyledField>
        </FieldGroup>

        <StyledButton onClick={handleCadastraOrcamento}>Salvar Orçamento</StyledButton>
      </FormContainer>
    </Container>
  );
};
