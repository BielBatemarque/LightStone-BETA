import { useContext, useState } from "react";
import { ModalComponent } from "../../components/Modal";
import { Title } from "../../components/Title";
import { FundoForm, FundoTitle } from "../Clientes/styles";
import { ScreenContext } from "../../context/screenContext";


export const CadastrarVenda = () => {
    const { screenState, dispatch } = useContext(ScreenContext);
    const [isOpen, setIsOpen] = useState(true);
  
    const toggleModal = () => {
      dispatch({ type: isOpen ? 'Closed' : 'Opening' });
      setIsOpen((prevState) => !prevState);
    };
  
    console.log(isOpen);
  
    return (
      <>
        <FundoTitle>
          <Title mt={0}>Nova Venda</Title>
        </FundoTitle>
        <FundoForm modalOpen={screenState.modalOpen}>
          <ModalComponent isOpen={isOpen} text="Deseja cadastrar um novo orçamento?" />
          <button onClick={toggleModal}>Abrir e fechar</button>
        </FundoForm>
      </>
    );
  };