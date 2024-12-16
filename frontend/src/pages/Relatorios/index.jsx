import { useState } from "react";
import { Title } from "../../components/Title";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";
import { FlexRow, FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { FloatLabel } from "../../components/FloatLabel";
import { Button } from "../../components/Button";

export const RelatoriosPage = () => {
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  const handleFetchRelatorioVendas = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/relatorios/vendas/?data_inicial=${dataInicial}&data_final=${dataFinal}`
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.download = "relatorio_vendas.pdf";
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        SucssesNotifications("Relatório de vendas gerado com sucesso!");
      } else {
        console.error("Erro na requisição:", response.statusText);
        FailNotifications("Erro ao gerar relatório de vendas.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleFetchRelatorioOrcamentos = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/relatorios/orcamentos/?data_inicial=${dataInicial}&data_final=${dataFinal}`
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.download = "relatorio_orcamentos.pdf";
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        SucssesNotifications("Relatório de orçamentos gerado com sucesso!");
      } else {
        console.error("Erro na requisição:", response.statusText);
        FailNotifications("Erro ao gerar relatório de orçamentos.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <>
      <FundoTitle>
        <Title mt={0}>Relatórios</Title>
      </FundoTitle>
      <FundoForm>
        <StyledForm>
          <FlexRow>
            <FloatLabel name="Data Inicial" text="Data Inicial" type="date" />
            <FloatLabel name="Data Inicial" text="Data Final" type="date" />
          </FlexRow>

          <FlexRow style={{ margin: "0 auto" }}>
            <Button>Relatório de vendas</Button>
            <Button>Relatório de orçamentos</Button>
          </FlexRow>
        </StyledForm>
      </FundoForm>
    </>
  );
};
