import styled from "styled-components";
import { lighten } from 'polished';

export const FundoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px 20;
`;

export const FundoForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 40px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  gap: 15px;
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledButton = styled.button`
  background-color: ${({ color }) => color || '#007BFF'};
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ color }) => color ? lighten(0.1, color) : '#0056b3'};
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export const StyledInput = styled.input`
  width: ${({ size }) => (size ? `${size}%` : '100%')};
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #007BFF;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;
