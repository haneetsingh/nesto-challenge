import { HTMLAttributes, ReactNode } from "react";
import { styled } from "styled-components";

interface MessageProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export default function Message({ children }: MessageProps) {
  return <StyledMessage>{children}</StyledMessage>;
}

const StyledMessage = styled.p`
  text-align: center;
  font-size: 16px;
  color: #666;
  margin: 2rem 0;
`;
