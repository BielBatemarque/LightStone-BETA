import styled from 'styled-components';

// Container principal da página
export const FundoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
`;

// Container do formulário
export const FundoForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
  width: 100%;
  max-width: 500px;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// Formulário estilizado
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
`;

// Botões e campos organizados em flexbox
export const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  button {
    flex: 1;
    max-width: 300px;
  }
`;

// Select estilizado dentro do formulário
export const StyledSelect = styled.select`
  width: 80%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;
