import React, { useState } from 'react';

import { ColumForm, Container, ImageContainer, InputStyled, SemiContainerInputs, StyledButton } from "./styles";

export const LoginScreen = () => {
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
    
        const apiLogin = 'http://localhost:8000/login/';
       console.log('tenta efetuar login')
    };

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