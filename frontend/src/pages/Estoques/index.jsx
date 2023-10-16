import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { FlexCointainer } from '../../components/FlexContainer';
import { Listing } from '../../components/Listing';
import { Title } from '../../components/Title/index';
import { Item } from '../../components/ItemListagem';
import { ContainerBtns } from './styles';

export const EstoquesPage = () => {
    const [estoques, setEstoques] = useState([]);

    const handleLoadingEstoques = async () => {
        const request = await fetch('http://localhost:8000/estoques/');
        const response = await request.json()

        setEstoques(response);
    };

    useEffect(() => {
        handleLoadingEstoques();
    }, []);

    const handleMovimentacaoDeEstoque =  async (tipoMovimentação) => {
        window.alert(`Tipo da movimentação: ${tipoMovimentação}`);
    };

    return(
        <>
           <FlexCointainer pontas='true' size={'93%'}>
                <Title>Estoque</Title>
                <ContainerBtns>
                    <Button color={'red'} action={() => handleMovimentacaoDeEstoque('Saída')}>Registrar Saída</Button>
                    <Button action={() => handleMovimentacaoDeEstoque('Entrada')} >Registrar Entrada</Button>
                </ContainerBtns>
           </FlexCointainer>
           <Listing>
                {estoques.map((estoque, index) => (
                    <Item key={index} >{estoque.material}</Item>
                ))}
           </Listing>
        </>  
    );
};