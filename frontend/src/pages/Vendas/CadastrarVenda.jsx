import { useContext, useState } from "react";
import { ModalComponent } from "../../components/Modal";
import { Title } from "../../components/Title";
import { FlexDiv, FlexRow, FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { ScreenContext } from "../../context/screenContext";
import { FloatLabel } from "../../components/FloatLabel";
import { Button } from "../../components/Button";
import { Linha } from './styles';
import { AtentionNotification, FailNotifications, SucssesNotifications } from "../../components/Notifications";


export const CadastrarVenda = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [orcamentosCliente, setOrcamentosClientes] = useState([]);
    const [nomeCliente, setNomeCliente] = useState('');
    

    const handleCarregarOrcamentosCliente = async (event) => {
      event.preventDefault();

      if (!nomeCliente){
        AtentionNotification("Digite o nome do cliente");
        return;
      }

      const request = await fetch(`http://localhost:8000/orcamentos/retorna_orcamentos_cliente/?cliente=${nomeCliente}`);
      const response = await request.json();

      setOrcamentosClientes(response);

      if (response.length > 0){
        SucssesNotifications("Orçamentos Encontrados");
      }
    }

    console.log(nomeCliente);
    console.log(orcamentosCliente);
  
    return (
      <>
        <FundoTitle>
          <Title mt={0}>Nova Venda</Title>
        </FundoTitle>
        <FundoForm>
            <StyledForm onSubmit={handleCarregarOrcamentosCliente}>
              <Linha>
                <FloatLabel text="Pesquisar por cliente" onChange={(e) => setNomeCliente(e.target.value)}/>
                <Button color={'gray'}>Pesquisar</Button>
              </Linha>
            </StyledForm>

            {
              orcamentosCliente.length > 0 ?
                <table>
                  <thead>
                    <tr>
                      <td>Selecionar</td>
                      <td>Quantidade de peças</td>
                      <td>Valor</td>
                    </tr>
                  </thead>
                  <tbody>
                    {orcamentosCliente.map((orcamento, index) => (
                      <tr key={index}>
                        <td><input type="checkbox"/></td>
                        <td>{orcamento.pecas.length}</td>
                        <td>{orcamento.valor_total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                : null
            }
            <FlexDiv>
              <Button>Finalizar Venda</Button>
            </FlexDiv>
        </FundoForm>
      </>
    );
  };