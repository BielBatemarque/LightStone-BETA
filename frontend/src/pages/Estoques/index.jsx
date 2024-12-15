import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title/index";
import { ContainerBtns } from "./styles";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../components/Datagrid/styled";
import { ListFilter } from "../../components/ListFilter";

export const EstoquesPage = () => {
  const [estoques, setEstoques] = useState([]);
  const navigate = useNavigate();

  const handleLoadingEstoques = async () => {
    const request = await fetch(
      "http://localhost:8000/estoques/listagem_estoque_material/"
    );
    const response = await request.json();

    setEstoques(response);
  };

  console.log(estoques);

  const handleFilter = async (nomeMaterial) => {
    const request = await fetch(
      `http://localhost:8000/estoques/filtrar_estoque/?material=${nomeMaterial}`
    );
    const response = await request.json();

    setEstoques(response);
  };

  useEffect(() => {
    handleLoadingEstoques();
  }, []);

  return (
    <>
      <FlexCointainer pontas="true" size={"93%"}>
        <Title>Estoque</Title>
        <ContainerBtns>
          <Button
            color={"red"}
            action={() => navigate("/Estoque/movimentacaoDeEstoque/saida")}
          >
            Registrar Saída
          </Button>
          <Button
            action={() => navigate("/Estoque/movimentacaoDeEstoque/entrada")}
          >
            Registrar Entrada
          </Button>
        </ContainerBtns>
      </FlexCointainer>
      <ListFilter action={handleFilter} />
      <DataGrid>
        <thead>
          <tr>
            <th>Material</th>
            <th>Qntd. M²</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estoques.map((estoque, index) => (
            <tr key={index}>
              <td>{estoque.material.nome}</td>
              <td>{estoque.quantidade_metros}</td>
              <td className="actions">
                <button
                  className="edit"
                  onClick={() =>
                    navigate(`/Estoque/maisInformacoesEstoque/${estoque.id}/`)
                  }
                >
                  Ver movimentações
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </DataGrid>
    </>
  );
};
