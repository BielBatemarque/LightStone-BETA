import styled from "styled-components";

export const ContainerBtns = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: ${(props) => (props.size? props.size : '23rem')};
`;

export const ListagemDeMovimentacoes = styled.ul`
    width:70%;
    background-color: blue;
    margin: 0 auto;
    
`;

export const ItemListagemMovEstoque = styled.li`
    color: white;
    justify-content: space-around;
    
`;