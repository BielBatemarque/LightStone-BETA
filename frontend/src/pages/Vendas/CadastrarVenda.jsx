import { useContext, useState } from "react";
import { ModalComponent } from "../../components/Modal";
import { Title } from "../../components/Title";
import { FlexDiv, FlexRow, FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { ScreenContext } from "../../context/screenContext";
import { FloatLabel } from "../../components/FloatLabel";
import { Button } from "../../components/Button";
import { Linha } from './styles';


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
            <StyledForm>
              <Linha>
                <FloatLabel text="Pesquisar por cliente" />
                <Button color={'gray'}>Pesquisar</Button>
              </Linha>
            </StyledForm>
          
        </FundoForm>
      </>
    );
  };