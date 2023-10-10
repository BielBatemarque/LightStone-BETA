import { Title } from "../../components/Title";
import { Button } from '../../components/Button';
import { useState } from "react";
import { Fornecedor } from '../../models/Fornecedor';

export const CadastrarFornecedor = () => {
    const [fornecedor, setFornecedor] = useState(new Fornecedor());

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFornecedor({...fornecedor, [name]:value});

    }

    const handleCadastrarFornecedor = async (e) => {
        e.preventDefault();
        window.alert('cadastrar Fornecedor')
    };

    console.log(fornecedor);
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