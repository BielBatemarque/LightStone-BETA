import { useContext, useState } from "react";
import { Title } from "../../components/Title";
import { FlexDiv, FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { FloatLabel } from "../../components/FloatLabel";
import { Button } from "../../components/Button";
import { Linha } from './styles';
import { AtentionNotification, SucssesNotifications } from "../../components/Notifications";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const CadastrarVenda = () => {
    const [orcamentosCliente, setOrcamentosClientes] = useState([]);
    const [nomeCliente, setNomeCliente] = useState('');
    const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);
    const {state} = useAuth();
    const navigate = useNavigate();

    const handleCarregarOrcamentosCliente = async (event) => {
        event.preventDefault();

        if (!nomeCliente) {
            AtentionNotification("Digite o nome do cliente");
            return;
        }

        const request = await fetch(`http://localhost:8000/orcamentos/retorna_orcamentos_cliente/?cliente=${nomeCliente}`);
        const response = await request.json();

        setOrcamentosClientes(response);

        if (response.length > 0) {
            SucssesNotifications("Orçamentos Encontrados");
        }
    };

    const handleFinalizarVenda = async () => {
      const request = await fetch('http://localhost:8000/vendas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization' : `Token ${state.token}`
        },
        body: JSON.stringify({
          valor_total: orcamentoSelecionado.valor_total,
          cliente: orcamentoSelecionado.cliente.id,
          orcamento: orcamentoSelecionado.id,
        }),
      });
      
      if (request.ok){
        SucssesNotifications("Venda finalizada com sucesso.");
        navigate('/Vendas/');
      }
    }


    // Função para lidar com a seleção do orçamento
    const handleSelectOrcamento = (orcamento) => {
        setOrcamentoSelecionado(orcamentoSelecionado?.id === orcamento.id ? null : orcamento); // Seleciona/deseleciona o orçamento
    };

    console.log("Cliente:", nomeCliente);
    console.log("Orçamentos:", orcamentosCliente);
    console.log("Orçamento Selecionado:", orcamentoSelecionado);

    return (
        <>
            <FundoTitle>
                <Title mt={0}>Nova Venda</Title>
            </FundoTitle>
            <FundoForm>
                <StyledForm onSubmit={handleCarregarOrcamentosCliente}>
                    <Linha>
                        <FloatLabel text="Pesquisar por cliente" onChange={(e) => setNomeCliente(e.target.value)} />
                        <Button color={'gray'}>Pesquisar</Button>
                    </Linha>
                </StyledForm>

                {orcamentosCliente.length > 0 && (
                    <FlexDiv>
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
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={orcamentoSelecionado?.id === orcamento.id}
                                                onChange={() => handleSelectOrcamento(orcamento)}
                                            />
                                        </td>
                                        <td>{orcamento.pecas.length}</td>
                                        <td>{orcamento.valor_total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </FlexDiv>
                )}

                <FlexDiv>
                    <Button action={() => handleFinalizarVenda()}>Finalizar Venda</Button>
                </FlexDiv>
            </FundoForm>
        </>
    );
};