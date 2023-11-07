import { useEffect, useState } from 'react';
import { Title } from '../../components/Title/index';
import { Button } from '../../components/Button/index';
import { useParams } from 'react-router-dom';

export const MaisInformacoesMaterial = () => {
    const [material, setMaterial] = useState({});
    const [fornecedores, setFornecedroes] = useState([]);
    const { id } = useParams(':id');

    const handleLoadForncedores = async () => {
        const request = await fetch('http://localhost:8000/fornecedores/');
        const response = await request.json();

        setFornecedroes(response);
    };

    useEffect(() => {
        handleLoadForncedores();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === 'fornecedor'){
            const selectedFornecedorId = parseInt(value);
            setMaterial({...material, [name]: [selectedFornecedorId]});
        }else{   
            setMaterial({...material, [name]: value});
        }
    };

    const handleLoadMaterial = async () => {
        const request = await fetch(`http://localhost:8000/materiais/${id}/`);
        const response = await request.json();

        setMaterial(response);
    };

    useEffect(() => {
        handleLoadMaterial();
    }, []);

    return(
        <>
            <Title>Material: {material.nome}</Title>

            <form action="">
                <input type="text" placeholder="Nome do material" name="nome" onChange={handleChange} value={material.nome}/> <br />
                <input type="text" placeholder="Cor base" name="cor_base" onChange={handleChange} value={material.cor_base}/> <br />
                <select name="fornecedor" id="" onChange={handleChange} value={material.fornecedor}>
                    {fornecedores.map((fornecedor, index) => (
                        <option value={fornecedor.id} key={index}>{fornecedor.nome_empresa}</option>
                    ))}
                </select><br />
                <Button>Cadastrar Material</Button>
            </form>
        </>
    );
};