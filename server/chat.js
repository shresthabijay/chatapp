const online_users_id=[]

let addUser=(user_id)=>{
    online_users_id.push(user_id)
}

let removeUser=(user_id)=>{
    online_users_id.splice(online_users_id.indexOf(user_id),1)
}

module.exports={
    addUser,
    removeUser
}