import { useContext, useEffect, useState } from "react";
import { ButtonContainer, ModalContainer, Overlay, StyledTable } from "./styles";
import { FaTrash } from 'react-icons/fa';
import { globalContext } from "../../context/context";
import { FailNotifications, SucssesNotifications } from "../Notifications";

export const CadastrarOrcamentoModal = ({ isOpen, onClose }) => {
    const [clientes, setClientes] = useState([]);
    const [materiais, setMateriais] = useState([]);
    const [peca, setPeca] = useState({});
    const [orcamento, setOrcamento] = useState({
        valor_total: 0,
        cliente: null,
        pecas: [],
    });

    const { state } = useContext(globalContext);

    // Funções para carregar clientes e materiais
    const handleCarregaClientes = async () => {
        const request = await fetch('http://localhost:8000/clientes/');
        const response = await request.json();
        setClientes(response);
    };

    const handleLoadMateriais = async () => {
        const request = await fetch('http://localhost:8000/materiais/');
        const response = await request.json();
        setMateriais(response);
    };

    useEffect(() => {
        handleCarregaClientes();
        handleLoadMateriais();
    }, []);

    // Manipuladores de mudança
    const handleChangeOrcamento = (e) => {
        const { name, value } = e.target;
        setOrcamento((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleChangePeca = (e) => {
        const { name, value } = e.target;
        setPeca((prevPeca) => ({ ...prevPeca, [name]: value }));
    };

    // Adiciona a peça ao orçamento e recalcula o valor total
    const handleSalvarPeca = async (e) => {
        e.preventDefault();
        const request = await fetch('http://localhost:8000/pecas/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
            body: JSON.stringify(peca),
        });
        const response = await request.json();

        if (request.ok) {
            SucssesNotifications('Peça adicionada ao Orçamento.');
            setOrcamento((prevOrcamento) => {
                const novoValorTotal = prevOrcamento.valor_total + (response.preco_m2 * response.quantidade_metros);
                return {
                    ...prevOrcamento,
                    pecas: [...prevOrcamento.pecas, response],
                    valor_total: novoValorTotal,
                };
            });
        } else {
            FailNotifications('Não foi possível adicionar a peça ao orçamento.');
        }
    };

    // Remove a peça do orçamento e recalcula o valor total
    const handleRemoverPeca = (pecaToRemove) => {
        setOrcamento((prevOrcamento) => {
            const novaListaPecas = prevOrcamento.pecas.filter((peca) => peca.id !== pecaToRemove.id);
            const novoValorTotal = prevOrcamento.valor_total - (pecaToRemove.preco_m2 * pecaToRemove.quantidade_metros);
            return {
                ...prevOrcamento,
                pecas: novaListaPecas,
                valor_total: novoValorTotal,
            };
        });
        SucssesNotifications('Peça removida com sucesso.');
    };

    // Finaliza e cadastra o orçamento
    const handleCadastrarOrcamento = async (e) => {
        e.preventDefault();
        const pecasIds = orcamento.pecas.map((peca) => peca.id);
        const orcamentoComPecas = {
            ...orcamento,
            pecas: pecasIds,
        };

        const request = await fetch('http://localhost:8000/orcamentos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
            body: JSON.stringify(orcamentoComPecas),
        });

        if (request.ok) {
            SucssesNotifications('Orçamento cadastrado com sucesso.');
            onClose();
        } else {
            FailNotifications('Não foi possível cadastrar o orçamento.');
        }
    };

    if (!isOpen) return null;

    return (
        <Overlay>
            <ModalContainer>
                <h2>Novo Orçamento</h2>

                {/* Formulário do Orçamento */}
                <form onSubmit={handleCadastrarOrcamento}>
                    <label>
                        Selecione o cliente:
                        <select name="cliente" onChange={handleChangeOrcamento}>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                            ))}
                        </select>
                    </label>

                    {/* Tabela de peças cadastradas */}
                    <StyledTable>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Quantidade de M²</th>
                                <th>Material</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orcamento.pecas.map((peca, index) => (
                                <tr key={index}>
                                    <td>{peca.nome}</td>
                                    <td>{peca.quantidade_metros}</td>
                                    <td>{peca.material}</td>
                                    <td>
                                        <FaTrash onClick={() => handleRemoverPeca(peca)} style={{ cursor: 'pointer', color: 'red' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>

                    <label>
                        Valor total do Orçamento:
                        <input type="number" name="valor_total" value={orcamento.valor_total} readOnly />
                    </label>

                    <ButtonContainer>
                        <button type="button" onClick={onClose}>Cancelar</button>
                        <button type="submit">Salvar</button>
                    </ButtonContainer>
                </form>

                {/* Formulário para cadastrar as peças do orçamento */}
                <form onSubmit={handleSalvarPeca}>
                    <label>
                        Nome da peça:
                        <input type="text" name="nome" onChange={handleChangePeca} />
                    </label>
                    <label>
                        Descrição:
                        <input type="text" name="descricao" onChange={handleChangePeca} />
                    </label>
                    <label>
                        Quantidade de M²:
                        <input type="number" name="quantidade_metros" onChange={handleChangePeca} />
                    </label>
                    <label>
                        Material:
                        <select name="material" onChange={handleChangePeca}>
                            {materiais.map((material) => (
                                <option key={material.id} value={material.id}>{material.nome}</option>
                            ))}
                        </select>
                    </label>
                    
                    <ButtonContainer>
                        <button type="submit">Incluir Peça</button>
                    </ButtonContainer>
                </form>
            </ModalContainer>
        </Overlay>
    );
};