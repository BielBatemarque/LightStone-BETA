import { useState } from "react";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";

export const CadastrarUsuarioPage = () => {
    const [user, setUser] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name]: value});
    };

    console.log(user);

    return(
        <>
            <Title>Cadastrar Usuário</Title>

            <form>
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