import './Login.css';

import { ColumForm, Container, ImageContainer, InputStyled, SemiContainerInputs, StyledButton } from "./styles";

export const LoginScreen = () => {
    return(
        <div className="LoginScreen">
            <Container>
                <ImageContainer>
                    opa
                </ImageContainer>
                <SemiContainerInputs>
                    <ColumForm>

                        <label htmlFor="username">Usuário</label>
                        <InputStyled type="text" name="username" placeholder="Nome de Usuário" className=','/>

                        <label htmlFor="senha">Senha:</label>
                        <InputStyled type='password' placeholder="Senha" />

                        <StyledButton type="submit">Entrar</StyledButton>
                    </ColumForm>
                </SemiContainerInputs>
            </Container>
        </div>
    );
}