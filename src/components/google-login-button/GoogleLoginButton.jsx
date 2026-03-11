import { signInWithGoogle } from "../../api/firebase";


export default function GoogleLoginButton() {
  const handleLogin = async () => {
  try {
    const user = await signInWithGoogle();
    // console.log("Logged in user:", user);
  } catch (error) {
    console.error("Login failed:", error);
  }
};

  return (
    <button onClick={handleLogin} data-testid="google-login-btn">
      Sign in with Google
    </button>
  );
}
