import {combineReducers} from "redux"
import userReducer from "./userReducer"
import chatReducer from "./chatReducer"

const allReducer=combineReducers({userState:userReducer,chatState:chatReducer})

export default allReducer