import { useEffect, useState } from "react";
import { Title } from "../../components/Title";
import { Button } from '../../components/Button';
import { useParams } from 'react-router-dom';

export const MaisInformacoesUsuarios = () => {
    const [usuario, setUsuario] = useState({});
    const { id } = useParams(':id');

    const handleLoadingUser = async () => {
        const request = await fetch(`http://localhost:8000/users/${id}`);
        const response = await request.json();

        setUsuario(response);
    };

    useEffect(() => {
        handleLoadingUser();
    }, []);

    const handleUpdateUser = async () => {};

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUsuario({...usuario, [name]: value});
    };

    console.log(usuario);

    return(
        <>
            <Title>Editar Usuário</Title>
            

            <form onSubmit={handleUpdateUser}>
                <input type="text" name="username" placeholder="nome de usuário" onChange={handleChange} value={usuario.username}/><br />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} value={usuario.email}/><br />
                <select name="is_staff" onChange={handleChange} value={usuario.is_staff}>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                </select>   <br />
                <input type="password" name="password" placeholder="Senha" onChange={handleChange} value={usuario.password}/><br />
                <Button>Cadastrar Usuário</Button>
            </form>
        </>
    );
};