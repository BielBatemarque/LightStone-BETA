import { StyledInput, StyledLabel, StyledDiv } from './styles';

export const FloatLabel = ({ text, onChange, value, name, type, size}) => {
    return(
        <StyledDiv>
            <StyledInput type={type} placeholder=" " onChange={onChange} value={value} name={name} size={size} />
            <StyledLabel>{text}</StyledLabel>
        </StyledDiv>
    );
};