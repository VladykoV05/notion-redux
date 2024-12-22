/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { connect } from "react-redux"
import { AuthContext } from "./AuthContext"
import { fetchUserById } from "../api/users"

function UserProvider({ user, setUser, isLoading, children }) {
  useEffect(() => {
    if (user) {
      localStorage.setItem("userId", user.id)
    } else if (!isLoading) {
      localStorage.removeItem("userId")
    }
  }, [user, isLoading])

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (userId) {
      fetchUserById(userId)
        .then(setUser)
        .catch(() => setUser(null))
    } else {
      setUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
    isLoading: state.isLoading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch({ type: "user/set", user }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProvider)
