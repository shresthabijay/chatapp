import actionName from "../Actions/actionNames"
let initialState={currentChatId:null,messages:{}}

const chatReducer=(state=initialState,action)=>{
    switch(action.type){
        case actionName.CHANGE_CURRENT_CHAT:
            
            if(state.messages[action.payload.chatId]==null){
                let initmessages={...state.messages}
                initmessages[action.payload.chatId]=[{type:"sent",data:[{text:"Hello!"},{text:"Ex tempor labore aliqua nulla minim officia cillum aliqua amet excepteur. Labore aliqua duis irure fugiat occaecat magna duis pariatur. Proident occaecat nulla aute fugiat commodo eiusmod consectetur eiusmod dolor ipsum nisi est ut. Est nisi quis sit ut incididunt proident sit elit cupidatat ullamco aute occaecat. In nulla ad consectetur qui enim culpa non ex nisi. Eu ipsum culpa deserunt aute nulla non excepteur eu mollit anim aute adipisicing dolore irure."}]},
                 {type:"recieved",data:[{text:"Hi!"},{text:"I am fine. How are you?"}]}]
                state={...state,currentChatId:action.payload.chatId,messages:initmessages}
            }
            else{
                state={...state,currentChatId:action.payload.chatId}
            }           
            break
            
        case actionName.ADD_MESSAGE:
            let msg={...state.messages}
            msg[action.payload.userId].push(action.payload.messageData)
            state={...state,messages:{...state.messages}}
            break

        default:
            break
    }



    return state
}

export default chatReducer