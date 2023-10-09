import styled from "styled-components";

export const StyledButton = styled.button`
    background-color: ${props => props.color ? props.color : 'yellowgreen'};
    color: white;
    border-radius: 10px;
    padding: 20px;
    height: 60px;
    border: none;
    font-size: 1rem;
    margin-top: 1rem;
    cursor: pointer;
`;