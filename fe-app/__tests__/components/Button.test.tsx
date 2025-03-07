import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/Button";
import "jest-styled-components";

describe("Button component", () => {
  test("renders button with children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies correct non-hover styles for primary variant", () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toHaveStyleRule("background-color", "#007bff");
  });

  test("applies correct hover styles for primary variant", () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    if (container.firstChild) {
      fireEvent.mouseEnter(container.firstChild);
      expect(container.firstChild).toHaveStyleRule("background-color", "#0056b3", {
        modifier: ":hover"
      });
    }
  });

  test("applies correct non-hover styles for secondary variant", () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild).toHaveStyleRule("background-color", "#f8f9fa");
    expect(container.firstChild).toHaveStyleRule("color", "#333");
    expect(container.firstChild).toHaveStyleRule("border", "1px solid #ccc");
  });

  test("applies correct hover styles for secondary variant", () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    if (container.firstChild) {
      fireEvent.mouseEnter(container.firstChild);
      expect(container.firstChild).toHaveStyleRule("background-color", "#e2e6ea", {
        modifier: ":hover"
      });
    }
  });

  test("applies correct non-hover styles for submit variant", () => {
    const { container } = render(<Button variant="submit">Submit</Button>);
    expect(container.firstChild).toHaveStyleRule("background-color", "#28a745");
  });

  test("applies correct hover styles for submit variant", () => {
    const { container } = render(<Button variant="submit">Submit</Button>);
    if (container.firstChild) {
      fireEvent.mouseEnter(container.firstChild);
      expect(container.firstChild).toHaveStyleRule("background-color", "#218838", {
        modifier: ":hover"
      });
    }
  });
});