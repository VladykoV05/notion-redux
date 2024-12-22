import { useNavigate, useParams } from "react-router-dom"
import styles from "./EditNote.module.css"
import { useAuth } from "../../hooks/useAuth"
import NoteForm from "../../components/note-form/NoteForm"
import { useEffect, useMemo, useState } from "react"
import { editNote, fetchNote } from "../../api/notes"

const EditNote = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [note, setNote] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchNote(id).then((note) => {
      if (note && note.author === user.id) {
        setNote(note)
      } else {
        navigate("/notes")
      }
    })
  }, [id, navigate, user.id])

  const handleSave = (title, content) => {
    editNote(id, title, content).then(() => {
      navigate("/notes")
    })
  }

  const titleComponent = useMemo(() => <h1>Edit Note</h1>, [])
  const submitButton = useMemo(
    () => (
      <button type="submit" className={styles.editButton}>
        Save
      </button>
    ),
    []
  )

  if (!note) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <NoteForm
      initialTitle={note.title}
      initialContent={note.content}
      titleComponent={titleComponent}
      submitButton={submitButton}
      onSubmit={handleSave}
    />
  )
}

export default EditNote
