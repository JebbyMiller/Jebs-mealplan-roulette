const STORAGE_KEY = "mealProfiles";

export function loadMealProfiles() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function saveMealProfiles(profiles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

export function createMealProfile(name, description = "") {
  const profiles = loadMealProfiles();

  if (profiles[name]) {
    throw new Error("Profile already exists");
  }

  profiles[name] = {
    description,
    createdAt: new Date().toISOString(),
    meals: []
  };

  saveMealProfiles(profiles);
}

export function addMealToProfile(profileName, mealId) {
  const profiles = loadMealProfiles();

  if (!profiles[profileName]) {
    throw new Error("Profile does not exist");
  }

  if (!profiles[profileName].meals.includes(mealId)) {
    profiles[profileName].meals.push(mealId);
  }

  saveMealProfiles(profiles);
}

export function removeMealFromProfile(profileName, mealId) {
  const profiles = loadMealProfiles();

  if (!profiles[profileName]) return;

  profiles[profileName].meals = profiles[profileName].meals.filter(
    (id) => id !== mealId
  );

  saveMealProfiles(profiles);
}

export function deleteMealProfile(profileName) {
  const profiles = loadMealProfiles();
  delete profiles[profileName];
  saveMealProfiles(profiles);
}
