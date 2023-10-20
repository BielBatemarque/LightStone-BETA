import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";
import { Item } from "../../components/ItemListagem";
import { useNavigate } from "react-router-dom";

export const FornecedoresPage = () => {
    const [fornecedores, setFornecedores] = useState([]);
    const navigate = useNavigate();

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
            <FlexCointainer pontas="true" size={'93%'}>
                <Title>Fornecedores</Title>
                <Button children={'Novo Fornecedor'} action={() => navigate('/Fornecedores/cadastrarFornecedor/')}/>
            </FlexCointainer>
            <Listing>
                {fornecedores.map((fornecedor, index) => (
                    <Item key={index} action={() => window.alert('Mais informações')}>{fornecedor.nome_empresa}</Item>
                ))}
            </Listing>
        </div>
    );
}