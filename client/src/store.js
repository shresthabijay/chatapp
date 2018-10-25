import {createStore} from "redux"
import allReducer from "./Reducers"

const store=createStore(allReducer)

export default store