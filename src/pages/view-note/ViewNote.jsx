import { useCallback, useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import styles from "./ViewNote.module.css"
import { useAuth } from "../../hooks/useAuth"
import { deleteNote, fetchNote } from "../../api/notes"

const ViewNote = () => {
  const { user } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()

  const [note, setNote] = useState(null)

  useEffect(() => {
    fetchNote(id).then((note) => {
      if (note && note.author === user.id) {
        setNote(note)
      } else {
        navigate("/notes")
      }
    })
  }, [id, navigate, user.id])

  const handleDelete = useCallback(() => {
    deleteNote(id).then(() => navigate("/notes"))
  }, [id, navigate])

  if (!note) {
    return (
      <div className={styles.error}>
        <h1>Note not found</h1>
        <button
          onClick={() => navigate("/notes")}
          className={styles.backButton}
        >
          Back to Notes
        </button>
      </div>
    )
  }

  return (
    <div className={styles.viewNoteContainer}>
      <div className={styles.title}>
        <button onClick={() => navigate("/notes")} className={"outlined"}>
          Go back
        </button>
        <h1>{note.title}</h1>

        <div className={styles.actions}>
          <Link to={`/notes/${note.id}/edit`} className={"buttonLink"}>
            ✍️
          </Link>
          <button onClick={handleDelete} className={styles.deleteButton}>
            🗑
          </button>
        </div>
      </div>
      <pre className={styles.noteContent}>
        {note.content || "No content provided."}
      </pre>
    </div>
  )
}

export default ViewNote
