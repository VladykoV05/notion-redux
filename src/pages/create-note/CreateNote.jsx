import { useNavigate } from "react-router-dom"
import styles from "./CreateNote.module.css"
import { useAuth } from "../../hooks/useAuth"
import { addNote } from "../../api/notes"
import NoteForm from "../../components/note-form/NoteForm"
import { useMemo } from "react"

const CreateNote = () => {
  const navigate = useNavigate()

  const { user } = useAuth()

  const handleSubmit = async (title, content) => {
    try {
      const newNote = {
        author: user?.id,
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
      }

      await addNote(newNote)

      navigate("/notes")
    } catch (error) {
      console.error("Error saving note:", error)
    }
  }

  const titleComponent = useMemo(() => <h1>Create Note</h1>, [])
  const submitButton = useMemo(
    () => (
      <button type="submit" className={styles.createButton}>
        Create
      </button>
    ),
    []
  )

  return (
    <NoteForm
      titleComponent={titleComponent}
      submitButton={submitButton}
      onSubmit={handleSubmit}
    />
  )
}

export default CreateNote
