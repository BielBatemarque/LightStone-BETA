import styled from 'styled-components';

export const FlexDiv = styled.div`
    display: flex;
    justify-content: ${(props) => (props.pontas ? 'space-between' : 'initial')};
    width: ${(props) => (props.size ? props.size : null)};
    background-color: red;
`;