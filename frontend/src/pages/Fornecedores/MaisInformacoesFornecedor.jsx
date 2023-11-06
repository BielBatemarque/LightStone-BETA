import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from '../../components/Button';

export const MaisInformacoesFornecedor = () => {
    const [fornecedor, setFornecedor] = useState({});
    const { id } = useParams(':id');

    const handleLoadFornecedor = async () => {
        const request = await fetch(`http://localhost:8000/fornecedores/${id}`);
        const response = await request.json();

        setFornecedor(response);
    };

    console.log(id)

    useEffect(() => {
        handleLoadFornecedor();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFornecedor({...fornecedor, [name]: value});
    };

    return(
        <>
            <h1>Fornecedor: {fornecedor.nome_empresa}</h1>

            <form>
                <input type="text" placeholder="Nome da empresa" name="nome_empresa" onChange={handleChange} value={fornecedor.nome_empresa}/> <br />
                <input type="text" placeholder="CNPJ" name="cnpj" onChange={handleChange} value={fornecedor.cnpj}/><br />
                <input type="text" placeholder="Endereço" name="endereco" onChange={handleChange} value={fornecedor.endereco}/> <br />
                <Button>Cadastrar Fornecedor</Button>
            </form>
        </>
    );
}