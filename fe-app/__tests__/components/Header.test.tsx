import { render, screen } from "@testing-library/react";
import { IntlProvider } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import Header from "@/components/Header";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      home: "Home",
      applications: "Applications",
    };
    return translations[key] || key;
  },
  useLocale: jest.fn(() => "en"),
  IntlProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Header Component", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/en");
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  const renderHeader = () =>
    render(
      <IntlProvider
        locale="en"
        messages={{
          home: "Home",
          applications: "Applications",
        }}
      >
        <Header />
      </IntlProvider>
    );

  test("renders the logo with a valid src", () => {
    renderHeader();
    const logo = screen.getByAltText("nesto logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", expect.stringMatching(/.png|.jpg|.svg/));
  });

  test("renders navigation links", () => {
    renderHeader();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/applications/i)).toBeInTheDocument();
  });

  test("renders language switcher with correct links", () => {
    renderHeader();
    expect(screen.getByText("En").closest("a")).toHaveAttribute("href", "/en");
    expect(screen.getByText("Fr").closest("a")).toHaveAttribute("href", "/fr");
  });

  test("preserves search query params in language switcher links", () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams("foo=bar"));
    renderHeader();
    expect(screen.getByText("En").closest("a")).toHaveAttribute("href", "/en?foo=bar");
    expect(screen.getByText("Fr").closest("a")).toHaveAttribute("href", "/fr?foo=bar");
  });
});
