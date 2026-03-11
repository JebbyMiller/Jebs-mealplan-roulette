import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import bgImage from "../../assets/dan-gold-4_jhDO54BYg-unsplash.jpg";
import MealCard from "./meal-card/MealCard";
import MealDetail from "./meal-detail/MealDetail";
import "./MealOptions.css";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

export default function MealOptionsPage() {
  const { user } = useAuth();
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState({});
  const [activeMeal, setActiveMeal] = useState(null);

  function handleToggle(mealId, type) {
    setSelectedMeals(prev => {
      const current = prev[mealId] || {
        breakfast: false,
        lunch: false,
        dinner: false
      };

      return {
        ...prev,
        [mealId]: {
          ...current,
          [type]: !current[type]
        }
      };
    });
  }

  async function saveSelections() {
    // console.log("Saving selections:", selectedMeals);

    const breakfast = [];
    const lunch = [];
    const dinner = [];

    for (const [mealId, types] of Object.entries(selectedMeals)) {
      if (types.breakfast) breakfast.push(mealId);
      if (types.lunch) lunch.push(mealId);
      if (types.dinner) dinner.push(mealId);

      const meal = meals.find(m => m.id === Number(mealId));
      // console.log("Saving meal:", mealId, meal);

      if (meal) {
        const mealRef = doc(db, "users", user.uid, "savedMeals", mealId);
        await setDoc(mealRef, meal, { merge: true });
      }
    }

    const todayKey = getTodayKey();
    const ref = doc(db, "users", user.uid, "dailyMeals", todayKey);

    await updateDoc(ref, {
      selected: selectedMeals,
      breakfastOptions: breakfast,
      lunchOptions: lunch,
      dinnerOptions: dinner
    });

    // console.log("Saved to Firestore!");
    setSaved(true);
    setTimeout(() => setSaved(false), 4500);
  }

  useEffect(() => {
    if (!user) return;

    const loadMeals = async () => {
      const todayKey = getTodayKey();
      const ref = doc(db, "users", user.uid, "dailyMeals", todayKey);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setMeals(data.meals);
        setSelectedMeals(data.selected || {});
      } else {
        setMeals([]);
        setSelectedMeals({});
      }

      setLoading(false);
    };

    loadMeals();
  }, [user]);

  if (loading) {
    return <div className="meal-options-loading">Loading meals…</div>;
  }

  if (!meals || meals.length === 0) {
    return (
      <div className="home-bg" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="meal-options-empty">
          <h2 className="no-meals-banner">No meals generated today</h2>
          <Link to="/filters" className="menu-button">Go to the Filters page and generate today’s meal options!</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="home-bg" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="meal-options-container">
        <Link to="/" className="menu-button">Back</Link>

        <h1 className="meal-options-title">Today’s Meals</h1>

        <div className="meal-options-grid">
          {meals.map(meal => (
            <MealCard
              key={meal.id}
              meal={meal}
              selectedTypes={selectedMeals[meal.id] || {}}
              onToggle={handleToggle}
              onOpenDetail={() => setActiveMeal(meal)}
            />
          ))}
        </div>

        {activeMeal && (
          <MealDetail meal={activeMeal} onClose={() => setActiveMeal(null)} />
        )}
        <br></br>
        <br></br>
        <button className="save-button" onClick={saveSelections}>
          Save Meal Options
        </button>
        {saved && <div className="save-confirmation">Saved!</div>}
      </div>
    </div>
  );
}
