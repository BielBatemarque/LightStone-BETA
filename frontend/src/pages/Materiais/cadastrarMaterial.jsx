import React, { useEffect, useState } from "react";
import { Material } from '../../models/Material';
import { useAuth } from "../../hooks/useAuth";
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { useNavigate } from "react-router-dom";
import { 
    PageContainer, 
    TitleContainer, 
    StyledForm, 
    FormGroup, 
    StyledInput, 
    StyledSelect, 
    StyledButton 
} from "./styles";

export const CadastrarMaterialPage = () => {
    const [material, setMaterial] = useState(new Material());
    const [fornecedores, setFornecedores] = useState([]);
    const { state } = useAuth();
    const navigate = useNavigate();

    // Carregar lista de fornecedores
    const handleLoadFornecedores = async () => {
        const request = await fetch('http://localhost:8000/fornecedores/');
        const response = await request.json();
        setFornecedores(response);
    };

    useEffect(() => {
        handleLoadFornecedores();
    }, []);

    // Atualizar fornecedor no estado
    const handleChange = (e) => {
        const { name, value } = e.target;
        let fornecedores = [];
        if (name === 'fornecedor') {
            fornecedores.push(parseInt(value));
            setMaterial({ ...material, [name]: fornecedores });
        } else {
            setMaterial({ ...material, [name]: value });
        }
    };

    // Cadastrar material
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

        if (request.ok) {
            SucssesNotifications('Cadastrado com Sucesso');
            navigate('/Materiais/');
        } else {
            FailNotifications('Erro ao cadastrar');
        }
    };

    return (
        <PageContainer>
            <TitleContainer>Cadastrar Material</TitleContainer>
            <StyledForm onSubmit={handleCadastrarMaterial}>
                <FormGroup>
                    <label>Nome do Material</label>
                    <StyledInput
                        type="text"
                        name="nome"
                        placeholder="Digite o nome do material"
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label>Cor Base</label>
                    <StyledInput
                        type="text"
                        name="cor_base"
                        placeholder="Digite a cor base"
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label>Fornecedor</label>
                    <StyledSelect name="fornecedor" onChange={handleChange}>
                        <option value="" disabled>Selecione um fornecedor</option>
                        {fornecedores.map((fornecedor, index) => (
                            <option value={fornecedor.id} key={index}>
                                {fornecedor.nome_empresa}
                            </option>
                        ))}
                    </StyledSelect>
                </FormGroup>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <StyledButton type="submit">Cadastrar</StyledButton>
                    <StyledButton color="red" type="button" onClick={() => navigate('/Materiais/')}>
                        Cancelar
                    </StyledButton>
                </div>
            </StyledForm>
        </PageContainer>
    );
};
