import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../components/Datagrid/styled";
import { ListFilter } from "../../components/ListFilter";
import { globalContext } from "../../context/context";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";

export const FornecedoresPage = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();
  const { state } = useContext(globalContext);

  const handleLoadFornecedores = async () => {
    const response = await fetch("http://localhost:8000/fornecedores/");
    const request = await response.json();

    setFornecedores(request);
  };

  const handleFilter = async (nomeFornecedor) => {
    const request = await fetch(
      `http://localhost:8000/fornecedores/filtrar_fornecedores/?nome=${nomeFornecedor}`
    );
    const response = await request.json();

    setFornecedores(response);
  };
  useEffect(() => {
    handleLoadFornecedores();
  }, []);

  const handleDeleteFornecedor = async (fornecedorId) => {
    const request = await fetch(
      `http://localhost:8000/fornecedores/${fornecedorId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${state.token}`,
        },
      }
    );

    if (request.ok) {
      SucssesNotifications("Sucesso ao exluir Fornecedor");
      handleLoadFornecedores();
    } else {
      FailNotifications("Erro ao tentar deletar Fornecedor");
    }
  };

  return (
    <div className="Fornecedores">
      <FlexCointainer pontas="true" size={"98%"}>
        <Title>Fornecedores</Title>
        <Button
          children={"Novo Fornecedor"}
          action={() => navigate("/Fornecedores/cadastrarFornecedor/")}
        />
      </FlexCointainer>
      <ListFilter action={handleFilter} />
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
                <button
                  className="edit"
                  onClick={() =>
                    navigate(
                      `/Fornecedor/maisInformacoesFornecedor/${fornecedor.id}/`
                    )
                  }
                >
                  Editar
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteFornecedor(fornecedor.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </DataGrid>
    </div>
  );
};
