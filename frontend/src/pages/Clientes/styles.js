import styled from "styled-components";

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