import actionName from "../Actions/actionNames"
const initialState={}

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case actionName.ADD_CURRENT_USER:
            state={...state,...action.payload.userDetails}
            break
    }

    return state

}

export default userReducer