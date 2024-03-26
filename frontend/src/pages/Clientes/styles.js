import styled from "styled-components";

export const StyledInput = styled.input`
    width: 30rem;
    height: 1.7rem;
    padding: 0.2rem;
    border-radius: 5px;
    border: none;
    margin-top: 1rem;
`;

export const FundoTitle = styled.div`
    background-color: rgb(42, 42, 42);
    width:95%;
    margin: 0 auto;
    text-align: center;
    height: 4rem;
    border-radius: 0px 0px 10px 10px;
    line-height: 4rem;
    color: rgb(159, 158, 158);
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    z-index: 1;
`;

export const FundoForm = styled.div`
    background-color: lightgray;
    margin-top: 0;
    width: 90%;
    margin: 0 auto;
    height: 80%;
    box-shadow: gray 3px 3px 5px;
    border-radius: 0px 0px 10px 10px;
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    align-items: center;

`;

export const StyledTextArea = styled.textarea`
    width: 30rem;
    border: none;
    border-radius: 5px;
    padding: 5px;
    margin-top: 1rem;

`;

export const FlexDiv = styled.div`
    margin: ${(props) => (props.margin ? props.margin : '0 auto')};
    display: flex;
    text-align: center;
    width: 30%;
    justify-content: space-evenly;
`;

export const FlexRow = styled.div`
    display: flex;
    margin: 0 auto;
`;