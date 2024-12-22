import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./Notes.module.css"
import { useAuth } from "../../hooks/useAuth"
import { deleteNote, fetchNotes } from "../../api/notes"
import Note from "../../components/note/Note"

const Notes = () => {
  const { user } = useAuth()
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetchNotes(user.id).then(setNotes)
  }, [user])

  const handleDelete = async (id) => {
    await deleteNote(id)
    await fetchNotes(user.id).then(setNotes)
  }

  return (
    <div className={styles.notesContainer}>
      <h1>My notes</h1>
      <Link
        to="/notes/create"
        className={"buttonLink outlined " + styles.createButton}
      >
        Create a new note
      </Link>
      {notes.length === 0 ? (
        <p className={styles.noNotes}>You don't have any notes yet.</p>
      ) : (
        <ul className={styles.notesList}>
          {notes
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((note) => (
              <Note key={note.id} note={note} onDelete={handleDelete} />
            ))}
        </ul>
      )}
    </div>
  )
}

export default Notes
