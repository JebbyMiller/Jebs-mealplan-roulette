export function resolveMeal(mealId, options = []) {
  if (!mealId || !options) return null;

  const idStr = String(mealId);

  return options.find((m) => {
    if (!m) return false;

    const optionId =
      m.id ??
      m.mealId ??
      m.recipeId ??
      m.spoonacularId ??
      m?.recipe?.id ??
      m?.meal?.id;

    return String(optionId) === idStr;
  });
}
