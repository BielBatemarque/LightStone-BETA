import { StyledH1 } from "./styles";

export const Title = ({ children, color }) => {
    return(
        <StyledH1 color={color}>{children}</StyledH1>
    );
};