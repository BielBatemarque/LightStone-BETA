import styled from 'styled-components';

export const StyledSelect = styled.select`
    width: 100%;
    height: 2.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 5px;
    margin: 10px 0;
    font-size: 1rem;
`;

export const StyledOptions = styled.option`
    padding: 5px;
    height: 2rem;
    margin: 5px;
`;

export const FormContainer = styled.div`
    width: 50%;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StyledField = styled.div`
    width: 100%;
    max-width: 400px;
    margin-bottom: 15px;
`;

export const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const StyledButton = styled.button`
    background-color: ${(props) => props.color || '#007BFF'};
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => props.hoverColor || '#0056b3'};
    }

    &:last-child {
        margin-right: 0;
    }
`;

export const TitleStyled = styled.h1`
    text-align: center;
    color: #333;
    margin-bottom: 1rem;
`;
