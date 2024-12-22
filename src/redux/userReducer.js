export const userReducer = (
  state = {
    isLoading: true,
  },
  action
) => {
  switch (action.type) {
    case "user/set":
      return {
        ...state,
        user: action.user,
        isLoading: false,
      }
    case "user/logout":
      return {
        ...state,
        user: null,
        isLoading: false,
      }
    default:
      return state
  }
}
