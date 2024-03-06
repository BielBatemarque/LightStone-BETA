import { useParams } from "react-router-dom";
import { FundoForm, FundoTitle } from "../Clientes/styles";
import { Title } from "../../components/Title";
import { useEffect, useState } from "react";

export const MaisInformacoesOrcamento = () => {
    const { id } = useParams(':id');
    const [orcamento, setOrcamento] = useState({});

    const orcamentoRequest = async () => {
        const request = await fetch(`http://localhost:8000/orcamentos/${id}/`);
        const response = await request.json();

        setOrcamento(response);
    }

    useEffect(() => {
        orcamentoRequest();
    }, []);

    return(
        <>
            <FundoTitle>
                <Title mt={0}>Orçamento: {orcamento.id}</Title>
            </FundoTitle>
            <FundoForm>

            </FundoForm>

        </>
    );
}