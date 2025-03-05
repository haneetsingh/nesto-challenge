import styled from "styled-components";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "submit";
}

export default function Button({ children, onClick, variant = "primary" }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ variant: "primary" | "secondary" | "submit"; display?: boolean }>`
  width: ${({ display }) => (display ? "100%" : "auto")};
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          background-color: #007bff;
          color: white;

          &:hover {
            background-color: #0056b3;
          }
        `;
      case "secondary":
        return `
          background-color: #f8f9fa;
          color: #333;
          border: 1px solid #ccc;

          &:hover {
            background-color: #e2e6ea;
          }
        `;
      case "submit":
        return `
          background-color: #28a745;
          color: white;

          &:hover {
            background-color: #218838;
          }
        `;
      default:
        return "";
    }
  }}
`;
