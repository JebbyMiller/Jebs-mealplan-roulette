import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { fetchMealsFromApi } from "../../api/spoonacular";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import bgImage from "../../assets/zaib-tse-KVv5lFOMY1E-unsplash.jpg";
import "./FiltersPage.css";


function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function FiltersPage() {
  const { user } = useAuth();
  const [includeIngredients, setIncludeIngredients] = useState("");
  const [excludeIngredients, setExcludeIngredients] = useState("");
  const [minCalories, setMinCalories] = useState("");
  const [maxCalories, setMaxCalories] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!user) return;

    const loadFilters = async () => {
      const ref = doc(db, "users", user.uid, "meta", "filters");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setIncludeIngredients((data.includeIngredients || []).join(", "));
        setExcludeIngredients((data.excludeIngredients || []).join(", "));
        setMinCalories(data.minCalories?.toString() || "");
        setMaxCalories(data.maxCalories?.toString() || "");
      }
    };

    loadFilters();
  }, [user]);

  const handleSaveFilters = async () => {
    if (!user) return;

    // console.log("Saving filters…", {
    //   includeIngredients,
    //   excludeIngredients,
    //   maxCalories,
    //   minCalories,
    // });

    setLoading(true);
    setStatus("");

    const ref = doc(db, "users", user.uid, "meta", "filters");
    // console.log("About to write to:", `users/${user.uid}/meta/filters`);
    try {
      await setDoc(ref, {
        includeIngredients: includeIngredients
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        excludeIngredients: excludeIngredients
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        minCalories: minCalories ? Number(minCalories) : null,
        maxCalories: maxCalories ? Number(maxCalories) : null,
        updatedAt: Date.now(),
      });

      // console.log("Save succeeded");
      setStatus("Filters saved.");
    } catch (err) {
      console.error("Save failed:", err);
      setStatus("Save failed.");
    }

    setLoading(false);
  };

  const handleGenerateMeals = async () => {
  if (!user) return;

  setLoading(true);
  setStatus("");

  const todayKey = getTodayKey();
  const todayRef = doc(db, "users", user.uid, "dailyMeals", todayKey);

  const todaySnap = await getDoc(todayRef);
  if (todaySnap.exists()) {
    setLoading(false);
    setStatus("You’ve already generated meals for today.");
    return;
  }

  const filtersRef = doc(db, "users", user.uid, "meta", "filters");
  const filtersSnap = await getDoc(filtersRef);
  const filters = filtersSnap.exists() ? filtersSnap.data() : {};

  let meals;
  try {
    meals = await fetchMealsFromApi(filters);
  } catch (err) {
    console.error("API error:", err);
    setStatus("Failed to fetch meals from Spoonacular.");
    setLoading(false);
    return;
  }

  try {
    await setDoc(todayRef, {
      generatedAt: new Date().toISOString(),
      meals,
    });
  } catch (err) {
    console.error("Failed to save meals:", err);
    setStatus("Failed to save meals.");
    setLoading(false);
    return;
  }

  setLoading(false);
  setStatus("Generated today’s meal options.");
};

  return (
    <>
      <div className="app-bg" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="filters-page">
          <Link to="/" className="menu-button">
            Back
          </Link>
          <br></br>
          <br></br>
          <h2>Filters</h2>

          <div className="filters-section">
            <label>
              Include ingredients (comma-separated)
              <input
                type="text"
                value={includeIngredients}
                onChange={(e) => setIncludeIngredients(e.target.value)}
              />
            </label>

            <label>
              Exclude ingredients (comma-separated)
              <input
                type="text"
                value={excludeIngredients}
                onChange={(e) => setExcludeIngredients(e.target.value)}
              />
            </label>

            <label>
              Min calories
              <input
                type="number"
                value={minCalories}
                onChange={(e) => setMinCalories(e.target.value)}
              />
            </label>

            <label>
              Max calories
              <input
                type="number"
                value={maxCalories}
                onChange={(e) => setMaxCalories(e.target.value)}
              />
            </label>
          </div>
          <div className="filters-actions">
            <button onClick={handleSaveFilters} disabled={loading}>
              Save Filters
            </button>
            {loading && <p>Working...</p>}
            {status && <p>{status}</p>}
            <button onClick={handleGenerateMeals} disabled={loading}>
              Generate Today's Meal Options
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
