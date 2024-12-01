import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask'; // Import da biblioteca
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { FailNotifications, SucssesNotifications } from '../../components/Notifications';
import { FloatLabel } from '../../components/FloatLabel';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h1 {
    font-size: 1.75rem;
    color: #333;
  }
`;

const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Em telas menores, usa uma única coluna */
  }
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }
`;

const ButtonContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const MaisInformacoesCliente = () => {
  const { id } = useParams(':id');
  const navigate = useNavigate();
  const { state } = useAuth();

  const [cliente, setCliente] = useState({});

  // Função para carregar os dados do cliente
  const handleLoadCliente = async () => {
    try {
      const response = await fetch(`http://localhost:8000/clientes/${id}`);
      const data = await response.json();
      setCliente(data);
    } catch (error) {
      FailNotifications('Erro ao carregar dados do cliente');
    }
  };

  // Atualizar cliente
  const handleUpdateCliente = async (e) => {
    e.preventDefault();
    
    console.log(cliente)
    try {
      const response = await fetch(`http://localhost:8000/clientes/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${state.token}`,
        },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        SucssesNotifications('Cliente editado com sucesso');
        navigate('/Clientes/');
      } else {
        FailNotifications('Erro ao editar cliente');
      }
    } catch (error) {
      FailNotifications('Erro ao editar cliente');
    }
  };

  // Deletar cliente
  const handleDeleteCliente = async () => {
    const isConfirmed = window.confirm('Tem certeza que deseja excluir este cliente?');
    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:8000/clientes/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${state.token}`,
        },
      });

      if (response.ok) {
        SucssesNotifications('Cliente excluído com sucesso');
        navigate('/Clientes/');
      } else {
        FailNotifications('Erro ao excluir cliente');
      }
    } catch (error) {
      FailNotifications('Erro ao excluir cliente');
    }
  };

  // Atualizar campo do cliente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  useEffect(() => {
    handleLoadCliente();
  }, []);

  return (
    <FormContainer>
      <FormTitle>
        <Title>Cliente: {cliente.nome || 'Carregando...'}</Title>
      </FormTitle>
      <FormGrid onSubmit={handleUpdateCliente}>
        {/* Nome */}
        <FieldContainer>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={cliente.nome || ''}
            onChange={handleChange}
          />
        </FieldContainer>
        {/* CPF com máscara */}
        <FieldContainer>
          <label htmlFor="cpf">CPF</label>
          <InputMask
            mask="999.999.999-99"
            value={cliente.cpf || ''}
            onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
          >
            {(inputProps) => <input {...inputProps} id="cpf" name="cpf" />}
          </InputMask>
        </FieldContainer>
        {/* CEP com máscara */}
        <FieldContainer>
          <label htmlFor="cep">CEP</label>
          <InputMask
            mask="99999-999"
            value={cliente.cep || ''}
            onChange={(e) => setCliente({ ...cliente, cep: e.target.value.replace('-','') })}
          >
            {(inputProps) => <input {...inputProps} id="cep" name="cep" />}
          </InputMask>
        </FieldContainer>
        <FieldContainer>
          <label htmlFor="bairro">Bairro</label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            value={cliente.bairro || ''}
            onChange={handleChange}
          />
        </FieldContainer>
        <FieldContainer>
          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={cliente.cidade || ''}
            onChange={handleChange}
          />
        </FieldContainer>
        <FieldContainer>
          <label htmlFor="uf">UF</label>
          <input
            type="text"
            id="uf"
            name="uf"
            value={cliente.uf || ''}
            onChange={handleChange}
          />
        </FieldContainer>
        <FieldContainer>
          <label htmlFor="logradouro">Logradouro</label>
          <input
            type="text"
            id="logradouro"
            name="logradouro"
            value={cliente.logradouro || ''}
            onChange={handleChange}
          />
        </FieldContainer>
        <FieldContainer>
          <label htmlFor="numero">Número</label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={cliente.numero || ''}
            onChange={handleChange}
          />
        </FieldContainer>
        <FieldContainer>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={cliente.email || ''}
            onChange={handleChange}
          />
        </FieldContainer>
        <FieldContainer>
          <label htmlFor="data_nascimento">Data de Nascimento</label>
          <input
            type="date"
            id="data_nascimento"
            name="data_nascimento"
            value={cliente.data_nascimento || ''}
            onChange={handleChange}
          />
        </FieldContainer>
        <ButtonContainer>
          <Button type="submit">Salvar</Button>
          <Button color="red" type="button" action={handleDeleteCliente}>
            Deletar Cliente
          </Button>
        </ButtonContainer>
      </FormGrid>
    </FormContainer>
  );
};