import { Title } from "../../components/Title";

export const CadastrarFornecedor = () => {
    return(
        <>
           <Title>Cadastrar Fornecedor</Title>
           <form action="">
            <input type="text" placeholder="Nome da empresa" /> <br />
            <input type="text" placeholder="CNPJ" /><br />
            <input type="text" placeholder="Endereço" /> <br />
           </form>
        </>
    );
}