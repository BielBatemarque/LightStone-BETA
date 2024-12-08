import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h1 {
    font-size: 1.75rem;
    color: #333;
  }
`;

export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Em telas menores, usa uma única coluna */
  }
`;

export const FieldContainer = styled.div`
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

export const ButtonContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const FundoTitle = styled.div`
    background-color: #f5f5f5;
    padding: 20px;
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.5em;
`;

export const FundoForm = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px; /* Espaçamento vertical entre as linhas */
`;

export const FlexRow = styled.div`
    display: flex;
    gap: 20px; /* Espaçamento horizontal entre os campos */

    /* Campos com tamanhos iguais */
    > div {
        flex: 1;
    }

    /* Para inputs dentro dos campos */
    > div input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }
`;

export const StyledFloatLabel = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-size: 0.9em;
        color: #555;
        margin-bottom: 5px;
    }

    input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
    }
`;

export const FlexDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px; /* Espaçamento entre botões */
    margin-top: 20px;
`;