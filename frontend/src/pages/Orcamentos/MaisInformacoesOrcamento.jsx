import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FlexDiv,
  FundoForm,
  FundoTitle,
  StyledForm
} from "../Clientes/styles";
import { Title } from "../../components/Title";
import { FloatLabel } from "../../components/FloatLabel";
import { StyledSelect } from "../Materiais/styles";

export const MaisInformacoesOrcamento = () => {
  const { id } = useParams();
  const [orcamento, setOrcamento] = useState({ pecas: [] });
  const [clientes, setClientes] = useState([]);

  const orcamentoRequest = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/orcamentos/retorna_orcamento_com_pecas/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id })
        }
      );
      const data = await response.json();
      setOrcamento(data);
    } catch (error) {
      console.error("Erro ao buscar orçamento:", error);
    }
  };

  const clientesRequest = async () => {
    try {
      const response = await fetch("http://localhost:8000/clientes");
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const handleClienteChange = (e) => {
    const { value } = e.target;
    setOrcamento({ ...orcamento, cliente: value });
  };

  useEffect(() => {
    orcamentoRequest();
    clientesRequest();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrcamento({ ...orcamento, [name]: value });
  };

  return (
    <>
      <FundoTitle>
        <Title mt={0}>Orçamento: {orcamento.id}</Title>
      </FundoTitle>
      <FundoForm>
        <StyledForm>
          <span>
            <br />
            <label htmlFor="cliente">Cliente:</label>
            <StyledSelect
              id="cliente"
              name="cliente"
              value={orcamento.cliente || ""}
              onChange={handleClienteChange}
            >
              <option value="" disabled>
                Selecione um cliente
              </option>
              {clientes.map((cliente) => (
                <option value={cliente.id} key={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </StyledSelect>
          </span>

          <FloatLabel
            name="valor_total"
            text="Total do Orçamento"
            onChange={handleChange}
            value={orcamento.valor_total || ""}
          />

          <h3>Peças</h3>
          <FlexDiv style={{ justifyContent: "flex-start" }}>
            {orcamento.pecas.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Material</th>
                    <th>M²</th>
                  </tr>
                </thead>
                <tbody>
                  {orcamento.pecas.map((peca, index) => (
                    <tr key={index}>
                      <td>{peca.nome}</td>
                      <td>{peca.descricao}</td>
                      <td>{peca.material}</td>
                      <td>{peca.quantidade_metros}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhuma peça cadastrada.</p>
            )}
          </FlexDiv>
        </StyledForm>
      </FundoForm>
    </>
  );
};
