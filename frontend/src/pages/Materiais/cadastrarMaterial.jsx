import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Material } from '../../models/Material';
import { Title } from "../../components/Title";
import { useAuth } from "../../hooks/useAuth";
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { useNavigate } from "react-router-dom";
import { FlexDiv, FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { FloatLabel } from "../../components/FloatLabel";

export const CadastrarMaterialPage = () => {
    const [material, setMaterial] = useState(new Material());
    const [fornecedores, setFornecedores] = useState([]);
    const { state } = useAuth();
    const navigate = useNavigate();

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
            navigate('/Materiais/');
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
            <FundoTitle>
                <Title mt={0}>Cadastrar Material</Title>
            </FundoTitle>
            <FundoForm>

            <StyledForm>
                <FloatLabel type="text" text="Nome do material" name="nome" onChange={handleChange}/> <br />
                <FloatLabel type="text" text="Cor base" name="cor_base" onChange={handleChange}/> <br />
                <span>
                    <label>Fornecedor:  </label>
                <select name="fornecedor" id="" onChaSnge={handleChange}>
                    {fornecedores.map((fornecedor, index) => (
                        <option value={fornecedor.id} key={index}>{fornecedor.nome_empresa}</option>
                        ))}
                </select>
                </span>
                <FlexDiv>
                    <Button action={handleCadastrarMaterial}>Cadastrar</Button>
                    <Button color={'red'} action={() => navigate('/Materiais/')}>Cancelar</Button>
                </FlexDiv>
            </StyledForm>
            </FundoForm>
        </>
    );
};