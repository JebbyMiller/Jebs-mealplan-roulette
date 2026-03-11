import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import PrivateLayout from "../layouts/private-layout/PrivateLayout.jsx";


export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <PrivateLayout>{children}</PrivateLayout>;
}
