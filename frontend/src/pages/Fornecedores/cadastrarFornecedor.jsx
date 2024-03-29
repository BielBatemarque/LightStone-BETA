import { Title } from "../../components/Title";
import { Button } from '../../components/Button';
import { useState } from "react";
import { Fornecedor } from '../../models/Fornecedor';
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { FlexDiv, FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { FloatLabel } from "../../components/FloatLabel";

export const CadastrarFornecedor = () => {
    const [fornecedor, setFornecedor] = useState(new Fornecedor());
    const { state } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFornecedor({...fornecedor, [name]:value});
    }

    const handleCadastrarFornecedor = async (e) => {
        e.preventDefault();

        const request = await fetch('http://localhost:8000/fornecedores/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
            body: JSON.stringify(fornecedor),
        });

        const response = await request.json();

        if (request.ok){
            SucssesNotifications('Fornecedor Cadastrado com Sucesso');
            navigate('/Fornecedores/');
        }else if(!request.ok){
            FailNotifications('Não foi possivel cadastrar Fornecedor');
        }

        console.log(request.status, response);
    };

    console.log(fornecedor, state);
    return(
        <>
            <FundoTitle>
                <Title mt={0}>Cadastrar Fornecedor</Title>
            </FundoTitle>
            <FundoForm>
                <StyledForm onSubmit={handleCadastrarFornecedor}>
                    <FloatLabel type="text" text="Nome da empresa" name="nome_empresa" onChange={handleChange}/> <br />
                    <FloatLabel type="text" text="CNPJ" name="cnpj" onChange={handleChange}/><br />
                    {/* <FloatLabel type="text" text="Endereço" name="endereco" onChange={handleChange}/> <br /> */}
                    {/* Colocar aqui os inputs de endereço modelo clientes */}

                    
                    <FlexDiv>
                        <Button>Cadastrar</Button>
                        <Button color={'red'} action={() => navigate('/Fornecedores/')}>Cancelar</Button>
                    </FlexDiv>
                </StyledForm>
            </FundoForm>
        </>
    );
}