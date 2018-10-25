import actionName from "../Actions/actionNames"

export const change_current_chat=(chatId)=>{
    return {
        type:actionName.CHANGE_CURRENT_CHAT,
        payload:{chatId}
    }
}

export const add_message=(data)=>{
    return {
        type:actionName.ADD_MESSAGE,
        payload:data
    }
}