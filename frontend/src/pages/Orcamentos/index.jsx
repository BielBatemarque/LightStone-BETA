import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { ContainerBtns } from "../Estoques/styles";
import { CadastrarClienteModal } from "../../components/Modal/CadastrarClienteModal";
import { DataGrid } from "../../components/Datagrid/styled";

export const OrcamentosPage = () => {
    const [orcamentos, setOrcamentos] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const orcamentosRequest = async () => {
        const request = await fetch(`http://localhost:8000/orcamentos/reotorna_listagem_orcamentos_com_cliente/`);
        const response = await request.json();

        setOrcamentos(response);
    }

    useEffect(() => {
        orcamentosRequest();
    }, []);

    console.log(orcamentos);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleFormataValorMonetário = (valor) => {
        const valorFormatado = `R$ ${Number(valor).toFixed(2).replace('.', ',')}`;
        return valorFormatado;
    }

    return(
        <>
            <FlexCointainer pontas='true' size='98%'>
                <Title>Orçamentos</Title>
                <ContainerBtns>
                    <Button color={'blue'} action={handleOpenModal}>Novo Cliente</Button>
                    <Button action={() => navigate('/Orcamentos/NovoOrcamento/') }>Novo Orçamento</Button>
                </ContainerBtns>
            </FlexCointainer>
            <DataGrid>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Valor total</th>
                        <th>Qtnd. Peças</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {orcamentos.map((orcamento, index) => (
                        <tr key={index}>
                            <td>{orcamento.cliente.nome}</td>
                            <td>{handleFormataValorMonetário(orcamento.valor_total)}</td>
                            <td>{orcamento.pecas.length}</td>
                            <td className="actions">
                                <button className="edit" onClick={() => navigate(`/Orcamentos/MaisInformacoesOrcamento/${orcamento.id}`)}>Editar</button>
                                <button className="delete" onClick={() => handleFormataValorMonetário()}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </DataGrid>
            <CadastrarClienteModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}