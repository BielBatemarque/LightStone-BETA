import { useEffect, useState } from "react";
import { Item } from "../../components/ItemListagem";
import { Listing } from "../../components/Listing";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import { ContainerBtns } from "../Estoques/styles";
import { CadastrarOrcamentoModal } from '../../components/Modal/CadastrarOrcamentoModal';

export const ClientesPage = () => {
    const[clientes, setClientes] = useState([]);
    const navegate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        handleCarregaClientes();
    }, []);

    const handleCarregaClientes = async () => {
        const request = await fetch('http://localhost:8000/clientes/');
        const response = await request.json();

        setClientes(response);
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return(
        <>
            <FlexCointainer pontas='true' size={'92%'}>
                <Title>Clientes</Title>
                {/* <Filtro /> */}
                <ContainerBtns>
                    <Button color='blue' action={handleOpenModal}>Novo Orçamento</Button>
                    <Button action={() => navegate('/Clientes/cadastrarCliente/')}>Novo Cliente</Button>
                </ContainerBtns>
           </FlexCointainer>
           <Listing>
                {clientes.map((cliente, index) => (
                    <Item key={index} action={() => navegate(`/Clientes/maisInformacoesCliente/${cliente.id}/`)}>{cliente.nome}</Item>
                    ))}
            </Listing>
            <CadastrarOrcamentoModal isOpen={isModalOpen} onClose={handleCloseModal}/>
        </>
    );
};