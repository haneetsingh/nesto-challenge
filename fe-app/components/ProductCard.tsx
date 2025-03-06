import { HTMLAttributes } from "react";
import styled from "styled-components";
import Button from "./Button";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onSelect?: () => void;
  isSelected?: boolean;
}

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
  onSelect?: () => void;
  isSelected?: boolean;
}

export default function ProductCard({ product, onSelect, isSelected, ...rest }: ProductCardProps) {
  return (
    <Card {...rest}>
      <Title>
        {isSelected
          ? "Product Selected"
          : product.type === "FIXED"
            ? "Best Fix"
            : "Best Variable"
        }
      </Title>
      <Name>{product.name}</Name>
      <Rate>{product.bestRate}%</Rate>
      <Label>(Best Rate)</Label>
      <Lender>{product.lenderName}</Lender>
      <Label>({product.lenderType})</Label>
      {!isSelected
        ? <Button
          variant="primary"
          onClick={onSelect}
          style={{ marginTop: 32 }}
        >
          Select this product
        </Button>
        : null
      }
    </Card>
  );
}

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;

const Name = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const Rate = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin-top: 24px;
`;

const Lender = styled.p`
  font-size: 14px;
  color: #888;
  margin-top: 24px;
`;

const Label = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 16px;
`;
