import { useParams } from 'react-router-dom';
import { Title } from '../../components/Title/index';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../../components/Button';

export const MaisInformacoesCliente = () => {
    const { id } = useParams(':id');
    const [cliente, setCliente] = useState({});    

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
        window.alert('Alterar Cliente')
    };

    return(
        <>
            <Title>Cliente: {cliente.nome}</Title>

            <form onSubmit={handleUpdateCliente}>
                <input type="text" name='nome' onChange={handleChange} value={cliente.nome} placeholder='Nome'/><br />
                <input type="text" name='cpf' onChange={handleChange} value={cliente.cpf} placeholder='CPF'/><br />
                <input type="text" name='endereco' onChange={handleChange} value={cliente.endereco} placeholder='Endereço'/> <br />
                <input type="text" name="data_nascimento" onChange={handleChange} value={cliente.data_nascimento} placeholder='Nascimento' /><br />
                <input type="email" name='email' onChange={handleChange} value={cliente.email} placeholder='Email'/> <br />
                <Button>Salvar</Button>
            </form>
            
        </>
    );
};