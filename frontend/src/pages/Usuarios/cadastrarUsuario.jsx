import { useState } from "react";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { useAuth } from "../../hooks/useAuth";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";
import { useNavigate } from "react-router-dom";
import { FlexDiv, FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { FloatLabel } from "../../components/FloatLabel";
import { StyledSelect } from "../Materiais/styles";

export const CadastrarUsuarioPage = () => {
  const [user, setUser] = useState({});
  const { state } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  console.log(user);

  const handleCadastrarUser = async (e) => {
    e.preventDefault();

    const request = await fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${state.token}`,
      },
      body: JSON.stringify(user),
    });

    if (request.ok) {
      SucssesNotifications("usuário cadastrado com sucesso");
      navigate("/Usuarios/");
    } else {
      FailNotifications("Não foi possivel cadastrar Usuário");
    }
  };

  return (
    <>
      <FundoTitle>
        <Title mt={0}>Cadastrar Usuário</Title>
      </FundoTitle>
      <FundoForm>
        <StyledForm onSubmit={handleCadastrarUser}>
          <FloatLabel
            size={80}
            type="text"
            name="username"
            text="nome de usuário"
            onChange={handleChange}
          />
          <FloatLabel
            size={80}
            type="email"
            name="email"
            text="Email"
            onChange={handleChange}
          />
          <span style={{ textAlign: "center" }}>
            <label>Usuário administrador: </label>
            <StyledSelect name="is_staff" onChange={handleChange}>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </StyledSelect>
          </span>
          <FloatLabel
            size={80}
            type="password"
            name="password"
            text="Senha"
            onChange={handleChange}
          />
          <FlexDiv justfy="center">
            <Button>Cadastrar</Button>
            <Button color={"red"} action={() => navigate("/Usuarios/")}>
              Cancelar
            </Button>
          </FlexDiv>
        </StyledForm>
      </FundoForm>
    </>
  );
};
