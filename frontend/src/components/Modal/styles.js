import styled from "styled-components";

export const ModalDiv = styled.div`
    background-color: red;
    width: 30%;
    height: 35%;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;