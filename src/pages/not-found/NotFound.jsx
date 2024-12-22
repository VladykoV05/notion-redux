/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import styles from "./NotFound.module.css"

const NotFound = ({ user }) => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>404 - Page Not Found</h1>
      <p>Looks like you're lost. This page does not exist.</p>
      {user ? (
        <Link to="/about" className={styles.homeLink}>
          Return to home page
        </Link>
      ) : (
        <Link to="/" className={styles.loginLink}>
          Go to login page
        </Link>
      )}
    </div>
  )
}

export default NotFound
