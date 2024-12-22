import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

/* eslint-disable react/prop-types */
export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return user ? children : <Navigate to="/login" />
}
