import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const StyledH3 = styled.h3`
    margin: 1rem 0;
    color: #333;
    font-weight: bold;
`;

export const StyledSelect = styled.select`
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
    color: #333;

    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

export const StyledInput = styled.input`
    width: 93%;
    padding: 0.5rem;
    font-size: 1rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #f9f9f9;

    &:focus {
        outline: none;
        border-color: #28a745;
    }
`;

/* COMPONENTES RECUPERADOS */
export const ContainerBtns = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: ${(props) => (props.size ? props.size : "23rem")};
`;

export const ListagemDeMovimentacoes = styled.ul`
    width: 70%;
    background-color: blue;
    margin: 0 auto;
`;

export const ItemListagemMovEstoque = styled.li`
    color: white;
    justify-content: space-around;
`;
