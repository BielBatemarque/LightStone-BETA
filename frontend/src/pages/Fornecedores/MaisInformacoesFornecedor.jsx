import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from '../../components/Button';
import { useAuth } from "../../hooks/useAuth";
import { FundoForm, FundoTitle, StyledForm } from '../Clientes/styles';
import { FloatLabel } from '../../components/FloatLabel';
import { Title } from '../../components/Title/index';
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";

export const MaisInformacoesFornecedor = () => {
    const [fornecedor, setFornecedor] = useState({});
    const { id } = useParams(':id');
    const navigate = useNavigate();
    const { state } = useAuth();

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

    const handleUpdateFornecedor = async (e) => {
        e.preventDefault();
        
        const request = await fetch(`http://localhost:8000/fornecedores/${id}/`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Token ${state.token}`,
            },
            body: JSON.stringify(fornecedor),
        });

        if (request.ok){
            SucssesNotifications('Fornecedor Editado com Sucesso');
            navigate('/Fornecedores/');
        }else{
            FailNotifications('Não foi possivel editar Fornecedor');
        }

    };

    const handleDeleteFornecedor = async () => {
        const request = await fetch(`http://localhost:8000/fornecedores/${id}/`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Token ${state.token}`,
            },
        });
        if (request.ok){
            SucssesNotifications('Fornecedor Deletado com Sucesso');
            navigate('/Fornecedores/');
        }else{
            FailNotifications('Não foi possivel deletar Fornecedor');
        }

    };

    return(
        <>
            <FundoTitle>
                <Title mt={0}>Fornecedor: {fornecedor.nome_empresa}</Title>
            </FundoTitle>

            <FundoForm>

                <StyledForm onSubmit={handleUpdateFornecedor}>
                    <FloatLabel type="text" text="Nome da empresa" name="nome_empresa" onChange={handleChange} value={fornecedor.nome_empresa}/> <br />
                    <FloatLabel type="text" text="CNPJ" name="cnpj" onChange={handleChange} value={fornecedor.cnpj}/><br />
                    <FloatLabel type="text" text="Endereço" name="endereco" onChange={handleChange} value={fornecedor.endereco}/> <br />
                    <Button>Editar Fornecedor</Button>
                    <Button color={'red'} action={handleDeleteFornecedor}>Deletar Fornecedor</Button>
                </StyledForm>
            </FundoForm>
        </>
    );
};