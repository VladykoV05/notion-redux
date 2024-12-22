import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Register from "../pages/auth/register/Register"
import About from "../pages/about/About"
import Notes from "../pages/notes/Notes"
import CreateNote from "../pages/create-note/CreateNote"
import EditNote from "../pages/edit-note/EditNote"
import ViewNote from "../pages/view-note/ViewNote"
import Header from "../components/header/Header"
import ProtectedRoute from "../components/ProtectedRoute"
import Login from "../pages/auth/login/Login"
import NotFound from "../pages/not-found/NotFound"
import { useAuth } from "../hooks/useAuth"

export default function MyRouter() {
  const { user } = useAuth()

  return (
    <Router>
      {}
      {user && <Header email={user.email} />}

      <div className="mainContainer">
        <Routes>
          {}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/about" />
              </ProtectedRoute>
            }
          />
          {}
          <Route path="/login" element={<Login />} />
          {}
          <Route path="/register" element={<Register />} />
          {}
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          {}
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          {}
          <Route
            path="/notes/create"
            element={
              <ProtectedRoute>
                <CreateNote />
              </ProtectedRoute>
            }
          />
          {}
          <Route
            path="/notes/:id/edit"
            element={
              <ProtectedRoute>
                <EditNote />
              </ProtectedRoute>
            }
          />

          {}
          <Route
            path="/notes/view/:id"
            element={
              <ProtectedRoute>
                <ViewNote />
              </ProtectedRoute>
            }
          />
          {}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}
