import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { useEffect, useState } from "react";
import { Estoque } from '../../models/Estoque';
import { FundoForm, FundoTitle } from '../Clientes/styles';
import { ItemListagemMovEstoque, ListagemDeMovimentacoes } from "./styles";


export const MaisInformacoesEstoque = () => {
    const [estoque, setEstoque] = useState(new Estoque());
    const { id } = useParams(':id');
    const [material, setMaterial] = useState({});
    const [movimentacoes, setMovimentacoes] = useState([]);

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
        const request = await fetch('http://localhost:8000/movimentacoes_estoque/');
        const response = await request.json();

        const movimentacoesFiltradas = response.filter(mov => mov.produto === material.id);

        setMovimentacoes(movimentacoesFiltradas);
        console.log(response);
    };

    useEffect(() => {
        handleLoadMovimentacaoDeEstoque();
    }, []);





    useEffect(() => {
        handleLoadEstoque();
    }, []);

    return(
        <>
            <FundoTitle>
                <Title mt={0}>Estoque: {material.nome}</Title>
            </FundoTitle>
            <FundoForm>
                <h1 style={{margin: '0', textAlign:'center'}}>Quantidade de metros: {estoque.quantidade_metros}</h1>
                <hr />
                <h2 style={{marginTop: '1rem', textAlign: 'center'}}>Historico de Movimentações</h2>
                <ListagemDeMovimentacoes>
                    <ItemListagemMovEstoque>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                    </ItemListagemMovEstoque>
                </ListagemDeMovimentacoes>

            </FundoForm>
        </>
    );
};