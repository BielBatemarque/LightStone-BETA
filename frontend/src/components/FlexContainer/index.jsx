import { FlexDiv } from "./styles";

export const FlexCointainer = ({ children, pontas, size }) => {
    return(
        <FlexDiv pontas={pontas} size={size}>{children}</FlexDiv>
    );
}