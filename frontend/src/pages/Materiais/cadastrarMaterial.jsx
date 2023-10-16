import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Material } from '../../models/Material';
import { Title } from "../../components/Title";

export const CadastrarMaterialPage = () => {
    const [material, setMaterial] = useState(new Material());
    const [fornecedores, setFornecedores] = useState([]);

    const handleLoadFornecedores = async () => {
        const request = await fetch('http://localhost:8000/fornecedores/');
        const response = await request.json();

        setFornecedores(response);
    };

    useEffect(() => {
        handleLoadFornecedores();
    }, []);


    const handleCadastrarMaterial = async (e) => {
        e.preventDefault();
        window.alert('Cadastrar Material');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaterial({...material, [name]: value});
    };

    console.log(material);
    
    return(
        <>
            <Title>Cadastrar Material</Title>
            <form action="">
                <input type="text" placeholder="Nome do material" name="nome" onChange={handleChange}/> <br />
                <input type="text" placeholder="Cor base" name="cor_base" onChange={handleChange}/> <br />
                <select name="fornecedor" id="" onChange={handleChange}>
                    {fornecedores.map((fornecedor, index) => (
                        <option value={fornecedor.id} key={index}>{fornecedor.nome_empresa}</option>
                    ))}
                </select>
                <Button action={handleCadastrarMaterial}>Cadastrar Material</Button>
            </form>
        </>
    );
}