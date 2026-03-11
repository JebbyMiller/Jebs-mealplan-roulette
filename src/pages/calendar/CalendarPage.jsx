import { db } from "../../api/firebase";
import { doc, getDoc, collection } from "firebase/firestore";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useState, useEffect } from "react";
import bgImage from "../../assets/road-ahead-r1CDF8HXgJY-unsplash.jpg";
import "./CalendarPage.css";

export default function CalendarPage() {
  const { user } = useAuth();
  const [assignedDays, setAssignedDays] = useState({});
  const [dayData, setDayData] = useState(null);
  const [fullMeals, setFullMeals] = useState(null);

  const [params] = useSearchParams();
  const initialDate = params.get("date") || new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(initialDate);

  function getNextEightDays() {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 8; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d.toLocaleDateString("en-CA")); // local YYYY-MM-DD
    }

    return days;
  }

  const next8Days = getNextEightDays();

  useEffect(() => {
    if (!user || !selectedDate) return;

    const load = async () => {
      const ref = doc(db, "users", user.uid, "dailyMeals", selectedDate);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setDayData(snap.data());
      } else {
        setDayData(null);
      }
    };

    load();
  }, [user, selectedDate]);

  useEffect(() => {
    if (!user) return;

    const loadAssigned = async () => {
      const colRef = collection(db, "users", user.uid, "dailyMeals");
      const results = {};

      for (const day of next8Days) {
        const ref = doc(colRef, day);
        const snap = await getDoc(ref);
        if (snap.exists() && snap.data().rouletteResult) {
          results[day] = true;
        }
      }

      setAssignedDays(results);
    };

    loadAssigned();
  }, [user]);

  useEffect(() => {
    if (!user || !dayData?.rouletteResult) return;

    const loadFullMeals = async () => {
      const { breakfast, lunch, dinner } = dayData.rouletteResult;

      const mealIds = [breakfast, lunch, dinner];
      const results = {};

      for (const id of mealIds) {
        const ref = doc(db, "users", user.uid, "savedMeals", String(id));
        const snap = await getDoc(ref);
        if (snap.exists()) {
          results[id] = snap.data();
        }
      }

      setFullMeals(results);
    };

    loadFullMeals();
  }, [user, dayData]);

  let breakfastMeal = null;
  let lunchMeal = null;
  let dinnerMeal = null;

  if (fullMeals && dayData?.rouletteResult) {
    breakfastMeal = fullMeals[dayData.rouletteResult.breakfast];
    lunchMeal = fullMeals[dayData.rouletteResult.lunch];
    dinnerMeal = fullMeals[dayData.rouletteResult.dinner];
  }

  return (
    <div className="app-bg" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="app-screen">
        <div className="private-layout-inner calendar-container">

          <Link to="/" className="menu-button">Back</Link>

          <h2 className="calendar-title">Upcoming Meals (Next 7 Days)</h2>

          <div className="calendar-grid-8day">
            {next8Days.map(dateKey => (
              <div
                key={dateKey}
                className={`calendar-cell
                  ${dateKey === selectedDate ? "selected" : ""}
                  ${assignedDays[dateKey] ? "has-meals" : "no-meals"}
                `}
                onClick={() => setSelectedDate(dateKey)}
              >
                <div className="calendar-date">{dateKey}</div>
              </div>
            ))}
          </div>

          <h3 className="day-title">Meals for {selectedDate}</h3>

          {!dayData && (
            <p className="calendar-empty">No meals assigned for this date.</p>
          )}

          {dayData?.rouletteResult && fullMeals && (
            <div className="calendar-meals">

              <div className="meal-row">
                <div className="meal-row-inner">
                  <span>
                    <strong>Breakfast:<br /></strong> {breakfastMeal?.title}
                  </span>
                  {breakfastMeal?.sourceUrl && (
                    <a
                      href={breakfastMeal.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="meal-link"
                    >
                      <br />
                      View Instructions
                    </a>
                  )}
                </div>
              </div>

              <div className="meal-row">
                <div className="meal-row-inner">
                  <span>
                    <strong>Lunch:<br /></strong> {lunchMeal?.title}
                  </span>
                  {lunchMeal?.sourceUrl && (
                    <a
                      href={lunchMeal.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="meal-link"
                    >
                      <br />
                      View Instructions
                    </a>
                  )}
                </div>
              </div>

              <div className="meal-row">
                <div className="meal-row-inner">
                  <span>
                    <strong>Dinner:<br /></strong> {dinnerMeal?.title}
                  </span>
                  {dinnerMeal?.sourceUrl && (
                    <a
                      href={dinnerMeal.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="meal-link"
                    >
                      <br />
                      View Instructions
                    </a>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
