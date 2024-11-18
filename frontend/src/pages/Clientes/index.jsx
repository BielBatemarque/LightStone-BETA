import { useContext, useEffect, useState } from "react";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import { ContainerBtns } from "../Estoques/styles";
import { CadastrarOrcamentoModal } from '../../components/Modal/CadastrarOrcamentoModal';
import { ConfirmarExclusaoModal } from '../../components/Modal/ConfirmarExclusaoModal'; // Importação do modal
import { DataGrid } from "../../components/Datagrid/styled"; 
import { globalContext } from "../../context/context";
import { SucssesNotifications } from "../../components/Notifications";

export const ClientesPage = () => {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const { state } = useContext(globalContext);

    useEffect(() => {
        handleCarregaClientes();
    }, []);

    const handleCarregaClientes = async () => {
        const request = await fetch('http://localhost:8000/clientes/');
        const response = await request.json();
        setClientes(response);
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleDeleteConfirm = () => {
        fetch(`http://localhost:8000/clientes/${clienteSelecionado}/`, {
             method: "DELETE",
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
             } 
            })
            .then(() => {
                handleCarregaClientes();
                setIsDeleteModalOpen(false);
                setClienteSelecionado(null);
                SucssesNotifications("Sucesso ao excluir cliente.");
            })
            .catch((err) => console.error("Erro ao excluir cliente:", err));
    };

    const handleOpenDeleteModal = (id) => {
        setClienteSelecionado(id);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setClienteSelecionado(null);
    };

    return (
        <>
            <FlexCointainer pontas="true" size="92%">
                <Title>Clientes</Title>
                <ContainerBtns width="15rem">
                    <Button color="blue" action={handleOpenModal}>Novo Orçamento</Button>
                    <Button action={() => navigate('/Clientes/cadastrarCliente/')}>Novo Cliente</Button>
                </ContainerBtns>
            </FlexCointainer>
            <DataGrid>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th className="actions">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                            <td className="actions">
                                <button className="edit" onClick={() => navigate(`/Clientes/maisInformacoesCliente/${cliente.id}/`)}>Editar</button>
                                <button className="delete" onClick={() => handleOpenDeleteModal(cliente.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </DataGrid>
            <CadastrarOrcamentoModal isOpen={isModalOpen} onClose={handleCloseModal} />
            {isDeleteModalOpen && (
                <ConfirmarExclusaoModal 
                    mensagem="Tem certeza que deseja excluir este cliente?" 
                    onConfirm={handleDeleteConfirm} 
                    onCancel={handleCloseDeleteModal} 
                />
            )}
        </>
    );
};