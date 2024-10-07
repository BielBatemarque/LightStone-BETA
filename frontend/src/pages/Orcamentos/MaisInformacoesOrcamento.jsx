import { useParams } from "react-router-dom";
import { FlexDiv, FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { Title } from "../../components/Title";
import { FloatLabel } from '../../components/FloatLabel/index';
import { useEffect, useState } from "react";
import { Cliente } from '../../models/Cliente';
import { StyledOptions, StyledSelect } from "../Materiais/styles";

export const MaisInformacoesOrcamento = () => {
    const { id } = useParams(':id');
    const [orcamento, setOrcamento] = useState({});
    const [clientes, setClientes] = useState([]);

    const orcamentoRequest = async () => {
        const request = await fetch(`http://localhost:8000/orcamentos/${id}/`);
        const response = await request.json();

        setOrcamento(response);
    }

    const clientesRequest = async () => {
        const request = await fetch(`http://localhost:8000/clientes`);
        const response = await request.json();

        setClientes(response);
    }

    const handleClienteChange = (e) => {
        const { value } = e.target;
        setOrcamento({ ...orcamento, cliente: value });
    }

    useEffect(() => {
        orcamentoRequest();
        clientesRequest();
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
                    <span>
                        <br />
                        <label htmlFor="">Cliente:  </label>
                        <StyledSelect
                            name="cliente"
                            value={orcamento.cliente || ''} // Define o valor do select com o cliente do orçamento
                            onChange={handleClienteChange} // Atualiza o cliente selecionado
                        >
                            <StyledOptions value="" disabled>Selecione um cliente</StyledOptions>
                            {clientes.map((cliente, index) => (
                                <StyledOptions value={cliente.id} key={index}>
                                    {cliente.nome}
                                </StyledOptions>
                            ))}
                        </StyledSelect>
                    </span>

                    <FloatLabel name={'valor_total'} text="Total do Orçamento" onChange={handleChange} value={orcamento.valor_total} />
                    <h3>Peças </h3>
                    <FlexDiv>
                        <table>
                            <thead>
                                <tr>
                                    <td>Nome</td>
                                    <td>Descrição</td>
                                    <td>Material</td>
                                    <td>M²</td>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </FlexDiv>
                </StyledForm>
            </FundoForm>

        </>
    );
}