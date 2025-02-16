import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { FlexDiv, FundoForm, FundoTitle } from "../Clientes/styles";
import { useEffect, useState } from "react";
import { DataGrid } from "../../components/Datagrid/styled";
import { Flex } from "../../components/ListFilter/styled";

export const MaisInformacoesVenda = () => {
    const { id } = useParams(':id');

    const [venda, setVenda] = useState({});
    const [orcamentoVinculado, setOrcamentoVinculado] = useState({});
    const [cliente, setCliente] = useState({});

    const handleLoadVenda = async () => {
        const request = await fetch(`http://localhost:8000/vendas/${id}/`);
        const response = await request.json()

        setVenda(response);
    }

    const orcamentoRequest = async () => {
        const request = await fetch(`http://localhost:8000/orcamentos/retorna_orcamento_com_pecas/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: await venda.orcamento}),
        });
        const response = await request.json();

        setOrcamentoVinculado(response);
    }

    
    const handleLoadCLiente = async () => {
        const request = await fetch(`http://localhost:8000/clientes/${venda.cliente}`);
        const response = await request.json();
        
        setCliente(response);
    }

    useEffect(() => {
        handleLoadVenda();
        orcamentoRequest();
        handleLoadCLiente();
    }, []);



    console.log(orcamentoVinculado);
    return(
        <>
            <FundoTitle>
                <Title mt={0}>Venda: {cliente.nome}</Title>
            </FundoTitle>
            <FundoForm>
                <FlexDiv justfy="center">
                    <h2>Peças</h2>
                </FlexDiv>
                <DataGrid>
                    <thead>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Qntd M²</th>
                    </thead>
                    <tbody>
                        {orcamentoVinculado?.pecas?.map(peca => (
                            <tr>
                                <td>{peca.nome}</td>
                                <td>{peca.descrição}</td>
                                <td>{peca.quantidade_metros}</td>
                            </tr>
                        ))}
                    </tbody>
                </DataGrid>
                <FlexDiv justfy="space-around">
                    <h2>Cliente: {cliente.nome}</h2>
                    <h2>Valor da venda: {venda.valor_total}</h2>
                </FlexDiv>
         
            </FundoForm>
        </>
    );
}