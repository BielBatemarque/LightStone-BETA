import { Button } from "../../components/Button";
import { Title } from "../../components/Title";

export const CadastrarUsuarioPage = () => {
    return(
        <>
            <Title>Cadastrar Usuário</Title>

            <form>
                <input type="text" name="username" placeholder="nome de usuário"/><br />
                <input type="email" name="email" placeholder="Email" /><br />
                <select name="is_staff">
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                </select>   <br />
                <input type="password" name="password" placeholder="Senha"/><br />
                <Button>Cadastrar Usuário</Button>
            </form>
        </>
    );
};