import { StyledButton } from "./styles";

export const Button = ({children, icon, action, color }) => {
    return(
        <StyledButton onClick={action} color={color}>{icon}{children}</StyledButton>
    );
};