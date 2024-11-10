import styled from 'styled-components';


export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }

  form label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }

  form input, select {
    width: 95%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button[type='button'] {
    background: #ccc;
  }

  button[type='submit'] {
    background: #007bff;
    color: white;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.9rem;
  font-family: Arial, sans-serif;

  th, td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
    color: #333;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;