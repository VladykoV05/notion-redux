/* eslint-disable react/prop-types */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./NoteForm.module.css"

const NoteForm = ({
  initialTitle = "",
  initialContent = "",
  submitButton,
  titleComponent,
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!title.trim()) {
      newErrors.title = "The title cannot be empty."
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await onSubmit(title, content)

      setTitle("")
      setContent("")
      setErrors({})
    } catch (error) {
      console.error("Error saving note:", error)
    }
  }

  return (
    <div className={styles.createNoteContainer}>
      {titleComponent}
      <form onSubmit={handleSubmit} className={styles.createNoteForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Note title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title"
          />
          {errors.title && <p className={styles.errorText}>{errors.title}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Note body</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note text"
          />
        </div>
        {submitButton}
        <button
          type="button"
          onClick={() => navigate("/notes")}
          className={"outlined"}
        >
          Back
        </button>
      </form>
    </div>
  )
}

export default NoteForm
