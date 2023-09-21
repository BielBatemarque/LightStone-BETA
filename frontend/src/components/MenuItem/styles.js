import styled from "styled-components";
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
    color: rgb(159, 158, 158);
    text-decoration: none;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-left: 55px;
    width: 75%;

    &:hover{
        background-color:  rgb(95, 95, 95);
    }
`;