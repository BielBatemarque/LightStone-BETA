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
                <input type="text" placeholder="nome"/> <br />
                <input type="date" name="" id="" /> <br />
                <input type="text" placeholder="telefone"/><br />
                <input type="text" placeholder="CPF" /> <br />
                <input type="email" placeholder="email"/> <br />
                <input type="text" name="" id="" placeholder="cargo"/> <br />

                <Button children={'Cadastrar'} action={handleCadastrarColab}/>
            </form>
        </>
    );
}