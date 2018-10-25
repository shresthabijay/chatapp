const online_users_id={}

let addUser=(socketId,user_id)=>{
    
    let userIdList=Object.keys(online_users_id)
    let alreadyExists=false

    for(let index in userIdList){
        if(user_id.toString()===userIdList[index]){
            alreadyExists=true
        }
    }

    if(alreadyExists){
        online_users_id[user_id].push(socketId)
    }else{
        online_users_id[user_id]=[socketId]
    }

    return alreadyExists
}


let getUserIdFromSocketId=(socketId)=>{

    let userIdList=Object.keys(online_users_id)

    for(let index in userIdList){
       socketIdArray=online_users_id[userIdList[index]]
       for( var i in socketIdArray){
           if(socketId===socketIdArray[i]){
               return userIdList[index]
           }
       }
    }
}

let removeUser=(socketId)=>{
    
    let targetUserId;
    let isSearchComplete=false

    for(let [userid,socketIdArray] of Object.entries(online_users_id)){

        if(isSearchComplete){
            break
        }

        for(let onlineSocketId of socketIdArray){
            if(socketId===onlineSocketId){
                targetUserId=userid
                isSearchComplete=true
                break
            }
        }
    }

    if(!targetUserId){
        return 
    }

    let index=online_users_id[targetUserId].indexOf(socketId)
    online_users_id[targetUserId].splice(index,1)

    let isUserOffline=false

    if(online_users_id[targetUserId].length===0){
        delete online_users_id[targetUserId]
        isUserOffline=true
    }

    return isUserOffline
}

let getClientList=()=>{
    return {...online_users_id}
}

const getOnlineUsers=()=>{
    return Object.keys(online_users_id)
}

module.exports={
    getOnlineUsers,
    getClientList,
    addUser,
    removeUser,
    getUserIdFromSocketId
}