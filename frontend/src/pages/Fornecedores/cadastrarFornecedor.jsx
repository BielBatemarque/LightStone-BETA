import { Title } from "../../components/Title";
import { Button } from '../../components/Button';
import { useState } from "react";
import { Fornecedor } from '../../models/Fornecedor';
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";

export const CadastrarFornecedor = () => {
    const [fornecedor, setFornecedor] = useState(new Fornecedor());
    const { state } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFornecedor({...fornecedor, [name]:value});
    }

    const handleCadastrarFornecedor = async (e) => {
        e.preventDefault();

        const request = await fetch('http://localhost:8000/fornecedores/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
            body: JSON.stringify(fornecedor),
        });

        const response = await request.json();

        if (request.ok){
            SucssesNotifications('Fornecedor Cadastrado com Sucesso');
            navigate('/Fornecedores/');
        }else if(!request.ok){
            FailNotifications('Não foi possivel cadastrar Fornecedor');
        }

        console.log(request.status, response);
    };

    console.log(fornecedor, state);
    return(
        <>
           <Title>Cadastrar Fornecedor</Title>
           <form onSubmit={handleCadastrarFornecedor}>
            <input type="text" placeholder="Nome da empresa" name="nome_empresa" onChange={handleChange}/> <br />
            <input type="text" placeholder="CNPJ" name="cnpj" onChange={handleChange}/><br />
            <input type="text" placeholder="Endereço" name="endereco" onChange={handleChange}/> <br />
            <Button>Cadastrar Fornecedor</Button>
           </form>
        </>
    );
}