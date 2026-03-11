import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import GoogleLoginButton from "../../components/google-login-button/GoogleLoginButton";
import bgImage from "../../assets/jonas-kakaroto-5JQH9Iqnm9o-unsplash.jpg";
import PublicLayout from "../../layouts/public-layout/PublicLayout";
import "./LoginPage.css";

export default function LoginPage() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (user) return <Navigate to="/" replace />;

  return (
  <PublicLayout>
    <div className="app-bg" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="login-content">
        <h2 className="welcome-text">Jeb's Mealplan Roulette!</h2>
        <br></br>
        <br></br>
        <GoogleLoginButton />
      </div>
    </div>
  </PublicLayout>
  );
}
