import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import AttributionPage from "../pages/attribution/AttributionPage";
import CalendarPage from "../pages/calendar/CalendarPage";
import FiltersPage from "../pages/filters/FiltersPage";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import MealOptions from "../pages/meal-options/MealOptions"
import RoulettePage from "../pages/roulette/RoulettePage"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attribution"
          element={
            <ProtectedRoute>
              <AttributionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/filters"
          element={
            <ProtectedRoute>
              <FiltersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meal-options"
          element={
            <ProtectedRoute>
              <MealOptions />
            </ProtectedRoute>
          }
        />
      <Route
        path="/roulette"
        element={
          <ProtectedRoute>
            <RoulettePage />
          </ProtectedRoute>
        }
      />
      </Routes>
    </BrowserRouter>
  );
}
