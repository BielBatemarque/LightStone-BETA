import { useEffect, useState } from 'react';
import { Title } from '../../components/Title/index';
import { Button } from '../../components/Button/index';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FailNotifications, SucssesNotifications } from '../../components/Notifications/index';

export const MaisInformacoesMaterial = () => {
    const [material, setMaterial] = useState({});
    const [fornecedores, setFornecedroes] = useState([]);
    const { id } = useParams(':id');
    const { state } = useAuth();
    const navigate = useNavigate();

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

    const handleUpdateMaterial = async (e) => {
        e.preventDefault();

        const request = await fetch(`http://localhost:8000/materiais/${id}/`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
            body: JSON.stringify(material),
        });

        if (request.ok){
            SucssesNotifications('Sucesso ao editar Material');
            navigate('/Materiais/');
        }else{
            FailNotifications('Não foi possivel editar material');
        }
    };

    const handleDeleteMaterial = async () => {
        const request = await fetch(`http://localhost:8000/materiais/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
        });

        if (request.ok) {
            SucssesNotifications('Sucesso ao deletar Material');
            navigate('/Materiais/');
        }else{
            FailNotifications('Não foi possivel deletar material');
        }
    };

    return(
        <>
            <Title>Material: {material.nome}</Title>

            <form onSubmit={handleUpdateMaterial}>
                <input type="text" placeholder="Nome do material" name="nome" onChange={handleChange} value={material.nome}/> <br />
                <input type="text" placeholder="Cor base" name="cor_base" onChange={handleChange} value={material.cor_base}/> <br />
                <select name="fornecedor" id="" onChange={handleChange} value={material.fornecedor}>
                    {fornecedores.map((fornecedor, index) => (
                        <option value={fornecedor.id} key={index}>{fornecedor.nome_empresa}</option>
                    ))}
                </select><br />
                <Button>Editar Material</Button>
            </form>
            <Button color={'red'} action={handleDeleteMaterial}>Deletar Material</Button>
        </>
    );
};