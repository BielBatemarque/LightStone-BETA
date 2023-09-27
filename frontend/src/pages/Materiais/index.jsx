import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";
import { Item } from "../../components/ItemListagem";

export const MateriaisPage = () => {
    const [materiais, setMateriais] = useState([]);

    const handleLoadingMateriais = async() => {
        const request = await fetch('http://localhost:8000/materiais/');
        const response = await request.json();

        setMateriais(response);
    };

    useEffect(() => {
        handleLoadingMateriais();
    });


    return(
        <div className="materiais">
            <FlexCointainer pontas={true} size={'93%'}>
                <Title>Materiais</Title>
                <Button>Novo Material</Button>
            </FlexCointainer>
            <Listing>
                {materiais.map(material => (
                    <Item>{material.nome}</Item>
                ))}
            </Listing>
        </div>
    );
}