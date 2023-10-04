import { useEffect, useState } from "react";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";
import { Item } from '../../components/ItemListagem';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

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
        <div className="VendasPage">
            <FlexCointainer pontas="true" size={'93%'}>
                <Title>Vendas</Title>
                <Button action={() => navigate('/Vendas/CadastrarVenda/')}>Cadastrar Venda</Button>
            </FlexCointainer>
            <Listing>
                {vendas.map((venda, index) => (
                    <Item key={index}>{venda.valor_total}</Item>
                ))}
            </Listing>
        </div>
    );
}