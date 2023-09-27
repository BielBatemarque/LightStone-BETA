import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";
import { Item } from "../../components/ItemListagem";

export const FornecedoresPage = () => {
    const [fornecedores, setFornecedores] = useState([]);

    const handleLoadFornecedores = async () => {
        const response = await fetch('http://localhost:8000/fornecedores/');
        const request = await response.json();

        setFornecedores(request);
    }

    useEffect(() => {
        handleLoadFornecedores();
    }, []);

    return(
        <div className="Fornecedores">
            <FlexCointainer pontas={true} size={'93%'}>
                <Title>Fornecedores</Title>
                <Button children={'Novo Fornecedor'}/>
            </FlexCointainer>
            <Listing>
                {fornecedores.map(fornecedor => (
                    <Item>{fornecedor.nome_empresa}</Item>
                ))}
            </Listing>
        </div>
    );
}