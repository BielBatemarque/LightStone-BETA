import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";
import { Item } from "../../components/ItemListagem";
import { useNavigate } from "react-router-dom";

export const MateriaisPage = () => {
    const [materiais, setMateriais] = useState([]);
    const navigate = useNavigate();

    const handleLoadingMateriais = async() => {
        const request = await fetch('http://localhost:8000/materiais/');
        const response = await request.json();

        setMateriais(response);
    };

    useEffect(() => {
        handleLoadingMateriais();
    }, []);


    return(
       <>
            <FlexCointainer pontas="true" size={'93%'}>
                <Title>Materiais</Title>
                <Button action={() => navigate('/Materiais/cadastrarMaterial/')}>Novo Material</Button>
            </FlexCointainer>
            <Listing>
                {materiais.map((material, index) => (
                    <Item key={index}>{material.nome}</Item>
                    ))}
            </Listing>
            </>
    );
}