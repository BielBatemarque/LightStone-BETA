import { useState } from "react";
import { Title } from "../Title";
import { ButtonContainer, ModalContainer, Overlay } from "./styles";

export const CadastrarOrcamentoModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        quantidade: '',
      });

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

                <ButtonContainer>
                    <button type="button" onClick={onClose}>Cancelar</button>
                    <button type="submit">Salvar</button>
                </ButtonContainer>
            </ModalContainer>
        </Overlay>
    );
}