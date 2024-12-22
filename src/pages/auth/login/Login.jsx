import { useState } from "react"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import styles from "./../Auth.module.css"
import { useAuth } from "../../../hooks/useAuth"
import { LoginSchema } from "../../../utils/schemas"
import { fetchUsers } from "../../../api/users"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate()

  const { setUser } = useAuth()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    fetchUsers().then((userList) => {
      function findUserInDB(userToCheck, userList) {
        return userList.find(
          (u) =>
            u.email === userToCheck.email && u.password === userToCheck.password
        )
      }

      try {
        LoginSchema.parse(formData)
        setErrors({})
        setLoginError("")

        const formUser = { email: formData.email, password: formData.password }

        const foundUser = findUserInDB(formUser, userList)

        if (foundUser) {
          setUser(foundUser)
          navigate("/about")
        } else {
          setLoginError("Incorrect email or password.")
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          const fieldErrors = err.errors.reduce((acc, error) => {
            acc[error.path[0]] = error.message
            return acc
          }, {})
          setErrors(fieldErrors)
        }
      }
    })
  }

  return (
    <div className={styles.formContainer}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <span
              className={styles.passwordToggle}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "🙈" : "👁️"} {}
            </span>
          </div>
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
        </div>
        {loginError && <p className={styles.errorText}>{loginError}</p>}
        <button type="submit" className={styles.loginButton}>
        Login
        </button>
      </form>
      <p className={styles.registerText}>
      If you are not registered, <Link to="/register">click here</Link>{" "}
      for registration.
      </p>
    </div>
  )
}

export default Login
