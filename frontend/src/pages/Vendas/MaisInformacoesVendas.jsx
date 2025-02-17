import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { FlexDiv, FundoForm, FundoTitle } from "../Clientes/styles";
import { useEffect, useState } from "react";
import { DataGrid } from "../../components/Datagrid/styled";
import { Flex } from "../../components/ListFilter/styled";

export const MaisInformacoesVenda = () => {
  const { id } = useParams(":id");
  const [venda, setVenda] = useState(null);
  const [orcamentoVinculado, setOrcamentoVinculado] = useState(null);
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const handleLoadVenda = async () => {
      try {
        const request = await fetch(`http://localhost:8000/vendas/${id}/`);
        const response = await request.json();
        setVenda(response);
      } catch (error) {
        console.error("Erro ao buscar venda:", error);
      }
    };

    handleLoadVenda();
  }, [id]);

  useEffect(() => {
    const orcamentoRequest = async () => {
      if (!venda?.orcamento) return;

      try {
        const request = await fetch(
          `http://localhost:8000/orcamentos/retorna_orcamento_com_pecas/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: venda.orcamento }),
          }
        );
        const response = await request.json();
        setOrcamentoVinculado(response);
      } catch (error) {
        console.error("Erro ao buscar orçamento:", error);
      }
    };

    orcamentoRequest();
  }, [venda]);

  useEffect(() => {
    const handleLoadCliente = async () => {
      if (!venda?.cliente) return;

      try {
        const request = await fetch(
          `http://localhost:8000/clientes/${venda.cliente}`
        );
        const response = await request.json();
        setCliente(response);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
      }
    };

    handleLoadCliente();
  }, [venda]);

  return (
    <>
      <FundoTitle>
        <Title mt={0}>Venda: {cliente?.nome || "Carregando..."}</Title>
      </FundoTitle>
      <FundoForm>
        <FlexDiv justfy="center">
          <h2>Peças</h2>
        </FlexDiv>
        <DataGrid>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Qntd M²</th>
            </tr>
          </thead>
          <tbody>
            {orcamentoVinculado?.pecas?.map((peca, index) => (
              <tr key={index}>
                <td>{peca?.nome}</td>
                <td>{peca?.descrição}</td>
                <td>{peca?.quantidade_metros}</td>
              </tr>
            ))}
          </tbody>
        </DataGrid>
        <FlexDiv justfy="space-around">
          <h2>Cliente: {cliente?.nome || "Carregando..."}</h2>
          <h2>Valor da venda: {venda?.valor_total || "Carregando..."}</h2>
        </FlexDiv>
      </FundoForm>
    </>
  );
};
