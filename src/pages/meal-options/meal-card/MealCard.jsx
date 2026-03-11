import "./MealCard.css";

export default function MealCard({ meal, selectedTypes, onToggle, onOpenDetail }) {
  const calories = meal?.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount;

  return (
    <div className="meal-card" onClick={onOpenDetail}>
      <img src={meal.image} alt={meal.title} className="meal-card-image" />

      <div className="meal-card-body">
        <h3 className="meal-card-title">{meal.title}</h3>

        {calories && <p className="meal-card-calories">{calories} cal</p>}

        {/* B / L / D toggles */}
        <div className="meal-card-toggles" onClick={(e) => e.stopPropagation()}>
          <button
            className={selectedTypes.breakfast ? "active" : ""}
            onClick={() => onToggle(meal.id, "breakfast")}
            title="Breakfast"
          >
            B
          </button>

          <button
            className={selectedTypes.lunch ? "active" : ""}
            onClick={() => onToggle(meal.id, "lunch")}
            title="Lunch"
          >
            L
          </button>

          <button
            className={selectedTypes.dinner ? "active" : ""}
            onClick={() => onToggle(meal.id, "dinner")}
            title="Dinner"
          >
            D
          </button>
        </div>
      </div>
    </div>
  );
}
