import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { useAuth } from '../../hooks/useAuth';
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { FloatLabel } from "../../components/FloatLabel";

export const MaisInformacoesColaborador = () => {
    const [colaborador, setColaborador] = useState({});
    const { id } = useParams(':id');
    const { state } = useAuth();
    const navigate = useNavigate();

    const handleLoadColaborador = async () => {
        const request = await fetch(`http://localhost:8000/colaboradores/${id}`);
        const response = await request.json();

        setColaborador(response);
    };

    useEffect(() => {
        handleLoadColaborador();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setColaborador({...colaborador, [name]: value});
    };

    const handleUpdateColaborador = async (e) => {
        e.preventDefault();

        const request = await fetch(`http://localhost:8000/colaboradores/${id}/`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Token ${state.token}`
            },
            body:JSON.stringify(colaborador),
        });

        if (request.ok){
            SucssesNotifications('Colaborador editado com sucesso');
            navigate('/Colaboradores/');
        }else{
            FailNotifications('Não foi possivel editar Colaborador');
        }
    };

    const handleDeleteColaborador = async (e) => {
        const request = await fetch(`http://localhost:8000/colaboradores/${id}/`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Token ${state.token}`,
            },
        });

        if (request.ok){
            SucssesNotifications('Colaborador deltado com sucesso');
            navigate('/Colaboradores/');
        }else{
            FailNotifications('Não foi possivel deletar Colaborador');
        }
    };
    return(
        <>
            <FundoTitle>
                <Title mt={0}>Colaborador: {colaborador.nome}</Title>
            </FundoTitle>
            <FundoForm>

                <StyledForm onSubmit={handleUpdateColaborador}>
                    <FloatLabel type="text" text="nome" name="nome" onChange={handleChange} value={colaborador.nome}/> <br />
                    <FloatLabel type="date" name="nascimento" id="" onChange={handleChange} value={colaborador.nascimento}/> <br />
                    <FloatLabel type="text" text="telefone" name="telefone" onChange={handleChange} value={colaborador.telefone}/><br />
                    <FloatLabel type="text" text="CPF" name="cpf" onChange={handleChange}  value={colaborador.cpf}/> <br />
                    <FloatLabel type="email" text="email" name="email" onChange={handleChange} value={colaborador.email}/> <br />
                    <FloatLabel type="text" text="cargo" name="cargo" onChange={handleChange} value={colaborador.cargo}/> <br />

                    <Button>Editar Colaborador</Button>
                    <Button action={handleDeleteColaborador} color={'red'}>Deletar Colaborador</Button>
                </StyledForm>

            </FundoForm>
        </>
    );
};