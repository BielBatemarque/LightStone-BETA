import { useState } from "react";
import { Button } from "../../components/Button";
import { Material } from '../../models/Material';
import { Title } from "../../components/Title";

export const CadastrarMaterialPage = () => {
    const [material, setMaterial] = useState(new Material());
    const [fornecedores, setFornecedores] = useState([]);

    // const handleLoadFornecedores = async () => {
    //     const request = await fetch('')
    // };


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
                <select name="" id="" onChange={handleChange}>
                    <option value="">Fornecedor</option>
                </select>
                <Button action={handleCadastrarMaterial}>Cadastrar Material</Button>
            </form>
        </>
    );
}