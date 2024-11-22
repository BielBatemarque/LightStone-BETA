import { useEffect, useState } from "react";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";
import { Item } from '../../components/ItemListagem';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ContainerBtns } from "../Estoques/styles";
import { ListFilter } from "../../components/ListFilter";
import { DataGrid } from '../../components/Datagrid/styled';

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

    const handleFilter = async (nomeCliente) => {
        const request = await fetch(`http://localhost:8000/vendas/retorna_vendas_filtradas/?cliente=${nomeCliente}`);
        const response = await request.json();

        console.log(response);
        setVendas(response);
    }



    return(
        <>
            <FlexCointainer pontas="true" size={'98%'}>
                <Title>Vendas</Title>
                <ContainerBtns>
                    <Button action={() => navigate('/Orcamentos/')} color={'gray'}>Orçamentos</Button>
                    <Button action={() => navigate('/Vendas/CadastrarVenda/')}>Nova Venda</Button>
                </ContainerBtns>
            </FlexCointainer>
            <ListFilter action={handleFilter}/>
            <DataGrid>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </DataGrid>
        </>
    );
}