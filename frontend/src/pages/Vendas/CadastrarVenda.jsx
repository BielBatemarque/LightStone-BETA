import { useState } from "react";
import { Modal } from "../../components/Modal";
import { Title } from "../../components/Title";
import { FundoForm, FundoTitle } from "../Clientes/styles";

export const CadastrarVenda = () => {
    const [isOpen, setIsOpen] = useState(true);
    console.log(isOpen);
    return(
        <>
            <FundoTitle>
                <Title mt={0}>Nova Venda</Title>
            </FundoTitle>
            <FundoForm>
                <Modal  isOpen={isOpen} text="Deseja cadastrar um novo orçamento?"/>

                <button onClick={() => setIsOpen(s => !s)}>abrir e fechar</button>
            </FundoForm>
        </>
    );
};