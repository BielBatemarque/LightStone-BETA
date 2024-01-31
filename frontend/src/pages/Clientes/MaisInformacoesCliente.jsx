import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '../../components/Title/index';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { FailNotifications, SucssesNotifications } from '../../components/Notifications';
import { FlexDiv, FundoTitle, FundoForm, StyledForm } from '../Clientes/styles';
import { FloatLabel } from '../../components/FloatLabel';

export const MaisInformacoesCliente = () => {
    const { id } = useParams(':id');
    const [cliente, setCliente] = useState({});
    const { state }  = useAuth();
    const navigate = useNavigate();

    const handleLoadCliente = async () => {
        const request = await fetch(`http://localhost:8000/clientes/${id}`);
        const response = await request.json();

        setCliente(response);
    };

    useEffect(() => {
        handleLoadCliente();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({...cliente, [name]:value})
    };

    const handleUpdateCliente = async (e) => {
        e.preventDefault();

        const request = await fetch(`http://localhost:8000/clientes/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
            body: JSON.stringify(cliente),
        });

        if (request.ok){
            SucssesNotifications('Cliente editado com sucesso');
            navigate('/Clientes/');
        }else{
            FailNotifications('Erro ao editar cliente');
        }
    };

    const handleDeleteCliente = async (e) => {
        e.preventDefault();

        const request = await fetch(`http://localhost:8000/clientes/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
        });

        if(request.ok){
            SucssesNotifications('Cliente excluido com sucesso');
            navigate('/Clientes/');
        }else{
            FailNotifications('Erro ao excluir cliente');
        }
        
    };

    return(
        <>
            <FundoTitle>
                <Title mt={0}>Cliente: {cliente.nome}</Title>
            </FundoTitle>
            <FundoForm>
                <StyledForm onSubmit={handleUpdateCliente}>
                    <FloatLabel type="text" name='nome' onChange={handleChange} value={cliente.nome} text='Nome'/><br />
                    <FloatLabel type="text" name='cpf' onChange={handleChange} value={cliente.cpf} text='CPF'/><br />
                    <FloatLabel type="text" name='endereco' onChange={handleChange} value={cliente.endereco} text='Endereço'/> <br />
                    <FloatLabel type="text" name="data_nascimento" onChange={handleChange} value={cliente.data_nascimento} text='Nascimento' /><br />
                    <FloatLabel type="email" name='email' onChange={handleChange} value={cliente.email} text='Email'/> <br />
                    <Button>Salvar</Button>
                </StyledForm>
            <FlexDiv>
                <Button color={'red'} action={handleDeleteCliente}>Deletar Cliente</Button> 
            </FlexDiv>
            </FundoForm>
        </>
    );
};