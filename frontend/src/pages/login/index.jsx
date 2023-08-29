import { ColumForm, Container, ImageContainer, SemiContainerInputs } from "./styles";

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
                        <input type="text" name="username" placeholder="Nome de Usuário"/>

                        <label htmlFor="senha">Senha:</label>
                        <input type='password' placeholder="Senha" />

                        <button type="submit">Entrar</button>
                    </ColumForm>
                </SemiContainerInputs>
            </Container>
        </div>
    );
}