import { useParams } from "react-router-dom";
import { FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { Title } from "../../components/Title";
import { FloatLabel } from '../../components/FloatLabel/index';
import { useEffect, useState } from "react";
import { Cliente } from '../../models/Cliente';

export const MaisInformacoesOrcamento = () => {
    const { id } = useParams(':id');
    const [orcamento, setOrcamento] = useState({});
    const [cliente, setCliente] = useState(new Cliente);

    const orcamentoRequest = async () => {
        const request = await fetch(`http://localhost:8000/orcamentos/${id}/`);
        const response = await request.json();

        setOrcamento(response);
    }

    const clienteRequest = async () => {
        const request = await fetch(`http://localhost:8000/clientes/${orcamento.cliente}`);
        const response = await request.json();

        setCliente(response);
    }

    

    useEffect(() => {
        orcamentoRequest();
        clienteRequest();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setOrcamento({...orcamento, [name] : value});
    }

    console.log(orcamento);

    return(
        <>
            <FundoTitle>
                <Title mt={0}>Orçamento: {orcamento.id}</Title>
            </FundoTitle>
            <FundoForm>
                <StyledForm>
                    <FloatLabel name={'cliente'} text="Cliente" onChange={handleChange} value={cliente.nome}/>
                    <FloatLabel name={'valor_total'} text="Total do Orçamento" onChange={handleChange} value={orcamento.valor_total} />
                </StyledForm>
            </FundoForm>

        </>
    );
}