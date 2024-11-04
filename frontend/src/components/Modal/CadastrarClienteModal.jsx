import { useContext, useState } from 'react';
import { ButtonContainer, ModalContainer, Overlay } from './styles';
import { globalContext } from '../../context/context';
import { FailNotifications, SucssesNotifications } from '../Notifications';

export const CadastrarClienteModal = ({ isOpen, onClose }) => {
  const { state } = useContext(globalContext);
  const [cliente, setCliente] = useState({
    nome: '',
    cpf: '',
    cep: '',
    email: '',
    data_nascimento: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = await fetch('http://localhost:8000/clientes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${state.token}`,
      },
      body: JSON.stringify(cliente)
    });


    const response = await request.json();

    console.log(response);
    setCliente({
      nome: '',
      cpf: '',
      cep: '',
      email: '',
      data_nascimento: ''
    });
    
    if (request.ok){
      SucssesNotifications('Cliente cadastrado com sucesso.');
    } else {
      FailNotifications('Erro ao cadastrar Cliente.')
    }

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
            <input type="text" name="nome" value={cliente.nome} onChange={handleChange} required />
          </label>
          <label>
            CPF:
            <input type="text" name="cpf" value={cliente.cpf} onChange={handleChange} required />
          </label>
          <label>
            CEP:
            <input type="number" name="cep" value={cliente.cep} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={cliente.email} onChange={handleChange} required />
          </label>

          <label>
            Data de Nascimento:
            <input type="date" name="data_nascimento" value={cliente.data_nascimento} onChange={handleChange} required />
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
