import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";
import { Item } from "../../components/ItemListagem";
import { useNavigate } from "react-router-dom";

export const OrcamentosPage = () => {
    const [orcamentos, setOrcamentos] = useState([]);
    const navigate = useNavigate();

    const orcamentosRequest = async () => {
        const request = await fetch(`http://localhost:8000/orcamentos/`);
        const response = await request.json();

        setOrcamentos(response);
    }

    useEffect(() => {
        orcamentosRequest();
    }, []);

    console.log(orcamentos);

    return(
        <>
            <FlexCointainer pontas='true' size='93%'>
                <Title>Orçamentos</Title>
                <Button action={() => navigate('/Orcamentos/NovoOrcamento/') }>Novo Orçamento</Button>
            </FlexCointainer>
            <Listing>
                {orcamentos.map(((orcamento, index) => (
                    <Item key={index} action={() => navigate(`/Orcamentos/MaisInformacoesOrcamento/${orcamento.id}/`)}>{orcamento.cliente}</Item>
                )))}
            </Listing>
        </>
    );
}