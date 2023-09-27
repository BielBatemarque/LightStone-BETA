import { useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";

export const MateriaisPage = () => {
    const [materiais, setMateriais] = useState([]);

    const handleLoadingMateriais = async() => {
        const request = await fetch('http://localhost:8000/materiais/');
        const response = await request.json();

        setMateriais(response);
    }
    return(
        <div className="materiais">
            <FlexCointainer pontas={true} size={'93%'}>
                <Title>Materiais</Title>
                <Button>Novo Material</Button>
            </FlexCointainer>
            <Listing>

            </Listing>
        </div>
    );
}