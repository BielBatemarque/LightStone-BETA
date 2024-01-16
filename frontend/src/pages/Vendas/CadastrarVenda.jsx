import { useState } from "react";
import { Modal } from "../../components/Modal";
import { Title } from "../../components/Title";

export const CadastrarVenda = () => {
    const [isOpen, setIsOpen] = useState(true);
    console.log(isOpen);
    return(
        <>
            <Title>Nova Venda</Title>
            <Modal  isOpen={isOpen} text="Deseja cadastrar um novo orçamento?"/>

            <button onClick={() => setIsOpen(s => !s)}>abrir e fechar</button>
        </>
    );
};