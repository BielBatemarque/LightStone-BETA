import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '../../components/Title/index';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { FailNotifications, SucssesNotifications } from '../../components/Notifications';
import { FlexDiv, FundoTitle, FundoForm, StyledForm, FlexRow } from '../Clientes/styles';
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
                <FloatLabel  type="text" value={cliente.nome} name="nome" onChange={handleChange} text="Nome" size={100} /> <br />
                    {/* type="text" name="nome" onChange={handleChange} placeholder="Nome" */}
                    <FloatLabel type="text" name="cpf" value={cliente.cpf} onChange={handleChange} text="CPF" size={100}/> <br />
                    <FlexRow>
                        <FloatLabel 
                            text="CEP"
                            name="cep" 
                            size={45} 
                            onChange={handleChange} 
                            value={cliente.cep} 
                        />
                        <FloatLabel text={"Bairro"} size={45} value={cliente.bairro} name="bairro" onChange={handleChange}/>
                    </FlexRow><br />

                    <FlexRow>
                        <FloatLabel text="Cidade" size={45} value={cliente.cidade} name={"cidade"} on onChange={handleChange}/>
                        <FloatLabel text="UF" size={45} value={cliente.uf} name="uf" onChange={handleChange}/>
                    </FlexRow><br />

                    <FlexRow>
                        <FloatLabel text={"logradouro"} size={45} value={cliente.logradouro} name="logradouro" onChange={handleChange}/> 
                        <FloatLabel text="Número" value={cliente.numero} size={45} name='numero' onChange={handleChange}/>
                    </FlexRow> <br />
                    {/* <FloatLabel name="" onChange={handleChange} text="Endereço" /><br /> */}
                    <FloatLabel type="email" name="email" value={cliente.email} onChange={handleChange} text="email" size={100}/><br />
                    <FloatLabel type="date" name="data_nascimento" value={cliente.data_nascimento} onChange={handleChange} text="Nascimento" size={100}/><br />

                    <Button>Salvar</Button>
                </StyledForm>
            <FlexDiv>
                <Button color={'red'} action={handleDeleteCliente}>Deletar Cliente</Button> 
            </FlexDiv>
            </FundoForm>
        </>
    );
};