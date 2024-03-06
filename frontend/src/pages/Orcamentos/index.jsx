import { useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";
import { Item } from "../../components/ItemListagem";

export const OrcamentosPage = () => {
    const [orcamentos, setOrcamentos] = useState([]);

    const orcamentosRequest = async () => {
        const request = await fetch(`http://localhost:8000/orcamentos/`);
        const response = await request.json();

        setOrcamentos(response);
    }

    return(
        <>
            <FlexCointainer pontas={true} size='93%'>
                <Title>Orçamentos</Title>
                <Button>Novo Orçamento</Button>
            </FlexCointainer>
            <Listing>
                {orcamentos.map(((orcamento, index) => (
                    <Item key={index}>{orcamento.cliente}</Item>
                )))}

            </Listing>
        </>
    );
}