import { useState } from 'react';
import './Login.css';

import { ColumForm, Container, ImageContainer, InputStyled, SemiContainerInputs, StyledButton } from "./styles";

export const LoginScreen = () => {
    const [login, setLogin] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setLogin((prevLogin) => ({
            ...prevLogin,
            [name]:value,
        }));
    };
    console.log(login);

    return(
        <div className="LoginScreen">
            <Container>
                <ImageContainer>
                    opa
                </ImageContainer>
                <SemiContainerInputs>
                    <ColumForm>

                        <label htmlFor="username">Usuário</label>
                        <InputStyled type="text" name="username" placeholder="Nome de Usuário" onChange={handleChange}/>

                        <label htmlFor="senha">Senha:</label>
                        <InputStyled type='password' placeholder="Senha" name="password" onChange={handleChange}/>

                        <StyledButton type="submit">Entrar</StyledButton>
                    </ColumForm>
                </SemiContainerInputs>
            </Container>
        </div>
    );
}