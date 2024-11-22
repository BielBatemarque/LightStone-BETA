import styled from "styled-components";

export const DataGrid = styled.table`
  width: 95%;
  border-collapse: collapse;
  margin: 30px auto;
  font-size: 1rem;
  text-align: left;

  th, td {
    padding: 10px 15px;
    border: 1px solid #ddd;
  }

  th {
    background-color: rgb(42, 42, 42);
    color: rgb(159, 158, 158);
    font-weight: bold;
    font-size: 1.1rem;
    border: none
  }

  th.actions {
    width: 150px;
  }

  td.actions {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  button {
    padding: 5px 10px;
    font-size: 0.9rem;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  .edit {
    background-color: #4caf50;
    color: white;
  }

  .delete {
    background-color: #f44336;
    color: white;
  }
`;
