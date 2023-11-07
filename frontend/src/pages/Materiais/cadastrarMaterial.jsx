import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Material } from '../../models/Material';
import { Title } from "../../components/Title";
import { useAuth } from "../../hooks/useAuth";
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";

export const CadastrarMaterialPage = () => {
    const [material, setMaterial] = useState(new Material());
    const [fornecedores, setFornecedores] = useState([]);
    const { state } = useAuth();

    const handleLoadFornecedores = async () => {
        const request = await fetch('http://localhost:8000/fornecedores/');
        const response = await request.json();

        setFornecedores(response);
    };

    useEffect(() => {
        handleLoadFornecedores();
    }, []);

    useEffect(() => {
       setMaterial({...material, fornecedor: parseInt(material.fornecedor)});
    }, []);


    const handleCadastrarMaterial = async (e) => {
        e.preventDefault();
        
        const request = await fetch('http://localhost:8000/materiais/', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Token ${state.token}`,
            },
            body: JSON.stringify(material),
        });
        const response = await request.json();
        console.log(response);

        if(request.ok){
            SucssesNotifications('Cadastrado com Sucesso');
        }else{
            FailNotifications('Erro ao cadastrar');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === 'fornecedor'){
            const selectedFornecedorId = parseInt(value);
            setMaterial({...material, [name]: [selectedFornecedorId]});
        }else{   
            setMaterial({...material, [name]: value});
        }
    };

    console.log(material.fornecedor);
    
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
};