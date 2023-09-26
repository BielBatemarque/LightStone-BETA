import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { Item } from "../../components/ItemListagem";

export const ColaboradorPages = () => {
    const [colabs, setColabs] = useState([]);
    const navigate = useNavigate();

    const handleLoadingColabs = async () => {
        const request = await fetch('http://localhost:8000/colaboradores/');
        const response = await request.json();

        setColabs(response);
    };

    useEffect(() => {
        handleLoadingColabs();
    }, []);

    console.log(colabs);

    return(
        <div className="Colaboradores">
            <FlexCointainer size={'93%'} pontas={true}>
                <Title>Colaboradores</Title>
                <Button action={() => navigate('/Colaboradores/CadastrarColaborador/')}>Novo Colaborador</Button>
            </FlexCointainer>
            <Listing>
                {colabs.map(colab => (
                    <Item>{colab.nome}</Item>
                ))}
            </Listing>
        </div>
    );
}