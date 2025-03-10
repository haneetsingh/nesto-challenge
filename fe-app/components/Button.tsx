import styled from "styled-components";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "submit";
  block?: string;
  style?: React.CSSProperties;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  block = "false",
  style,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      block={block}
      style={style}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  variant: "primary" | "secondary" | "submit";
  block?: string;
}>`
  width: ${({ block }) => (block === "true" ? "100%" : "auto")};
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  background-color: #0056b3;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s ease;

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          background-color: #007bff;

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

          &:hover {
            background-color: #218838;
          }
        `;
      default:
        return "";
    }
  }}
`;
