import { StyledBtnFilter, StyledInputFilter } from './/styles';
import { CiFilter } from "react-icons/ci";
import { FlexDiv } from '../../pages/Clientes/styles';

export const Filtro = ({ lista, text }) => {
    return(
        <FlexDiv>
            <StyledInputFilter placeholder={text} /> <StyledBtnFilter><CiFilter /></StyledBtnFilter>
        </FlexDiv>
    );
};