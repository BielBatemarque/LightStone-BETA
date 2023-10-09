import { Title } from "../../components/Title";

export const CadastrarMaterialPage = () => {
    return(
        <>
            <Title>Cadastrar Material</Title>
            <form action="">
                <input type="text" placeholder="Nome do material"/> <br />
                <input type="text" placeholder="Cor base"/> <br />
                <select name="" id="">
                    <option value="">Selecione</option>
                </select>
            </form>
        </>
    );
}