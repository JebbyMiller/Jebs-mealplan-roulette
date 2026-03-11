import { db } from "../../api/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../../auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { resolveMeal } from "../../utils/meal-utils/meal-utils";
import { useState, useEffect } from "react";
import bgImage from "../../assets/brice-cooper-0x5DjnpHdBQ-unsplash.jpg";
import wheelImage from "../../assets/roulette-wheel-isolated.png";
import "./RoulettePage.css";


function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

async function findNextAvailableDate(user) {
  let date = new Date();
  date.setDate(date.getDate());

  while (true) {
    const key = date.toISOString().split("T")[0];
    const ref = doc(db, "users", user.uid, "dailyMeals", key);
    const snap = await getDoc(ref);

    if (!snap.exists() || !snap.data().rouletteResult) {
      return key;
    }

    date.setDate(date.getDate() + 1);
  }
}

export default function RoulettePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dailyData, setDailyData] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const todayKey = getTodayKey();
      const ref = doc(db, "users", user.uid, "dailyMeals", todayKey);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setDailyData(snap.data());
      } else {
        setDailyData(null);
      }

      setLoading(false);
    };

    load();
  }, [user]);

  if (loading) {
    return <div className="roulette-loading">Loading…</div>;
  }

  if (!dailyData) {
    return (
      <div className="roulette-empty">
        <h2>No meal options generated today</h2>
        <Link to="/filters" className="menu-button">Go to Filters</Link>
      </div>
    );
  }

  const { breakfastOptions = [], lunchOptions = [], dinnerOptions = [] } = dailyData;

  const canSpin =
    breakfastOptions.length > 0 &&
    lunchOptions.length > 0 &&
    dinnerOptions.length > 0;

  async function handleSpin() {
    if (!canSpin) return;

    const confirmed = window.confirm(
      "You only get 1 spin per day. Are you sure you want to spin?"
    );

    if (!confirmed) return;

    setSpinning(true);

    setTimeout(async () => {
        const pick = arr => arr[Math.floor(Math.random() * arr.length)];

        const breakfast = pick(breakfastOptions);
        const lunch = pick(lunchOptions);
        const dinner = pick(dinnerOptions);

        const nextDate = await findNextAvailableDate(user);

        const nextRef = doc(db, "users", user.uid, "dailyMeals", nextDate);

        await setDoc(
        nextRef,
        {
            rouletteResult: { breakfast, lunch, dinner }
        },
        { merge: true }
        );

        setResult({ breakfast, lunch, dinner, assignedDate: nextDate });
        setSpinning(false);
        setToast(`Assigned to ${nextDate}`);
        setTimeout(() => setToast(null), 3000);
    }, 3000);
  }

    const breakfastMeal = resolveMeal(result?.breakfast, breakfastOptions);
    const lunchMeal = resolveMeal(result?.lunch, lunchOptions);
    const dinnerMeal = resolveMeal(result?.dinner, dinnerOptions);

    return (
        <>
            <div className="app-bg" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="app-screen">
                    {toast && (
                        <div className="toast">
                            {toast}
                        </div>
                    )}
                    <div className="private-layout-inner roulette-container">

                    <Link to="/" className="menu-button">Back</Link>

                    <h2 className="roulette-title">Spin the Meal Roulette!</h2>

                    {!canSpin && (
                        <div className="roulette-warning">
                        You must have at least 1 breakfast, lunch, and dinner option.
                        <br />
                        <Link to="/filters" className="menu-button">Go to Filters</Link>
                        </div>
                    )}

                    <div className={`roulette-wheel ${spinning ? "spinning" : ""}`}>
                        <img src={wheelImage} alt="Roulette Wheel" />
                    </div>
                    {result && (
                        <div className="roulette-result">
                            <h2>Today's Picks</h2>
                            <p>Breakfast: {breakfastMeal?.title}</p>
                            <p>Lunch: {lunchMeal?.title}</p>
                            <p>Dinner: {dinnerMeal?.title}</p>

                            {result.assignedDate && (
                                <button
                                    className="menu-button"
                                    onClick={() => navigate(`/calendar?date=${result.assignedDate}`)}
                                >
                                    View Assigned Meals
                                </button>
                            )}
                        </div>
                    )}

                    <button
                        className="spin-button"
                        disabled={!canSpin || spinning}
                        onClick={handleSpin}
                    >
                        {spinning ? "Spinning…" : "Spin the Wheel"}
                    </button>

                    </div>
                </div>
            </div>
        </>
    );
}
