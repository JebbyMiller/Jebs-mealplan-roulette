import "./MealDetail.css";

export default function MealDetail({ meal, onClose }) {
  if (!meal) return null;

  return (
    <div className="meal-detail-overlay" onClick={onClose}>
      <div className="meal-detail-panel" onClick={(e) => e.stopPropagation()}>
        <button className="meal-detail-close" onClick={onClose}>
          ✕
        </button>

        <div className="meal-detail-content">
            <img src={meal.image} alt={meal.title} className="meal-detail-image" />

            <h2 className="meal-detail-title">{meal.title}</h2>

            {meal.summary && (
            <p
                className="meal-detail-summary"
                dangerouslySetInnerHTML={{ __html: meal.summary }}
            />
            )}

            <h3>Ingredients</h3>
            <ul className="meal-detail-ingredients">
            {meal.extendedIngredients?.map((ing) => (
                <li key={ing.id}>{ing.original}</li>
            ))}
            </ul>

            <h3>Instructions</h3>
            <div className="meal-detail-instructions">
            {meal.analyzedInstructions?.[0]?.steps?.map((step) => (
                <p key={step.number}>
                <strong>{step.number}.</strong> {step.step}
                </p>
            )) || <p>No instructions available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
