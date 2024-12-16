import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    PageContainer,
    TitleContainer,
    StyledForm,
    StyledInput,
    StyledSelect,
    StyledButton,
    FormGroup,
} from './styles';
import { SucssesNotifications, FailNotifications } from '../../components/Notifications/index';

export const MaisInformacoesMaterial = () => {
    const [material, setMaterial] = useState({});
    const [fornecedores, setFornecedores] = useState([]);
    const { id } = useParams();
    const { state } = useAuth();
    const navigate = useNavigate();

    // Carregar lista de fornecedores
    const handleLoadFornecedores = async () => {
        const response = await fetch('http://localhost:8000/fornecedores/');
        const data = await response.json();
        setFornecedores(data);
    };

    // Carregar informações do material
    const handleLoadMaterial = async () => {
        const response = await fetch(`http://localhost:8000/materiais/${id}/`);
        const data = await response.json();
        setMaterial(data);
    };

    useEffect(() => {
        handleLoadFornecedores();
        handleLoadMaterial();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaterial((prevMaterial) => ({
            ...prevMaterial,
            [name]: name === 'fornecedor' ? parseInt(value) || '' : value,
        }));
    };

    const handleUpdateMaterial = async (e) => {
        e.preventDefault();
    
        // Filtrar e ajustar os campos para o formato esperado pela API
        const filteredMaterial = {
            nome: material.nome,
            cor_base: material.cor_base,
            fornecedor: [material.fornecedor], // Enviar como uma lista
        };
    
        console.log('Dados enviados:', filteredMaterial); // Para depuração
    
        const request = await fetch(`http://localhost:8000/materiais/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${state.token}`,
            },
            body: JSON.stringify(filteredMaterial),
        });
    
        if (request.ok) {
            SucssesNotifications('Material editado com sucesso!');
            navigate('/Materiais/');
        } else {
            const responseData = await request.json();
            console.error('Erro do backend:', responseData);
            FailNotifications(responseData.detail || 'Erro ao editar material.');
        }
    };
    
    
    const handleDeleteMaterial = async () => {
        const request = await fetch(`http://localhost:8000/materiais/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${state.token}`,
            },
        });

        if (request.ok) {
            SucssesNotifications('Material deletado com sucesso!');
            navigate('/Materiais/');
        } else {
            FailNotifications('Erro ao deletar material.');
        }
    };

    return (
        <PageContainer>
            <TitleContainer>Editar Material</TitleContainer>
            <StyledForm onSubmit={handleUpdateMaterial}>
                <FormGroup>
                    <label>Nome do Material</label>
                    <StyledInput
                        type="text"
                        name="nome"
                        value={material.nome || ''}
                        onChange={handleChange}
                        placeholder="Digite o nome do material"
                    />
                </FormGroup>
                <FormGroup>
                    <label>Cor Base</label>
                    <StyledInput
                        type="text"
                        name="cor_base"
                        value={material.cor_base || ''}
                        onChange={handleChange}
                        placeholder="Digite a cor base"
                    />
                </FormGroup>
                <FormGroup>
                    <label>Fornecedor</label>
                    <StyledSelect
                        name="fornecedor"
                        value={material.fornecedor || ''}
                        onChange={handleChange}
                    >
                        <option value="">Selecione um fornecedor</option>
                        {fornecedores.map((fornecedor) => (
                            <option key={fornecedor.id} value={fornecedor.id}>
                                {fornecedor.nome_empresa}
                            </option>
                        ))}
                    </StyledSelect>
                </FormGroup>
                <StyledButton type="submit">Salvar Alterações</StyledButton>
                <StyledButton type="button" color="red" onClick={handleDeleteMaterial}>
                    Deletar Material
                </StyledButton>
            </StyledForm>
        </PageContainer>
    );
};
