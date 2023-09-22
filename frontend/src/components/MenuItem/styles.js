import styled from "styled-components";
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
    color: rgb(159, 158, 158);
    text-decoration: none;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-left: 55px;
    width: 70%;
    padding: 3px;
    margin-top: 2px;
    height: 2.1rem;
    padding-top: 6px;
    border-radius: 5px;
    padding-left:15px;
    padding-bottom:6px;

    &:hover{
        background-color:  rgb(68, 68, 68);
        color: yellowgreen;
        transition: 0.4s;
    }
`;