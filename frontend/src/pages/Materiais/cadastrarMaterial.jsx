import { Button } from "../../components/Button";
import { Title } from "../../components/Title";

export const CadastrarMaterialPage = () => {
    const handleCadastrarMaterial = async (e) => {
        e.preventDefault();
        window.alert('Cadastrar Material');
    };
    
    return(
        <>
            <Title>Cadastrar Material</Title>
            <form action="">
                <input type="text" placeholder="Nome do material"/> <br />
                <input type="text" placeholder="Cor base"/> <br />
                <select name="" id="">
                    <option value="">Selecione</option>
                </select>
                <Button action={handleCadastrarMaterial}>Cadastrar Material</Button>
            </form>
        </>
    );
}