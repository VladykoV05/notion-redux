/* eslint-disable react/prop-types */
import { useCallback } from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./Header.module.css"
import { useDispatch } from "react-redux"

const Header = ({ email }) => {
  const dispatch = useDispatch()

  const handleLogout = useCallback(() => {
    dispatch({ type: "user/logout" })
  }, [dispatch])

  const location = useLocation()

  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <span>Hello, {email}</span>
        </div>
        <div className={styles.right}>
          <Link
            {...{
              className: location.pathname === "/about" ? styles.active : "",
            }}
            to="/about"
          >
            About
          </Link>
          <Link
            {...{
              className: location.pathname === "/notes" ? styles.active : "",
            }}
            to="/notes"
          >
            Notes
          </Link>
          <button className="logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
