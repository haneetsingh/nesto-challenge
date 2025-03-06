import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import styled, { css as styledCss, CSSProp } from "styled-components";
import Button from "./Button";
import { Product } from "../types";

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
  onSelect?: () => void;
  isSelected?: boolean;
  css?: CSSProp;
}

export default function ProductCard({ product, onSelect, isSelected, css, ...rest }: ProductCardProps) {
  const t = useTranslations();

  return (
    <Card css={css} {...rest}>
      <Title>
        {isSelected
          ? "Product Selected"
          : product.type === "FIXED"
            ? t("bestFix")
            : t("bestVariable")
        }
      </Title>
      <Name>{product.name}</Name>
      <Rate>{product.bestRate}%</Rate>
      <Label>({t("bestRate")})</Label>
      <Lender>{product.lenderName}</Lender>
      <Label>({product.lenderType})</Label>
      {!isSelected
        ? <Button
          variant="primary"
          onClick={onSelect}
          style={{ marginTop: 32 }}
        >
          {t("selectProduct")}
        </Button>
        : null
      }
    </Card>
  );
}

const Card = styled.div<{ css?: CSSProp }>`
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

  ${({ css }) => css && styledCss`${css}`}
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
