import { useNavigate } from "react-router-dom"
import styles from "./About.module.css"
import { useAuth } from "../../hooks/useAuth"

const About = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleGoToNotes = () => {
    navigate("/notes")
  }

  const formattedDate = new Date(user.date).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className={styles.page}>
      <div className={styles.infoBlock}>
        <h1>About</h1>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Registration Date: </strong> {formattedDate}
        </p>
        <button onClick={handleGoToNotes} className={styles.button}>
          Go to notes
        </button>
      </div>
    </div>
  )
}

export default About
