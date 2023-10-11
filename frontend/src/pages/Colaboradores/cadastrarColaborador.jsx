import { Title } from "../../components/Title";
import { Button } from '../../components/Button/index';
import { useState } from "react";
import { Colaborador } from "../../models/Colaborador";

export const CadastrarColaboradorPage = () => {
    const [colab, setColab] = useState(new Colaborador());

    const handleCadastrarColab = async (e) => {
        e.preventDefault();

        window.alert('Cadastrar Colaborador');
    };

    return(
        <>
            <Title>Cadastrar Colaborador</Title>
            <form action="">
                <input type="text" placeholder="nome" name="nome"/> <br />
                <input type="date" name="nascimento" id="" /> <br />
                <input type="text" placeholder="telefone" name="telefone"/><br />
                <input type="text" placeholder="CPF" name="cpf" /> <br />
                <input type="email" placeholder="email" name="email"/> <br />
                <input type="text" id="" placeholder="cargo" name="cargo"/> <br />

                <Button children={'Cadastrar'} action={handleCadastrarColab}/>
            </form>
        </>
    );
}