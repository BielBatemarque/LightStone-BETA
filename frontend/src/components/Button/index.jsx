import { StyledButton } from "./styles";

export const Button = ({children, icon, action}) => {
    return(
        <StyledButton onClick={action}>{icon}{children}</StyledButton>
    );
};