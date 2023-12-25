import { StyledInput, StyledLabel, StyledDiv } from './styles';

export const InputLabel = ({ text, onChange, value, name, type}) => {
    return(
        <StyledDiv>
            <StyledInput type={type} placeholder=" " onChange={onChange} value={value} name={name}/>
            <StyledLabel>{text}</StyledLabel>
        </StyledDiv>
    );
};