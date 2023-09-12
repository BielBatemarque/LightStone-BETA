import React, { useContext, useState } from 'react';

import { ColumForm, Container, ImageContainer, InputStyled, SemiContainerInputs, StyledButton } from "./styles";
import { globalContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

export const LoginScreen = () => {
    const { dispatch, state } = useContext(globalContext);
    const navigate = useNavigate();

    const [login, setLogin] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prevLogin) => ({
            ...prevLogin,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Evita a recarga da página
        try{
            const apiLogin = 'http://localhost:8000/login/';
            const request = await fetch(apiLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login),
            }).then(response => response.json()).catch(err => console.log(err));

            console.log(request);
            const {token} = request;
            
            if (token){
                dispatch({type: 'autentication', payload: token});
                navigate('/Home/');
            }

        }catch(e){
            console.log(`Erro na api: ${e}`);
        }
    };

    
    // console.log(login);
    console.log(state);
    return (
        <div className="LoginScreen">
            <Container>
                <ImageContainer>
                    opa
                </ImageContainer>
                <SemiContainerInputs>
                    <ColumForm onSubmit={handleLogin} method='POST'>

                        <label htmlFor="username">Usuário</label>
                        <InputStyled type="text" name="username" placeholder="Nome de Usuário" onChange={handleChange} value={login.username} />

                        <label htmlFor="senha">Senha:</label>
                        <InputStyled type='password' placeholder="Senha" name="password" onChange={handleChange} value={login.password} />

                        <StyledButton type="submit">Entrar</StyledButton>
                    </ColumForm>
                </SemiContainerInputs>
            </Container>
        </div>
    );
}