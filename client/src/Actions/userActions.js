import actionName from "./actionNames"

export const AddCurrentUser=(userDetails)=>{
    
    return {
        type:actionName.ADD_CURRENT_USER,
        payload:{userDetails}
    }
}

export const RemoveCurrentUser=()=>{
    return {
        type:actionName.REMOVE_CURRENT_USER,
        payload:{}
    }
}