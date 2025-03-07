import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import "jest-styled-components";
import { Product } from "@/types";

const mockProduct: Product = {
  name: "Sample Product",
  bestRate: 3.5,
  lenderName: "Best Lender",
  lenderType: "Bank",
  type: "FIXED",
  id: 0,
  family: "VALUE_FLEX",
  term: "1_YEAR",
  insurable: false,
  insurance: "INSURED",
  prepaymentOption: "STANDARD",
  restrictionsOption: "NO_RESTRICTIONS",
  restrictions: "",
  fixedPenaltySpread: "",
  helocOption: "HELOC_WITH",
  helocDelta: 0,
  rateHold: "30_DAYS",
  rate: 0,
  ratePrimeVariance: 0,
  created: "",
  updated: ""
};

const mockTranslations = {
  best_fix: "Best Fix",
  best_variable: "Best Variable",
  best_rate: "Best Rate",
  select_product: "Select this Product",
  product_selected: "Product Selected",
};

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = mockTranslations;
    return translations[key] || key;
  },
}));

describe("ProductCard Component", () => {
  test("renders product details correctly", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Best Fix")).toBeInTheDocument();
    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(screen.getByText("3.5%")).toBeInTheDocument();
    expect(screen.getByText("(Best Rate)")).toBeInTheDocument();
    expect(screen.getByText("Best Lender")).toBeInTheDocument();
    expect(screen.getByText("(Bank)")).toBeInTheDocument();
  });

  test("renders correct title based on product type", () => {
    const { rerender } = render(<ProductCard product={{ ...mockProduct, type: "FIXED" }} />);
    expect(screen.getByText("Best Fix")).toBeInTheDocument();

    rerender(<ProductCard product={{ ...mockProduct, type: "VARIABLE" }} />);
    expect(screen.getByText("Best Variable")).toBeInTheDocument();
  });

  test("calls onSelect when button is clicked", () => {
    const handleSelect = jest.fn();
    render(<ProductCard product={mockProduct} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText("Select this Product"));
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  test("does not show select button when product is selected", () => {
    render(<ProductCard product={mockProduct} isSelected />);
    expect(screen.queryByText("Select this Product")).toBeNull();
  });

  test("applies custom styles via css prop", () => {
    const { container } = render(
      <ProductCard product={mockProduct} css={`background-color: pink; border: 2px solid green;`} />
    );
    const card = container.firstChild;
    expect(card).toHaveStyleRule("background-color", "pink");
    expect(card).toHaveStyleRule("border", "2px solid green");
  });
});
