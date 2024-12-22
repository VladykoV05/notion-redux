const BASE_URL = "http://localhost:5001/notes"

export const fetchNote = async (id) => {
  const note = await fetch(`${BASE_URL}/${id}`)
  return await note.json()
}

export const addNote = async (newNote) => {
  await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  })
}

export const editNote = async (id, title, content) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
    }),
  })
}

export const deleteNote = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })
}

export const fetchNotes = async (userId) => {
  const notes = await fetch(`${BASE_URL}?author=${userId}`)
  return await notes.json()
}
