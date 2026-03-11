import { useAuth } from "../../auth/useAuth";
import DashboardMenu from "../../components/dashboard-menu/DashboardMenu";
import bgImage from "../../assets/anna-pelzer-IGfIGP5ONV0-unsplash.jpg";
import "./HomePage.css";


export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home-bg" style={{ backgroundImage: `url(${bgImage})` }}>
      <h2 className="welcome-text">Welcome, {user?.displayName}!</h2>
      <DashboardMenu />
    </div>
  );
}
