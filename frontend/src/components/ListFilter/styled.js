import styled  from "styled-components";

export const Flex = styled.div`
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 0.5rem;
    width: 94%;
    margin: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 15px auto;

    input {
        flex: 1;
        border: none;
        outline: none;
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 8px;
        margin-right: 0.5rem;
    }

    button {
        background-color:  rgb(42, 42, 42);
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;

        &:hover {
            background-color: #0056b3;
        }
    }
`;