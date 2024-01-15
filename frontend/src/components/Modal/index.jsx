import { useState } from "react";
import { ModalDiv } from "./styles";

export const Modal = ({text, type, isOpen}) => {
    return(
        <ModalDiv isOpen={isOpen}>
            {text}
        </ModalDiv>
    );
}