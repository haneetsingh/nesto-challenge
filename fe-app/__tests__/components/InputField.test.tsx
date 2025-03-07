import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "@/components/InputField";
import "jest-styled-components";

const mockTranslations = {
  username: "Username",
};

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = mockTranslations;
    return translations[key] || key;
  },
}));

describe("InputField Component", () => {
  test("renders input field with label", () => {
    render(
      <InputField
        label="username"
        name="username"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  test("calls onChange when typing", () => {
    const handleChange = jest.fn();
    render(
      <InputField
        label="username"
        name="username"
        value=""
        onChange={handleChange}
      />
    );
    const input = screen.getByLabelText("Username");
    fireEvent.change(input, { target: { value: "JohnDoe" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("displays an error message and applies error styles", () => {
    const { container } = render(
      <InputField
        label="username"
        name="username"
        value=""
        onChange={() => {}}
        errorMessage="Required field"
      />
    );
    expect(screen.getByText("Required field")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText("Username")).toHaveStyleRule("border", "1px solid red");
  });
});
