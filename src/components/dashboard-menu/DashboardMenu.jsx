import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase";
import "./DashboardMenu.css";


export default function DashboardMenu() {
  return (
    <div className="dashboard-menu">
      <Link to="/filters" className="menu-button">Filters</Link>
      <Link to="/meal-options" className="menu-button">Meal Option Selections</Link>
      <Link to="/roulette" className="menu-button">Spin Roulette</Link>
      <Link to="/calendar" className="menu-button">Calendar</Link>
      <br></br>
      <br></br>
      <Link to="/attribution" className="menu-button">Attributions</Link>

      <button className="menu-button signout" onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  );
}
