import { StyledLink } from './styles';

export const MenuItem = ({ text, linkTo, icon }) => {
    return(
        <StyledLink to={linkTo}>{icon} {text}</StyledLink>
    );
};