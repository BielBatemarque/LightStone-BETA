import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";
import { Item } from "../../components/ItemListagem";
import { useNavigate } from "react-router-dom";
import { ContainerBtns } from "../Estoques/styles";
import { CadastrarClienteModal } from "../../components/Modal/CadastrarClienteModal";

export const OrcamentosPage = () => {
    const [orcamentos, setOrcamentos] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const orcamentosRequest = async () => {
        const request = await fetch(`http://localhost:8000/orcamentos/`);
        const response = await request.json();

        setOrcamentos(response);
    }

    useEffect(() => {
        orcamentosRequest();
    }, []);

    console.log(orcamentos);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return(
        <>
            <FlexCointainer pontas='true' size='93%'>
                <Title>Orçamentos</Title>
                <ContainerBtns>
                    <Button color={'blue'} action={handleOpenModal}>Novo Cliente</Button>
                    <Button action={() => navigate('/Orcamentos/NovoOrcamento/') }>Novo Orçamento</Button>
                </ContainerBtns>
            </FlexCointainer>
            <Listing>
                {orcamentos.map(((orcamento, index) => (
                    <Item key={index} action={() => navigate(`/Orcamentos/MaisInformacoesOrcamento/${orcamento.id}/`)}>{orcamento.cliente}</Item>
                )))}
            </Listing>
            <CadastrarClienteModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}