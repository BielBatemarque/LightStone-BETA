import { useEffect, useState } from "react";
import { Title } from "../Title";
import { ButtonContainer, ModalContainer, Overlay } from "./styles";

export const CadastrarOrcamentoModal = ({ isOpen, onClose }) => {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        quantidade: '',
      });

      const handleCarregaClientes = async () => {
        const request = await fetch('http://localhost:8000/clientes/');
        const response = await request.json();

        setClientes(response);
      }

      useEffect(() => {
        handleCarregaClientes();
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        onClose();
      };

      if (!isOpen) return null;

    return (
        <Overlay>
            <ModalContainer>
                <Title>Novo Orçamento</Title>
                <label>
                    Selecione o cliente:
                    <select>
                        {clientes.map((cliente, index) => (
                            <option key={index} value={cliente.id}>{cliente.nome}</option>
                        ))}
                    </select>
                </label>

                <ButtonContainer>
                    <button type="button" onClick={onClose}>Cancelar</button>
                    <button type="submit">Salvar</button>
                </ButtonContainer>
            </ModalContainer>
        </Overlay>
    );
}