import { Product } from "../types";
import styled from "styled-components";
import Button from "./Button";

interface ProductCardProps {
  product: Product;
  onSelect?: () => void;
  isSelected?: boolean;
}

export default function ProductCard({ product, onSelect, isSelected }: ProductCardProps) {
  return (
    <Card>
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
`;

const Name = styled.p`
  font-size: 14px;
  color: #666;
`;

const Rate = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
`;

const Lender = styled.p`
  font-size: 14px;
  color: #888;
`;

const Label = styled.p`
  font-size: 14px;
  color: #888;
`;
