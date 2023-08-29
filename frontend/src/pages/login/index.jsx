import { ColumForm, Container, ImageContainer, InputStyled, SemiContainerInputs } from "./styles";

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
                        <InputStyled type="text" name="username" placeholder="Nome de Usuário" />

                        <label htmlFor="senha">Senha:</label>
                        <InputStyled type='password' placeholder="Senha" />

                        <button type="submit">Entrar</button>
                    </ColumForm>
                </SemiContainerInputs>
            </Container>
        </div>
    );
}