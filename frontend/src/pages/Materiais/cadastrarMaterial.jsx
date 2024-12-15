import React, { useEffect, useState } from "react";
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
    const [material, setMaterial] = useState({ nome: "", cor_base: "", fornecedor: [] });
    const [fornecedores, setFornecedores] = useState([]);
    const [isSaving, setIsSaving] = useState(false); // Estado para desabilitar botão enquanto salva
    const { state } = useAuth();
    const navigate = useNavigate();

    // Carregar lista de fornecedores
    const handleLoadFornecedores = async () => {
        try {
            const request = await fetch('http://localhost:8000/fornecedores/');
            const response = await request.json();
            setFornecedores(response);
        } catch (error) {
            FailNotifications("Erro ao carregar fornecedores");
        }
    };

    useEffect(() => {
        handleLoadFornecedores();
    }, []);

    // Atualizar fornecedor no estado
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'fornecedor') {
            setMaterial({ ...material, fornecedor: [parseInt(value)] });
        } else {
            setMaterial({ ...material, [name]: value });
        }
    };

    // Cadastrar material
    const handleCadastrarMaterial = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        if (!material.nome || !material.cor_base || material.fornecedor.length === 0) {
            FailNotifications("Preencha todos os campos obrigatórios");
            setIsSaving(false);
            return;
        }

        try {
            const request = await fetch('http://localhost:8000/materiais/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${state.token}`,
                },
                body: JSON.stringify(material),
            });

            if (request.ok) {
                SucssesNotifications('Cadastrado com sucesso');
                navigate('/Materiais/');
            } else {
                FailNotifications('Erro ao cadastrar material');
            }
        } catch (error) {
            FailNotifications("Erro na conexão com o servidor");
        } finally {
            setIsSaving(false);
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
                        value={material.nome}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label>Cor Base</label>
                    <StyledInput
                        type="text"
                        name="cor_base"
                        placeholder="Digite a cor base"
                        value={material.cor_base}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label>Fornecedor</label>
                    <StyledSelect
                        name="fornecedor"
                        value={material.fornecedor[0] || ""}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Selecione um fornecedor</option>
                        {fornecedores.map((fornecedor) => (
                            <option value={fornecedor.id} key={fornecedor.id}>
                                {fornecedor.nome_empresa}
                            </option>
                        ))}
                    </StyledSelect>
                </FormGroup>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <StyledButton type="submit" disabled={isSaving}>
                        {isSaving ? "Salvando..." : "Cadastrar"}
                    </StyledButton>
                    <StyledButton
                        color="red"
                        type="button"
                        onClick={() => navigate('/Materiais/')}
                        disabled={isSaving}
                    >
                        Cancelar
                    </StyledButton>
                </div>
            </StyledForm>
        </PageContainer>
    );
};
