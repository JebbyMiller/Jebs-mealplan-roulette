import { render, screen } from "@testing-library/react";
import LoginPage from "../../pages/LoginPage";
import { describe, it, expect } from "vitest";


vi.mock("firebase/app");
vi.mock("firebase/auth");

describe("LoginPage", () => {
  it("renders login button", () => {
    render(<LoginPage />);
    expect(screen.getByTestId("google-login-btn")).toBeInTheDocument();
  });
});
