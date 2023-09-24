import styled from 'styled-components';

export const SideBarDiv = styled.div`
    background-color: rgb(42, 42, 42);
    width: 500px;
    display: flex;
    flex-direction: column;
`;

export const StyledCOllum = styled.div`
    display: flex;
    flex-direction: column;
`;

export const LogoutButton = styled.button`
    order: 1; /* Assign a lower order value to move it to the bottom */
    margin-top: auto; /* To push the button to the bottom */
`;
