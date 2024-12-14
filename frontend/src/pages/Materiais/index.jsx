import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { ListFilter } from "../../components/ListFilter";
import { DataGrid } from "../../components/Datagrid/styled";
import { globalContext } from "../../context/context";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";

export const MateriaisPage = () => {
  const [materiais, setMateriais] = useState([]);
  const navigate = useNavigate();
  const { state } = useContext(globalContext);

  const handleLoadingMateriais = async () => {
    const request = await fetch("http://localhost:8000/materiais/");
    const response = await request.json();

    setMateriais(response);
  };

  useEffect(() => {
    handleLoadingMateriais();
  }, []);

  const FormataValorMonetario = (valor) => {
    return `R$ ${Number(valor).toFixed(2).replace(".", ",")}`;
  };

  const handleDeleteMaterial = async (materialId) => {
    const request = await fetch(
      `http://localhost:8000/materiais/${materialId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${state.token}`,
        },
      }
    );

    if (request.ok) {
      SucssesNotifications("Sucesso ao deletar material");
      handleLoadingMateriais();
    } else {
      FailNotifications("Não foi possivel deletar Material");
    }
  };

  return (
    <>
      <FlexCointainer pontas="true" size={"98%"}>
        <Title>Materiais</Title>
        <Button action={() => navigate("/Materiais/cadastrarMaterial/")}>
          Novo Material
        </Button>
      </FlexCointainer>
      <ListFilter />
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
              <td>{FormataValorMonetario(material.preco_m2)}</td>
              <td className="actions">
                <button
                  className="edit"
                  onClick={() =>
                    navigate(
                      `/Materiais/maisInformacoesMaterial/${material.id}/`
                    )
                  }
                >
                  Editar
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteMaterial(material.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </DataGrid>
    </>
  );
};
