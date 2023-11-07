import { useState } from "react";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { useAuth } from "../../hooks/useAuth";
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { useNavigate } from "react-router-dom";

export const CadastrarUsuarioPage = () => {
    const [user, setUser] = useState({});
    const { state } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name]: value});
    };

    console.log(user);

    const handleCadastrarUser = async (e) => {
        e.preventDefault();

        const request = await fetch('http://localhost:8000/users/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Token ${state.token}`
            },
            body: JSON.stringify(user),
        });

        if (request.ok){
            SucssesNotifications('usuário cadastrado com sucesso');
            navigate('/Usuarios/');
        }else{
            FailNotifications('Não foi possivel cadastrar Usuário');
        }
    };




    return(
        <>
            <Title>Cadastrar Usuário</Title>

            <form onSubmit={handleCadastrarUser}>
                <input type="text" name="username" placeholder="nome de usuário" onChange={handleChange}/><br />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br />
                <select name="is_staff" onChange={handleChange}>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                </select>   <br />
                <input type="password" name="password" placeholder="Senha" onChange={handleChange}/><br />
                <Button>Cadastrar Usuário</Button>
            </form>
        </>
    );
};