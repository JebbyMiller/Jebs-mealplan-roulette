import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../auth/AuthProvider";
import { useAuth } from "../../auth/useAuth";


vi.mock("firebase/auth", async () => {
  const actual = await vi.importActual("firebase/auth");

  return {
    ...actual,
    onAuthStateChanged: vi.fn((auth, callback) => {
      callback({ uid: "123", displayName: "Test User" });
      return () => {};
    }),
  };
});

vi.mock("../../api/firebase", () => ({
  auth: {},
}));

function TestConsumer() {
  const { user, loading } = useAuth();
  return (
    <div>
      <div data-testid="loading">{loading ? "true" : "false"}</div>
      <div data-testid="user">{user?.displayName || "none"}</div>
    </div>
  );
}

describe("AuthProvider", () => {
  it("validates user and loading states", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("user").textContent).toBe("Test User");
  });
});
