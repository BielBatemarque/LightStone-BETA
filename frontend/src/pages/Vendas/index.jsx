import { useEffect, useState } from "react";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";
import { Item } from '../../components/ItemListagem';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ContainerBtns } from "../Estoques/styles";

export const VendasPage = () => {
    const [vendas, setVendas] = useState([]);
    const navigate = useNavigate();

    const handleLoadVendas = async () => {
        const request = await fetch('http://localhost:8000/vendas/');
        const response = await request.json();

        setVendas(response);
    }

    useEffect(() => {
        handleLoadVendas();
    }, []);

    return(
        <>
            <FlexCointainer pontas="true" size={'93%'}>
                <Title>Vendas</Title>
                <ContainerBtns>
                    <Button action={() => navigate('/Orcamentos/')} color={'gray'}>Novo Orçamento</Button>
                    <Button action={() => navigate('/Vendas/CadastrarVenda/')}>Nova Venda</Button>
                </ContainerBtns>
            </FlexCointainer>
            <Listing>
                {vendas.map((venda, index) => (
                    <Item key={index} action={() => navigate(`/Vendas/MaisInformacoesVenda/${venda.id}`)}>{venda.valor_total}</Item>
                    ))}
            </Listing>
        </>
    );
}