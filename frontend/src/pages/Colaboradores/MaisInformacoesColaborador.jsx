import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
    FormContainer, 
    StyledForm, 
    StyledField, 
    StyledButton, 
    StyledButtonContainer, 
    TitleStyled, 
    StyledSelect, 
    StyledOptions 
} from "./styles";
import { useAuth } from '../../hooks/useAuth';
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { FloatLabel } from "../../components/FloatLabel";

export const MaisInformacoesColaborador = () => {
    const [colaborador, setColaborador] = useState({});
    const [cargos, setCargos] = useState([]);
    const { id } = useParams(':id');
    const { state } = useAuth();
    const navigate = useNavigate();

    const handleLoadColaborador = async () => {
        try {
            const request = await fetch(`http://localhost:8000/colaboradores/${id}`);
            const response = await request.json();
            console.log("Dados carregados do colaborador:", response);
            setColaborador(response);
        } catch (error) {
            console.error("Erro ao carregar colaborador:", error);
        }
    };

    const handleLoadCargos = async () => {
        try {
            const request = await fetch('http://localhost:8000/cargos/');
            const response = await request.json();
            console.log("Cargos carregados:", response);
            setCargos(response);
        } catch (error) {
            console.error("Erro ao carregar cargos:", error);
        }
    };

    useEffect(() => {
        handleLoadColaborador();
        handleLoadCargos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Campo alterado: ${name}, Valor: ${value}`);
        setColaborador({ ...colaborador, [name]: value });
    };

    const handleUpdateColaborador = async (e) => {
        e.preventDefault();
        console.log("Dados enviados para atualização:", colaborador);
        console.log("Token utilizado:", state.token);

        try {
            const request = await fetch(`http://localhost:8000/colaboradores/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${state.token}`
                },
                body: JSON.stringify(colaborador),
            });

            const response = await request.json();
            console.log("Resposta da API ao atualizar:", response);

            if (request.ok) {
                SucssesNotifications('Colaborador editado com sucesso');
                navigate('/Colaboradores/');
            } else {
                console.error("Erro na requisição (status):", request.status);
                FailNotifications('Não foi possível editar Colaborador');
            }
        } catch (error) {
            console.error("Erro ao enviar requisição de atualização:", error);
            FailNotifications('Erro inesperado ao editar Colaborador');
        }
    };

    const handleDeleteColaborador = async () => {
        try {
            const request = await fetch(`http://localhost:8000/colaboradores/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${state.token}`,
                },
            });

            if (request.ok) {
                console.log("Colaborador deletado com sucesso");
                SucssesNotifications('Colaborador deletado com sucesso');
                navigate('/Colaboradores/');
            } else {
                console.error("Erro na requisição (status):", request.status);
                FailNotifications('Não foi possível deletar Colaborador');
            }
        } catch (error) {
            console.error("Erro ao enviar requisição de deleção:", error);
        }
    };

    return (
        <FormContainer>
            <TitleStyled>Colaborador: {colaborador.nome}</TitleStyled>
            <StyledForm onSubmit={(e) => {
                console.log("Formulário enviado para atualização");
                handleUpdateColaborador(e);
            }}>
                <StyledField>
                    <FloatLabel type="text" text="Nome" name="nome" onChange={handleChange} value={colaborador.nome} />
                </StyledField>
                <StyledField>
                    <FloatLabel type="date" name="nascimento" onChange={handleChange} value={colaborador.nascimento} />
                </StyledField>
                <StyledField>
                    <FloatLabel type="text" text="Telefone" name="telefone" onChange={handleChange} value={colaborador.telefone} />
                </StyledField>
                <StyledField>
                    <FloatLabel type="text" text="CPF" name="cpf" onChange={handleChange} value={colaborador.cpf} />
                </StyledField>
                <StyledField>
                    <FloatLabel type="email" text="E-mail" name="email" onChange={handleChange} value={colaborador.email} />
                </StyledField>
                <StyledField>
                    <label>Cargo:</label>
                    <StyledSelect value={colaborador.cargo} name="cargo" onChange={handleChange}>
                        <StyledOptions value="">Selecione um cargo</StyledOptions>
                        {cargos.map((cargo, index) => (
                            <StyledOptions value={cargo.id} key={index}>{cargo.nome}</StyledOptions>
                        ))}
                    </StyledSelect>
                </StyledField>
                <StyledButtonContainer>
                    <StyledButton type="submit">Editar Colaborador</StyledButton>
                    <StyledButton color="red" hoverColor="#d9534f" onClick={handleDeleteColaborador}>
                        Deletar Colaborador
                    </StyledButton>
                </StyledButtonContainer>
            </StyledForm>
        </FormContainer>
    );
};
