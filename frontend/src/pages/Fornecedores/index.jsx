import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../components/Datagrid/styled";
import { ListFilter } from "../../components/ListFilter";

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
            <FlexCointainer pontas="true" size={'98%'}>
                <Title>Fornecedores</Title>
                <Button children={'Novo Fornecedor'} action={() => navigate('/Fornecedores/cadastrarFornecedor/')}/>
            </FlexCointainer>
            <ListFilter />
            <DataGrid>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CNPJ</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {fornecedores.map((fornecedor, index) => (
                        <tr key={index}>
                            <td>{fornecedor.nome_empresa}</td>
                            <td>{fornecedor.cnpj}</td>
                            <td>{fornecedor.logradouro}</td>
                            <td className="actions">
                                <button className="edit">Editar</button>
                                <button className="delete">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </DataGrid>
        </div>
    );
}