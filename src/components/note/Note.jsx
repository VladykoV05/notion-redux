/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import styles from "./Note.module.css"

export default function Note({ note, onDelete }) {
  return (
    <li key={note.id} className={styles.noteCard}>
      <div className={styles.noteHeader}>
        <Link to={`/notes/view/${note.id}/`} className={styles.viewNoteLink}>
          {note.title}
        </Link>
        <span className={styles.noteDate}>
          {new Date(note.createdAt).toLocaleDateString("ru-RU", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.noteActions}>
        <Link to={`/notes/${note.id}/edit`} className={"buttonLink"}>
          ✍️
        </Link>

        <button
          onClick={() => onDelete(note.id)}
          className={styles.deleteButton}
        >
          🗑
        </button>
      </div>
    </li>
  )
}
