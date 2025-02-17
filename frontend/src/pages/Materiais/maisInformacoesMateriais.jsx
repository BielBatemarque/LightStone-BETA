import { useEffect, useState } from "react";
import { Title } from "../../components/Title/index";
import { Button } from "../../components/Button/index";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications/index";
import { FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { FloatLabel } from "../../components/FloatLabel/index";
import { StyledSelect } from "./styles";

export const MaisInformacoesMaterial = () => {
  const [material, setMaterial] = useState({});
  const [fornecedores, setFornecedroes] = useState([]);
  const { id } = useParams(":id");
  const { state } = useAuth();
  const navigate = useNavigate();

  const handleLoadForncedores = async () => {
    const request = await fetch("http://localhost:8000/fornecedores/");
    const response = await request.json();

    setFornecedroes(response);
  };

  useEffect(() => {
    handleLoadForncedores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fornecedor") {
      const selectedFornecedorId = parseInt(value);
      setMaterial({ ...material, [name]: [selectedFornecedorId] });
    } else {
      setMaterial({ ...material, [name]: value });
    }
  };

  const handleLoadMaterial = async () => {
    const request = await fetch(`http://localhost:8000/materiais/${id}/`);
    const response = await request.json();

    setMaterial(response);
  };

  useEffect(() => {
    handleLoadMaterial();
  }, []);

  const handleUpdateMaterial = async (e) => {
    e.preventDefault();

    const request = await fetch(`http://localhost:8000/materiais/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${state.token}`,
      },
      body: JSON.stringify(material),
    });

    if (request.ok) {
      SucssesNotifications("Sucesso ao editar Material");
      navigate("/Materiais/");
    } else {
      FailNotifications("Não foi possivel editar material");
    }
  };

  const handleDeleteMaterial = async () => {
    const request = await fetch(`http://localhost:8000/materiais/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${state.token}`,
      },
    });

    if (request.ok) {
      SucssesNotifications("Sucesso ao deletar Material");
      navigate("/Materiais/");
    } else {
      FailNotifications("Não foi possivel deletar material");
    }
  };

  return (
    <>
      <FundoTitle>
        <Title mt={0}>Material: {material.nome}</Title>
      </FundoTitle>
      <FundoForm>
        <StyledForm onSubmit={handleUpdateMaterial}>
          <FloatLabel
            type="text"
            text="Nome do material"
            name="nome"
            onChange={handleChange}
            value={material.nome}
            size={80}
          />{" "}
          <FloatLabel
            type="text"
            text="Cor base"
            name="cor_base"
            size={80}
            onChange={handleChange}
            value={material.cor_base}
          />{" "}
          <FloatLabel
            type="text"
            text="Preço por M²"
            name="preco_m2"
            size={80}
            onChange={handleChange}
            value={material.preco_m2}
          />{" "}
          <span>
            <label style={{ marginRight: "1rem" }}>Fornecedor: </label>
            <StyledSelect
              name="fornecedor"
              id=""
              onChange={handleChange}
              value={material.fornecedor}
            >
              {fornecedores.map((fornecedor, index) => (
                <option value={fornecedor.id} key={index}>
                  {fornecedor.nome_empresa}
                </option>
              ))}
            </StyledSelect>
          </span>
          <Button>Editar Material</Button>
          <Button color={"red"} action={handleDeleteMaterial}>
            Deletar Material
          </Button>
        </StyledForm>
      </FundoForm>
    </>
  );
};
