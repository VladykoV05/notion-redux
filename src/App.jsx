import { Provider } from "react-redux"
import "./App.css"
import MyRouter from "./router/MyRouter"
import UserProvider from "./context/UserProvider"
import { store } from "./redux/store"

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <MyRouter />
      </UserProvider>
    </Provider>
  )
}

export default App
