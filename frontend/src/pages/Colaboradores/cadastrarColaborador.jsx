import { Title } from "../../components/Title";
import { useEffect, useState } from "react";
import { Colaborador } from "../../models/Colaborador";
import { useAuth } from "../../hooks/useAuth";
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { useNavigate } from "react-router-dom";
import { 
    FormContainer, 
    StyledForm, 
    StyledField, 
    StyledButton, 
    StyledButtonContainer, 
    TitleStyled, 
    StyledSelect, 
    StyledOptions 
} from "./styles"; // Certifique-se de usar os estilos atualizados
import { FloatLabel } from "../../components/FloatLabel";

export const CadastrarColaboradorPage = () => {
    const [colab, setColab] = useState(new Colaborador());
    const [cargos, setCargos] = useState([]);
    const { state } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setColab({ ...colab, [name]: value });
    };

    const handleLoadCargos = async () => {
        const request = await fetch('http://localhost:8000/cargos/');
        const response = await request.json();
        setCargos(response);
    };

    useEffect(() => {
        handleLoadCargos();
    }, []);

    const handleCadastrarColab = async (e) => {
        e.preventDefault();

        const request = await fetch('http://localhost:8000/colaboradores/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`
            },
            body: JSON.stringify(colab),
        });

        if (request.ok) {
            SucssesNotifications('Cadastrado com sucesso');
            navigate('/Colaboradores/');
        } else {
            FailNotifications('Erro ao cadastrar Colaborador');
        }
    };

    return (
        <FormContainer>
            <TitleStyled>Cadastrar Colaborador</TitleStyled>
            <StyledForm onSubmit={handleCadastrarColab}>
                <StyledField>
                    <FloatLabel type="text" text="Nome" name="nome" onChange={handleChange} />
                </StyledField>
                <StyledField>
                    <FloatLabel type="date" text="Nascimento" name="nascimento" onChange={handleChange} />
                </StyledField>
                <StyledField>
                    <FloatLabel type="text" text="Telefone" name="telefone" onChange={handleChange} />
                </StyledField>
                <StyledField>
                    <FloatLabel type="text" text="CPF" name="cpf" onChange={handleChange} />
                </StyledField>
                <StyledField>
                    <FloatLabel type="email" text="E-mail" name="email" onChange={handleChange} />
                </StyledField>
                <StyledField>
                    <label>Cargo:</label>
                    <StyledSelect name="cargo" onChange={handleChange}>
                        <StyledOptions value="">Selecione um cargo</StyledOptions>
                        {cargos.map((cargo, index) => (
                            <StyledOptions value={cargo.id} key={index}>{cargo.nome}</StyledOptions>
                        ))}
                    </StyledSelect>
                </StyledField>
                <StyledButtonContainer>
                    <StyledButton type="submit">Cadastrar</StyledButton>
                    <StyledButton 
                        color="red" 
                        hoverColor="#d9534f" 
                        onClick={() => navigate('/Colaboradores/')}
                    >
                        Cancelar
                    </StyledButton>
                </StyledButtonContainer>
            </StyledForm>
        </FormContainer>
    );
};
