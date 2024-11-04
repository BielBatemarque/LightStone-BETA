import { useState } from 'react';
import { ButtonContainer, ModalContainer, Overlay } from './styles';

export const CadastrarClienteModal = ({ isOpen, onClose }) => {
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
        <h2>Novo Cliente</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
          </label>
          <label>
            Descrição:
            <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} required />
          </label>
          <label>
            Preço:
            <input type="number" name="preco" value={formData.preco} onChange={handleChange} required />
          </label>
          <label>
            Quantidade:
            <input type="number" name="quantidade" value={formData.quantidade} onChange={handleChange} required />
          </label>
          <ButtonContainer>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Salvar</button>
          </ButtonContainer>
        </form>
      </ModalContainer>
    </Overlay>
  );
};
