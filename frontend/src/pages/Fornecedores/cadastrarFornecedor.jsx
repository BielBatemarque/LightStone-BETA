import { Title } from "../../components/Title";
import { Button } from '../../components/Button';
import { useState } from "react";
import { Fornecedor } from '../../models/Fornecedor';
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { 
    FundoTitle, 
    FundoForm, 
    StyledForm, 
    FlexDiv, 
    FlexRow, 
    StyledInput, 
    StyledButton 
} from "./styles";
import { FloatLabel } from "../../components/FloatLabel";

export const CadastrarFornecedor = () => {
    const [fornecedor, setFornecedor] = useState(new Fornecedor());
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState({});
    const { state } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFornecedor({ ...fornecedor, [name]: value });
    };

    const handleCadastrarFornecedor = async (e) => {
        e.preventDefault();
        try {
            const request = await fetch('http://localhost:8000/fornecedores/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${state.token}`,
                },
                body: JSON.stringify(fornecedor),
            });

            if (request.ok) {
                SucssesNotifications('Fornecedor Cadastrado com Sucesso');
                navigate('/Fornecedores/');
            } else {
                FailNotifications('Não foi possível cadastrar Fornecedor');
            }
        } catch (error) {
            console.error("Erro ao cadastrar fornecedor:", error);
        }
    };

    const formataCep = (cep) => cep.replace(/\D/g, '');

    const consultaCep = async (cep) => {
        try {
            const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const response = await request.json();

            setEndereco(response);
            setFornecedor({
                ...fornecedor,
                cep: cep,
                cidade: response.localidade,
                uf: response.uf,
                logradouro: response.logradouro,
                bairro: response.bairro,
            });
        } catch (error) {
            console.error("Erro ao consultar CEP:", error);
        }
    };

    return (
        <>
            <FundoTitle>
                <Title mt={0}>Cadastrar Fornecedor</Title>
            </FundoTitle>
            <FundoForm>
                <StyledForm onSubmit={handleCadastrarFornecedor}>
                    <FloatLabel
                        type="text"
                        text="Nome da empresa"
                        name="nome_empresa"
                        onChange={handleChange}
                        size={100}
                    />
                    <FloatLabel
                        type="text"
                        text="CNPJ"
                        name="cnpj"
                        onChange={handleChange}
                        size={100}
                    />
                    <br />
                    <FlexRow>
                        <FloatLabel
                            size={45}
                            text="CEP"
                            onChange={(e) => setCep(formataCep(e.target.value))}
                            onBlur={() => consultaCep(cep)}
                        />
                        <FloatLabel
                            text="Bairro"
                            size={45}
                            value={endereco.bairro || ''}
                            name="bairro"
                            onChange={handleChange}
                        />
                    </FlexRow>
                    <br />
                    <FlexRow>
                        <FloatLabel
                            text="Cidade"
                            size={45}
                            value={endereco.localidade || ''}
                            name="cidade"
                            onChange={handleChange}
                        />
                        <FloatLabel
                            text="UF"
                            size={45}
                            value={endereco.uf || ''}
                            name="uf"
                            onChange={handleChange}
                        />
                    </FlexRow>
                    <br />
                    <FlexRow>
                        <FloatLabel
                            text="Logradouro"
                            size={45}
                            value={endereco.logradouro || ''}
                            name="logradouro"
                            onChange={handleChange}
                        />
                        <FloatLabel
                            size={45}
                            text="Número"
                            name="numero"
                            onChange={handleChange}
                        />
                    </FlexRow>
                    <br />
                    <FlexDiv>
                        <Button type="submit">Cadastrar</Button>
                        <Button color="red" action={() => navigate('/Fornecedores/')}>Cancelar</Button>
                    </FlexDiv>
                </StyledForm>
            </FundoForm>
        </>
    );
};
