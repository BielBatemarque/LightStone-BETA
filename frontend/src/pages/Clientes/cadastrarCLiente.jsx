import { useContext, useState } from "react";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { Cliente } from "../../models/Cliente";
import { globalContext } from "../../context/context";
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { useNavigate } from "react-router-dom";
import { FlexRow, FundoForm, FundoTitle, StyledForm } from "./styles";
import { FlexDiv } from './styles'; 
import { FloatLabel } from '../../components/FloatLabel/index';


export const CadastrarCLientePage = () => {
    const [cliente, setCliente] = useState(new Cliente());
    const { state } = useContext(globalContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCliente({...cliente, [name]: value});
    };

    const handleCadastraCliente = async (e) => {
        e.preventDefault();

        const request = await fetch('http://localhost:8000/clientes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
            body:JSON.stringify(cliente),
        });
        const response = await request.json();

        if (request.ok) {
            SucssesNotifications('Cadastrado com Sucesso');
            navigate('/Clientes/');

        }else{
            FailNotifications('Erro ao cadastrar');
        }

    };

    return(
        <>
            <FundoTitle>
                <Title mt={0}>Cadastrar Cliente</Title>
            </FundoTitle>
            <FundoForm>
                <StyledForm>
                    <FloatLabel  type="text" name="nome" onChange={handleChange} text="Nome" size={100} /> <br />
                    {/* type="text" name="nome" onChange={handleChange} placeholder="Nome" */}
                    <FloatLabel type="text" name="cpf" onChange={handleChange} text="CPF" size={100}/> <br />
                    <FlexRow>
                        <FloatLabel text="CEP" size={45}/>
                        <FloatLabel text="Número" size={45}/>
                    </FlexRow><br />

                    <FlexRow>
                        <FloatLabel text="Cidade" size={45}/>
                        <FloatLabel text="UF" size={45}/>
                    </FlexRow><br />

                    <FloatLabel text={"logradouro"} size={100}/> <br />
                    {/* <FloatLabel name="endereco" onChange={handleChange} text="Endereço" /><br /> */}
                    <FloatLabel type="email" name="email" onChange={handleChange} text="email" size={100}/><br />
                    <FloatLabel type="date" name="data_nascimento" onChange={handleChange} text="Nascimento" size={100}/><br />

                    <FlexDiv>
                        <Button action={handleCadastraCliente}>Cadastrar</Button>
                        <Button color={'red'} action={() => navigate('/Clientes/')}>Cancelar</Button>
                    </FlexDiv>
                </StyledForm>
            </FundoForm>
        </>
    );
};