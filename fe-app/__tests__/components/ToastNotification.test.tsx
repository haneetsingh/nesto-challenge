import { render } from "@testing-library/react";
import { toast } from "react-toastify";
import ToastNotification, { showToast } from "@/components/ToastNotification";

jest.mock("react-toastify", () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

describe("ToastNotification Component", () => {
  test("renders ToastContainer correctly", () => {
    const { getByTestId } = render(<ToastNotification />);
    expect(getByTestId("toast-container")).toBeInTheDocument();
  });

  test("calls toast.success when showToast is called with success", () => {
    showToast("Success message", "success");
    expect(toast.success).toHaveBeenCalledWith("Success message");
  });

  test("calls toast.error when showToast is called with error", () => {
    showToast("Error message", "error");
    expect(toast.error).toHaveBeenCalledWith("Error message");
  });

  test("calls toast.info when showToast is called with info", () => {
    showToast("Info message", "info");
    expect(toast.info).toHaveBeenCalledWith("Info message");
  });

  test("defaults to toast.success when type is not provided", () => {
    showToast("Default success message");
    expect(toast.success).toHaveBeenCalledWith("Default success message");
  });
});
