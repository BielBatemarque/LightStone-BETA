import { Title } from "../../components/Title";
import { Button } from '../../components/Button';

export const CadastrarFornecedor = () => {

    const handleCadastrarFornecedor = async (e) => {
        e.preventDefault();
        window.alert('cadastrar Fornecedor')

    }
    return(
        <>
           <Title>Cadastrar Fornecedor</Title>
           <form onSubmit={handleCadastrarFornecedor}>
            <input type="text" placeholder="Nome da empresa" name="nome_empresa"/> <br />
            <input type="text" placeholder="CNPJ" name="cnpj" /><br />
            <input type="text" placeholder="Endereço" name="endereco" /> <br />
            <Button>Cadastrar Fornecedor</Button>
           </form>
        </>
    );
}