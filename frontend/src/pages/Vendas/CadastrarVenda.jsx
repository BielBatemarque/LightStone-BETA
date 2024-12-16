// Importações necessárias
import { useContext, useState } from "react";
import { Title } from "../../components/Title";
import { FlexDiv, FundoForm, FundoTitle, StyledForm } from "../Clientes/styles"; // Estilos compartilhados
import { FloatLabel } from "../../components/FloatLabel";
import { Button } from "../../components/Button";
import { Linha } from './styles'; // Estilo local
import { AtentionNotification, SucssesNotifications } from "../../components/Notifications";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// Componente principal
export const CadastrarVenda = () => {
    const [orcamentosCliente, setOrcamentosClientes] = useState([]);
    const [nomeCliente, setNomeCliente] = useState('');
    const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);
    const { state } = useAuth();
    const navigate = useNavigate();

    // Função para carregar os orçamentos do cliente
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

    // Função para finalizar a venda
    const handleFinalizarVenda = async () => {
        const request = await fetch('http://localhost:8000/vendas/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`
            },
            body: JSON.stringify({
                valor_total: orcamentoSelecionado.valor_total,
                cliente: orcamentoSelecionado.cliente,
                orcamento: orcamentoSelecionado.id,
            }),
        });

        if (request.ok) {
            SucssesNotifications("Venda finalizada com sucesso.");
            navigate('/Vendas/');
        }
    };

    // Função para lidar com a seleção do orçamento
    const handleSelectOrcamento = (orcamento) => {
        setOrcamentoSelecionado(orcamentoSelecionado?.id === orcamento.id ? null : orcamento); // Seleciona/deseleciona o orçamento
    };

    return (
        <>
            <FundoTitle>
                <Title mt={0}>Nova Venda</Title>
            </FundoTitle>
            <FundoForm>
                <StyledForm onSubmit={handleCarregarOrcamentosCliente}>
                    <Linha>
                        <FloatLabel
                            text="Pesquisar por cliente"
                            onChange={(e) => setNomeCliente(e.target.value)}
                        />
                        <Button color="gray">Pesquisar</Button>
                    </Linha>
                </StyledForm>

                {/* Exibição da tabela de orçamentos */}
                {orcamentosCliente.length > 0 && (
                    <FlexDiv>
                        <table>
                            <thead>
                                <tr>
                                    <th>Selecionar</th>
                                    <th>Quantidade de peças</th>
                                    <th>Valor</th>
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

                {/* Botão para finalizar a venda */}
                <FlexDiv>
                    <Button action={handleFinalizarVenda}>Finalizar Venda</Button>
                </FlexDiv>
            </FundoForm>
        </>
    );
};
