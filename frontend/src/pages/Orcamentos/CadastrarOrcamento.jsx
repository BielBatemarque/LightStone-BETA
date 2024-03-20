import { Title } from "../../components/Title";
import { FlexDiv, FundoForm, FundoTitle } from "../Clientes/styles";
import { Button } from "../../components/Button";

export const CadastrarOrcamento = () => {
    return(
        <>
            <FundoTitle>
                <Title mt={'0px'}>Novo Orçamento</Title>
            </FundoTitle>
            <FundoForm>
                <h2 style={{
                    margin: '0px',
                    textAlign: 'center',
                }}>Lista de Peças:</h2>

                <FlexDiv>
                    <Button color={'gray'}>Adicionar Peça</Button>
                </FlexDiv>
            </FundoForm>
        </>
    );
}