export const postUser = async (user) => {
  const response = await fetch("http://localhost:5001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  return response.json()
}

export const fetchUserByEmail = async (email) => {
  return await fetch("http://localhost:5001/users?email=" + email.toLowerCase())
    .then((res) => res.json())
    .then((res) => res[0])
}

export const fetchUserById = async (id) => {
  return await fetch("http://localhost:5001/users/" + id).then((res) =>
    res.json()
  )
}

export const fetchUsers = async () => {
  return await fetch("http://localhost:5001/users").then((res) => res.json())
}
