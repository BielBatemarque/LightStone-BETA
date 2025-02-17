import { useState } from "react";
import { Title } from "../../components/Title";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";
import { FlexDiv, FlexRow, FundoForm, FundoTitle } from "../Clientes/styles";
import { FloatLabel } from "../../components/FloatLabel";
import { Button } from "../../components/Button";

export const RelatoriosPage = () => {
  const [dataInicial] = useState("");
  const [dataFinal] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/gerar_pdf/");

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        // a.download = 'relatorio.pdf';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        SucssesNotifications("Relatório gerado com sucesso");
      } else {
        console.error("Erro na requisição:", response.statusText);
        FailNotifications("Erro ao gerar Relatório");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleFetchRelatorioOrcamentos = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/gerar_pdf_orcamentos/`
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
        <FlexRow>
          <FloatLabel name="Data Inicial" text="Data Inicial" type="date" />
          <FloatLabel name="Data Inicial" text="Data Final" type="date" />
        </FlexRow>

        <FlexDiv justfy="center">
          <Button action={fetchData}>Relatório de vendas</Button>
          <Button action={() => handleFetchRelatorioOrcamentos()}>
            Relatório de orçamentos
          </Button>
        </FlexDiv>
      </FundoForm>
    </>
  );
};
