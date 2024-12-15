import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from '../../components/Button';
import { useAuth } from "../../hooks/useAuth";
import { 
    FundoTitle, 
    FundoForm, 
    StyledForm, 
    FlexRow, 
    StyledInput 
} from "./styles";
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

    useEffect(() => {
        handleLoadFornecedor();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFornecedor({ ...fornecedor, [name]: value });
    };

    const handleUpdateFornecedor = async (e) => {
        e.preventDefault();
        
        const request = await fetch(`http://localhost:8000/fornecedores/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
            body: JSON.stringify(fornecedor),
        });

        if (request.ok) {
            SucssesNotifications('Fornecedor Editado com Sucesso');
            navigate('/Fornecedores/');
        } else {
            FailNotifications('Não foi possível editar Fornecedor');
        }
    };

    const handleDeleteFornecedor = async () => {
        const request = await fetch(`http://localhost:8000/fornecedores/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
        });

        if (request.ok) {
            SucssesNotifications('Fornecedor Deletado com Sucesso');
            navigate('/Fornecedores/');
        } else {
            FailNotifications('Não foi possível deletar Fornecedor');
        }
    };

    return (
        <>
            <FundoTitle>
                <Title mt={0}>Fornecedor: {fornecedor.nome_empresa}</Title>
            </FundoTitle>

            <FundoForm>
                <StyledForm onSubmit={handleUpdateFornecedor}>
                    <FloatLabel 
                        type="text" 
                        text="Nome da empresa" 
                        size={100} 
                        name="nome_empresa" 
                        onChange={handleChange} 
                        value={fornecedor.nome_empresa} 
                    />
                    <FloatLabel 
                        type="text" 
                        text="CNPJ" 
                        name="cnpj" 
                        size={100} 
                        onChange={handleChange} 
                        value={fornecedor.cnpj} 
                    />
                    <FlexRow>
                        <FloatLabel 
                            size={45} 
                            text="CEP" 
                            onChange={handleChange} 
                            value={fornecedor.cep} 
                        />
                        <FloatLabel 
                            text="Bairro" 
                            size={45} 
                            value={fornecedor.bairro} 
                            name="bairro" 
                            onChange={handleChange} 
                        />
                    </FlexRow>
                    <FlexRow>
                        <FloatLabel 
                            text="Cidade" 
                            size={45} 
                            value={fornecedor.localidade} 
                            name="cidade" 
                            onChange={handleChange} 
                        />
                        <FloatLabel 
                            text="UF" 
                            size={45} 
                            value={fornecedor.uf} 
                            name="uf" 
                            onChange={handleChange} 
                        />
                    </FlexRow>
                    <FlexRow>
                        <FloatLabel 
                            text="Logradouro" 
                            size={45} 
                            value={fornecedor.logradouro} 
                            name="logradouro" 
                            onChange={handleChange} 
                        />
                        <FloatLabel 
                            size={45} 
                            text="Número" 
                            onChange={handleChange} 
                            value={fornecedor.numero} 
                        />
                    </FlexRow>
                    <FlexRow style={{ marginTop: '20px' }}>
                        <Button>Editar Fornecedor</Button>
                        <Button 
                            color="red" 
                            action={handleDeleteFornecedor}
                        >
                            Deletar Fornecedor
                        </Button>
                    </FlexRow>
                </StyledForm>
            </FundoForm>
        </>
    );
};
