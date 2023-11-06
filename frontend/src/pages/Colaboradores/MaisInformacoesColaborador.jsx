import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { useAuth } from '../../hooks/useAuth';
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";

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
            <Title>Colaborador: {colaborador.nome}</Title>

            <form onSubmit={handleUpdateColaborador}>
            <input type="text" placeholder="nome" name="nome" onChange={handleChange} value={colaborador.nome}/> <br />
                <input type="date" name="nascimento" id="" onChange={handleChange} value={colaborador.nascimento}/> <br />
                <input type="text" placeholder="telefone" name="telefone" onChange={handleChange} value={colaborador.telefone}/><br />
                <input type="text" placeholder="CPF" name="cpf" onChange={handleChange}  value={colaborador.cpf}/> <br />
                <input type="email" placeholder="email" name="email" onChange={handleChange} value={colaborador.email}/> <br />
                <input type="text" id="" placeholder="cargo" name="cargo" onChange={handleChange} value={colaborador.cargo}/> <br />

                <Button>Editar Colaborador</Button>
            </form>

            <Button action={handleDeleteColaborador} color={'red'}>Deletar Colaborador</Button>
        </>
    );
};