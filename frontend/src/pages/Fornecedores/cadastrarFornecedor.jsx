import { Title } from "../../components/Title";
import { Button } from '../../components/Button';
import { useState } from "react";
import { Fornecedor } from '../../models/Fornecedor';
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { FlexDiv, FlexRow, FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { FloatLabel } from "../../components/FloatLabel";

export const CadastrarFornecedor = () => {
    const [fornecedor, setFornecedor] = useState(new Fornecedor());
    const { state } = useAuth();
    const navigate = useNavigate();
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState({});

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

    const formataCep = (cep) => {
        let cepFormatado = cep.replace(/\D/g, '');
        
        return cepFormatado;
    };

    const consultaCep = async (cep) => {
        try{
            const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const response = await request.json();

            setEndereco(response);

            setFornecedor({
                ...fornecedor,
                cep: cep,
                cidade: response.localidade,
                uf: response.uf,
                logradouro: response.logradouro,
                bairro: response.bairro
            });
        }catch(e){
            console.log(e)
        }
    };

    console.log(fornecedor, state);
    return(
        <>
            <FundoTitle>
                <Title mt={0}>Cadastrar Fornecedor</Title>
            </FundoTitle>
            <FundoForm>
                <StyledForm onSubmit={handleCadastrarFornecedor}>
                    <FloatLabel type="text" text="Nome da empresa" name="nome_empresa" onChange={handleChange} size={100}/> <br />
                    <FloatLabel type="text" text="CNPJ" name="cnpj" onChange={handleChange} size={100}/><br />
                    {/* <FloatLabel type="text" text="Endereço" name="endereco" onChange={handleChange}/> <br /> */}
                    {/* Colocar aqui os inputs de endereço modelo clientes */}
                    <FlexRow>
                        <FloatLabel  size={45} text="CEP" onChange={(e) => setCep(formataCep(e.target.value))} onBlur={() => consultaCep(cep)} />
                        <FloatLabel text={"Bairro"} size={45} value={endereco.bairro} name="bairro" onChange={handleChange}/>
                    </FlexRow> <br />
                    <FlexRow>
                        <FloatLabel text="Cidade" size={45} value={endereco.localidade} name={"cidade"} on onChange={handleChange}/>
                        <FloatLabel text="UF" size={45} value={endereco.uf} name="uf" onChange={handleChange}/>
                    </FlexRow><br />

                    <FlexRow>
                        <FloatLabel text={"logradouro"} size={45} value={endereco.logradouro} name="logradouro" onChange={handleChange}/> 
                        <FloatLabel  size={45} text="Número" onChange={handleChange}/>
                    </FlexRow> <br />
                    
                    <FlexDiv>
                        <Button>Cadastrar</Button>
                        <Button color={'red'} action={() => navigate('/Fornecedores/')}>Cancelar</Button>
                    </FlexDiv>
                </StyledForm>
            </FundoForm>
        </>
    );
}