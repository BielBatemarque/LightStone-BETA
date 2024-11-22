import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { DataGrid  } from '../../components/Datagrid/styled';
import { ListFilter } from "../../components/ListFilter";

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
        <>
            <FlexCointainer size={'98%'} pontas='true'>
                <Title>Colaboradores</Title>
                <Button action={() => navigate('/Colaboradores/CadastrarColaborador/')}>Novo Colaborador</Button>
            </FlexCointainer>

            <ListFilter />
            <DataGrid>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {colabs.map((colab, index) => (
                        <tr key={index}>
                            <td>{colab.nome}</td>
                            <td>{colab.cpf}</td>
                            <td>{colab.email}</td>
                            <td>{colab.cargo_nome}</td>
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