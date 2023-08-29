import styled from 'styled-components';

export const Container = styled.div`
    width: 80%;
    height: 80vh;
    background-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    box-shadow: 3px 3px 5px black;
    border-radius: 15px;
`;

export const SemiContainerInputs = styled.div`
    background-color: white;
    width: 60%;
    position: relative;
    background-color: blue;
    margin: none;
`;

export const ImageContainer = styled.div`
    background-color: green;
    width: 40%;
    margin: 0;
    position: relative;

`;

export const ColumForm = styled.form`
    display: flex;
    flex-direction: column;
`;

export const InputStyled = styled.input`
    width: 25vw;
`;