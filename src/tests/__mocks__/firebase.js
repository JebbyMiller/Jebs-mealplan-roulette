export const initializeApp = vi.fn(() => ({}));

export const getAuth = vi.fn(() => ({
  currentUser: null
}));

export const GoogleAuthProvider = vi.fn();

export const signInWithPopup = vi.fn(() =>
  Promise.resolve({
    user: { uid: "test-user", displayName: "Test User" }
  })
);
