import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import GoogleLoginButton from "../../components/google-login-button/GoogleLoginButton";


vi.mock("../../api/firebase", () => ({
  signInWithGoogle: vi.fn().mockResolvedValue({ user: { uid: "test-user" } }),
}));

describe("GoogleLoginButton", () => {
  it("calls signInWithGoogle when clicked", async () => {
    const { signInWithGoogle } = await import("../../api/firebase");

    render(<GoogleLoginButton />);

    const button = screen.getByTestId("google-login-btn");
    fireEvent.click(button);

    expect(signInWithGoogle).toHaveBeenCalledTimes(1);
  });
});
