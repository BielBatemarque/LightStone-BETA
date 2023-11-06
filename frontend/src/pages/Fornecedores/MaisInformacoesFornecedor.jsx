import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from '../../components/Button';
import { useAuth } from "../../hooks/useAuth";
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
            <h1>Fornecedor: {fornecedor.nome_empresa}</h1>

            <form onSubmit={handleUpdateFornecedor}>
                <input type="text" placeholder="Nome da empresa" name="nome_empresa" onChange={handleChange} value={fornecedor.nome_empresa}/> <br />
                <input type="text" placeholder="CNPJ" name="cnpj" onChange={handleChange} value={fornecedor.cnpj}/><br />
                <input type="text" placeholder="Endereço" name="endereco" onChange={handleChange} value={fornecedor.endereco}/> <br />
                <Button>Editar Fornecedor</Button>
            </form>

            <Button color={'red'} action={handleDeleteFornecedor}>Deletar Fornecedor</Button>
        </>
    );
};