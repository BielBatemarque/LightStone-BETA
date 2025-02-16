import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { useEffect, useState } from "react";
import { Estoque } from '../../models/Estoque';
import { FlexDiv, FundoForm, FundoTitle } from '../Clientes/styles';
import { ItemListagemMovEstoque, ListagemDeMovimentacoes } from "./styles";
import { DataGrid } from "../../components/Datagrid/styled";


export const MaisInformacoesEstoque = () => {
    const [estoque, setEstoque] = useState(new Estoque());
    const { id } = useParams(':id');
    const [material, setMaterial] = useState({});
    const [movimentacoes, setMovimentacoes] = useState([]);
    

    console.log(movimentacoes);

    const handleLoadEstoque = async () => {
        const request = await fetch(`http://localhost:8000/estoques/${id}/`);
        const response = await request.json();
    
        if (response.material) {
            setEstoque(response);
            const requestMaterial = await fetch(`http://localhost:8000/materiais/${response.material}/`);
            const responseMaterial = await requestMaterial.json();
            setMaterial(responseMaterial);
        } else {
            console.error("Propriedade 'material' não encontrada na resposta da primeira requisição.");
        }
    };

    const handleLoadMovimentacaoDeEstoque = async () => {
        const request = await fetch(`http://localhost:8000/movimentacoes_estoque/retorna_movimentacoes_por_estoque/?produto=${id}`);
        const response = await request.json();

        setMovimentacoes(response);
    };

    useEffect(() => {
        handleLoadMovimentacaoDeEstoque();
    }, []);

    useEffect(() => {
        handleLoadEstoque();
    }, []);

    console.log(movimentacoes);

    const formatarData = (dataISO) => {
        return new Date(dataISO).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };
    

    return(
        <>
            <FundoTitle>
                <Title mt={0}>Estoque: {material.nome}</Title>
            </FundoTitle>
            <FundoForm>
                <h1 style={{margin: '0', textAlign:'center'}}>Quantidade de metros: {estoque.quantidade_metros}</h1>
                <hr />
                <h2 style={{marginTop: '1rem', textAlign: 'center'}}>Historico de Movimentações</h2>
                <DataGrid>
                    <thead>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>M² movimentados</th>
                    </thead>
                    <tbody>
                        {movimentacoes.map(movimentacao => (
                            <tr>
                                <td>{formatarData(movimentacao.data)}</td>
                                <td>{movimentacao.tipo}</td>
                                <td>{movimentacao.quantidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </DataGrid>
            </FundoForm>
        </>
    );
};