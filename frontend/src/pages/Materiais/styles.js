import styled from 'styled-components';

// Container principal da página
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  width: 100%;
  max-width: 600px;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// Estilização do título
export const TitleContainer = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
`;

// Formulário estilizado
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

// Inputs estilizados
export const StyledInput = styled.input`
  width: 95%;
  padding: 0.6rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

// Select estilizado
export const StyledSelect = styled.select`
  width: 100%;
  padding: 0.6rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

// Botões estilizados
export const StyledButton = styled.button`
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) => (props.color === 'red' ? '#fff' : '#fff')};
  background-color: ${(props) => (props.color === 'red' ? '#e74c3c' : '#4caf50')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.color === 'red' ? '#c0392b' : '#388e3c')};
  }
`;

// Bloco de label e input (para formatação)
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
  label {
    font-size: 0.85rem;
    font-weight: 500;
    color: #555;
  }
`;
