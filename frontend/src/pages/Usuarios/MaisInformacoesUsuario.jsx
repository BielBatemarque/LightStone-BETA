import { useEffect, useState } from "react";
import { Title } from "../../components/Title";
import { Button } from '../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FailNotifications, SucssesNotifications } from '../../components/Notifications';
import { FundoForm, FundoTitle, StyledForm, StyledSelect } from './styles';
import { FloatLabel } from "../../components/FloatLabel";

export const MaisInformacoesUsuarios = () => {
    const [usuario, setUsuario] = useState({});
    const { id } = useParams();
    const { state } = useAuth();
    const navigate = useNavigate();

    const handleLoadingUser = async () => {
        try {
            const request = await fetch(`http://localhost:8000/users/${id}`);
            if (!request.ok) throw new Error('Erro ao carregar usuário');

            const response = await request.json();
            // Certifica que is_staff seja boolean ao carregar os dados
            setUsuario({
                ...response,
                is_staff: Boolean(response.is_staff),
            });
        } catch (error) {
            FailNotifications('Erro ao carregar usuário');
        }
    };

    useEffect(() => {
        if (id) handleLoadingUser();
    }, [id]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        // Converte `is_staff` para boolean antes de enviar
        const dataToSend = {
            ...usuario,
            is_staff: usuario.is_staff === true || usuario.is_staff === "true",
        };

        try {
            const request = await fetch(`http://localhost:8000/users/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${state.token}`,
                },
                body: JSON.stringify(dataToSend),
            });

            if (request.ok) {
                SucssesNotifications('Sucesso ao editar usuário');
                navigate('/Usuarios/');
            } else {
                throw new Error('Falha ao editar');
            }
        } catch (error) {
            FailNotifications(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: name === "is_staff" ? value === "true" : value, // Converte "is_staff" para boolean no estado
        }));
    };

    const handleDeleteUser = async () => {
        try {
            const request = await fetch(`http://localhost:8000/users/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${state.token}`,
                },
            });

            if (request.ok) {
                SucssesNotifications('Sucesso ao deletar usuário');
                navigate('/Usuarios/');
            } else {
                throw new Error('Falha ao deletar usuário');
            }
        } catch (error) {
            FailNotifications(error.message);
        }
    };

    return (
        <>
            <FundoTitle>
                <Title mt={0}>Editar Usuário</Title>
            </FundoTitle>
            <FundoForm>
                <StyledForm onSubmit={handleUpdateUser}>
                    <FloatLabel
                        type="text"
                        name="username"
                        text="Nome de usuário"
                        onChange={handleChange}
                        value={usuario.username || ''}
                    /><br />
                    <FloatLabel
                        type="email"
                        name="email"
                        text="Email"
                        onChange={handleChange}
                        value={usuario.email || ''}
                    /><br />
                    <span>
                        <label style={{ marginRight: '1rem' }}>Super-Usuário: </label>
                        <StyledSelect
                            name="is_staff"
                            onChange={handleChange}
                            value={usuario.is_staff ? "true" : "false"} // Certifica que o valor seja sempre uma string para o dropdown
                        >
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </StyledSelect>
                    </span><br />
                    <FloatLabel
                        type="password"
                        name="password"
                        text="Senha"
                        onChange={handleChange}
                        value={usuario.password || ''}
                    /><br />
                    <Button>Editar Usuário</Button>
                    <Button color={'red'} action={handleDeleteUser}>Deletar Usuário</Button>
                </StyledForm>
            </FundoForm>
        </>
    );
};
