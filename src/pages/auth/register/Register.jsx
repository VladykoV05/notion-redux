import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./../Auth.module.css"
import { useAuth } from "../../../hooks/useAuth"
import { RegisterSchema } from "../../../utils/schemas"
import { z } from "zod"
import { fetchUserByEmail, postUser } from "../../../api/users"

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const { setUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      RegisterSchema.parse(formData)
      setErrors({})

      const userData = {
        email: formData.email,
        password: formData.password,
        date: Date.now(),
      }

      await postUser(userData)

      setUser(await fetchUserByEmail(formData.email))
      navigate("/about")
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message
          return acc
        }, {})
        setErrors(fieldErrors)
      }
    }
  }

  return (
    <div className={styles.formContainer}>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
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
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Repeat password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <span
              className={styles.passwordToggle}
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? "🙈" : "👁️"} {}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className={styles.errorText}>{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" className={styles.registerButton}>
        Авторизоваться
        </button>
      </form>
      <p className={styles.registerText}>
      If you have an account, <br></br>
        <Link to="/login">click here</Link> to enter.
      </p>
    </div>
  )
}

export default Register
