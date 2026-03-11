const memoryCache = new Map();

function buildCacheKey(filters) {
  return JSON.stringify(filters);
}

export async function fetchMealsFromApi(filters) {
  const cacheKey = buildCacheKey(filters);

  if (memoryCache.has(cacheKey)) {
    // console.log("Returning meals from memory cache");
    return memoryCache.get(cacheKey);
  }

  const params = new URLSearchParams({
    apiKey: import.meta.env.VITE_SPOONACULAR_KEY,
    number: 6,
    addRecipeNutrition: true,
  });

  if (filters.includeIngredients?.length) {
    params.append("includeIngredients", filters.includeIngredients.join(","));
  }

  if (filters.excludeIngredients?.length) {
    params.append("excludeIngredients", filters.excludeIngredients.join(","));
  }

  if (filters.minCalories) params.append("minCalories", filters.minCalories);
  if (filters.maxCalories) params.append("maxCalories", filters.maxCalories);

  const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;

  // console.log("Calling Spoonacular complexSearch:", searchUrl);

  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) throw new Error("complexSearch failed");

  const searchData = await searchRes.json();

  const ids = searchData.results.map((r) => r.id);
  if (ids.length === 0) return [];

  const bulkUrl = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${
    import.meta.env.VITE_SPOONACULAR_KEY
  }&ids=${ids.join(",")}`;

  // console.log("Calling Spoonacular informationBulk:", bulkUrl);

  const bulkRes = await fetch(bulkUrl);
  if (!bulkRes.ok) throw new Error("informationBulk failed");

  const fullRecipes = await bulkRes.json();

  memoryCache.set(cacheKey, fullRecipes);
  return fullRecipes;
}
