import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Button";
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { FloatLabel } from "../../components/FloatLabel";
import { Title } from "../../components/Title";
import { FlexDiv, FundoForm, FundoTitle, StyledForm, StyledSelect } from "./styles";

export const CadastrarUsuarioPage = () => {
    const [user, setUser] = useState({});
    const { state } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleCadastrarUser = async (e) => {
        e.preventDefault();

        const request = await fetch('http://localhost:8000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`
            },
            body: JSON.stringify(user),
        });

        if (request.ok) {
            SucssesNotifications('Usuário cadastrado com sucesso');
            navigate('/Usuarios/');
        } else {
            FailNotifications('Não foi possível cadastrar o usuário');
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
                        type="text" 
                        name="username" 
                        text="Nome de usuário" 
                        onChange={handleChange} 
                    /><br />

                    <FloatLabel 
                        type="email" 
                        name="email" 
                        text="Email" 
                        onChange={handleChange} 
                    /><br />

                    <span>
                        <label>Usuário administrador: </label>
                        <StyledSelect name="is_staff" onChange={handleChange}>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </StyledSelect>
                    </span><br />

                    <FloatLabel 
                        type="password" 
                        name="password" 
                        text="Senha" 
                        onChange={handleChange} 
                    /><br />

                    <FlexDiv>
                        <Button type="submit">Cadastrar</Button>
                        <Button 
                            color="red" 
                            action={() => navigate('/Usuarios/')}
                        >
                            Cancelar
                        </Button>
                    </FlexDiv>
                </StyledForm>
            </FundoForm>
        </>
    );
};
