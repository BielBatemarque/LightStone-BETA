import { useState } from "react";
import { Title } from "../../components/Title";
import { Button } from '../../components/Button';

export const MaisInformacoesUsuarios = () => {
    const [usuario, setUsuario] = useState({});

    const handleUpdateUser = async () => {};

    const handleChange = (e) => {
    }

    return(
        <>
            <Title>Editar Usuário</Title>
            

            <form onSubmit={handleUpdateUser}>
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