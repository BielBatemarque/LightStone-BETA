import { ModalDiv } from "./styles";

export const Modal = ({text, isOpen}) => {
    return(
        <ModalDiv isOpen={isOpen}>
            {text}
        </ModalDiv>
    );
}