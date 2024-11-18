import { useEffect, useState } from "react";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import { ContainerBtns } from "../Estoques/styles";
import { CadastrarOrcamentoModal } from '../../components/Modal/CadastrarOrcamentoModal';
import { DataGrid } from "../../components/Datagrid/styled"; 

export const ClientesPage = () => {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleEdit = (id) => {
        navigate(`/Clientes/maisInformacoesCliente/${id}/`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
            fetch(`http://localhost:8000/clientes/${id}/`, { method: "DELETE" })
                .then(() => handleCarregaClientes())
                .catch((err) => console.error("Erro ao excluir cliente:", err));
        }
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
                        <button className="edit" onClick={() => handleEdit(cliente.id)}>Editar</button>
                        <button className="delete" onClick={() => handleDelete(cliente.id)}>Excluir</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </DataGrid>
            <CadastrarOrcamentoModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};