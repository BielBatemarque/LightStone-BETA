import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { FlexCointainer } from '../../components/FlexContainer';
import { Listing } from '../../components/Listing';
import { Title } from '../../components/Title/index';
import { Item } from '../../components/ItemListagem';
import { ContainerBtns } from './styles';
import { useNavigate } from 'react-router-dom';

export const EstoquesPage = () => {
    const [estoques, setEstoques] = useState([]);
    const [, setMateriais] = useState([]);
    const navigate = useNavigate();

    const handleLoadingEstoques = async () => {
        const request = await fetch('http://localhost:8000/estoques/');
        const response = await request.json();

        const estoquesComNomesDeMateriais = response.map(async (estoque) => {
            const materialRequest = await fetch(`http://localhost:8000/materiais/${estoque.material}`);
            const materialResponse = await materialRequest.json();
            return { ...estoque, materialNome: materialResponse.nome };
        });

        const estoquesAtualizados = await Promise.all(estoquesComNomesDeMateriais);

        setEstoques(estoquesAtualizados);
    };

    console.log(estoques);


    const handleLoadingMateriais = async () => {
        const request = await fetch('http://localhost:8000/materiais/');
        const response = await request.json()

        setMateriais(response);
    };

    useEffect(() => {
        handleLoadingEstoques();
        handleLoadingMateriais();
    }, []);

    const handleMovimentacaoDeEstoque =  async (tipoMovimentação) => {
        window.alert(`Tipo da movimentação: ${tipoMovimentação}`);
    };

    return(
        <>
           <FlexCointainer pontas='true' size={'93%'}>
                <Title>Estoque</Title>
                <ContainerBtns>
                    <Button color={'red'} action={() => navigate('/Estoque/movimentacaoDeEstoque/saida')}>Registrar Saída</Button>
                    <Button action={() => navigate('/Estoque/movimentacaoDeEstoque/entrada')}>Registrar Entrada</Button>
                </ContainerBtns>
           </FlexCointainer>
           <Listing>
                {estoques.map((estoque, index) => (
                    <Item key={index}>{estoque.materialNome}</Item>
                ))}
           </Listing>
        </>  
    );
};