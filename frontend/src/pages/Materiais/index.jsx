import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";
import { Item } from "../../components/ItemListagem";
import { useNavigate } from "react-router-dom";
import { ListFilter } from "../../components/ListFilter";
import { DataGrid } from "../../components/Datagrid/styled";

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
         <FlexCointainer pontas="true" size={'98%'}>
            <Title>Materiais</Title>
            <Button action={() => navigate('/Materiais/cadastrarMaterial/')}>Novo Material</Button>
        </FlexCointainer>
        <DataGrid>
            <thead>
                <tr>
                    <th>Nome do Material</th>
                    <th>Cor Base</th>
                    <th>Ultimo Fornecedor</th>
                    <th>Preço por M²</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {materiais.map((material, index) => (
                    <tr>
                        <td>{material.nome}</td>
                        <td>{material.cor_base}</td>
                        <td>{material.fornecedor}</td>
                        <td>{material.preco_m2}</td>
                        <td className="actions">
                            <button className="edit">Editar</button>
                            <button className="delete">Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </DataGrid>
        </>
    );
};