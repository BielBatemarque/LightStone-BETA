import { Title } from "../../components/Title";
import { Button } from '../../components/Button/index';
import { useState } from "react";
import { Colaborador } from "../../models/Colaborador";
import { useAuth } from "../../hooks/useAuth";
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { useNavigate } from "react-router-dom";

export const CadastrarColaboradorPage = () => {
    const [colab, setColab] = useState(new Colaborador());
    const { state } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setColab({...colab, [name]: value});
    };
    
    const handleCadastrarColab = async (e) => {
        e.preventDefault();

        const request = await fetch('http://localhost:8000/colaboradores/', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization' : `Token ${state.token}`
            },
            body: JSON.stringify(colab),
        });

        if(request.ok){
            SucssesNotifications('Cadastrado com sucesso');
            navigate('/Colaboradores/');
        }else{
            FailNotifications('Erro ao cadastrar Colaborador');
        }
    
    };

    console.log(colab);

    return(
        <>
            <Title>Cadastrar Colaborador</Title>
            <form>
                <input type="text" placeholder="nome" name="nome" onChange={handleChange}/> <br />
                <input type="date" name="nascimento" id="" onChange={handleChange} /> <br />
                <input type="text" placeholder="telefone" name="telefone" onChange={handleChange}/><br />
                <input type="text" placeholder="CPF" name="cpf" onChange={handleChange} /> <br />
                <input type="email" placeholder="email" name="email" onChange={handleChange}/> <br />
                <input type="text" id="" placeholder="cargo" name="cargo" onChange={handleChange}/> <br />

                <Button children={'Cadastrar'} action={handleCadastrarColab}/>
            </form>
        </>
    );
};