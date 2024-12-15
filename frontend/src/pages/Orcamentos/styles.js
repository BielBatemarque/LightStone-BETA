import styled from "styled-components";


export const FlexDivFooter = styled.div`
    display: flex;
    text-align: center;
    width: 100%;
    justify-content: space-evenly;
    margin-bottom: 0px;
`;

export const FormLinePecas = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

export const FormContainer = styled.div`
  width: 50%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const Title = styled.h2`
  margin: 0px 0 20px 0;
  text-align: center;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

export const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color:rgb(76, 83, 175);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #45a049;
  }
`;