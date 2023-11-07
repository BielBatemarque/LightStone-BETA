import { useState } from 'react';
import { Title } from '../../components/Title/index';
import { Button } from '../../components/Button/index';

export const MaisInformacoesMaterial = () => {
    const [material, setMaterial] = useState({});
    const [fornecedores, setFornecedroes] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === 'fornecedor'){
            const selectedFornecedorId = parseInt(value);
            setMaterial({...material, [name]: [selectedFornecedorId]});
        }else{   
            setMaterial({...material, [name]: value});
        }
    };
    return(
        <>
            <Title>Material: {}</Title>

            <form action="">
                <input type="text" placeholder="Nome do material" name="nome" onChange={handleChange}/> <br />
                <input type="text" placeholder="Cor base" name="cor_base" onChange={handleChange}/> <br />
                <select name="fornecedor" id="" onChange={handleChange}>
                    {fornecedores.map((fornecedor, index) => (
                        <option value={fornecedor.id} key={index}>{fornecedor.nome_empresa}</option>
                    ))}
                </select>
                <Button>Cadastrar Material</Button>
            </form>
        </>
    );
};