export const auth = {};
export const db = {};
export const provider = {};
export const signInWithGoogle = vi.fn(() =>
  Promise.resolve({ uid: "test-user", displayName: "Test User" })
);
