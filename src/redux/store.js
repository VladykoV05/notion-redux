import { legacy_createStore as createStore } from "redux"
import { userReducer } from "./userReducer"

export const store = createStore(userReducer)
