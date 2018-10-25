const chat=require("./chat")

const socketHandler=(socket,io)=>{

    socket.on("makeMeActive",(userId)=>{

        if(!userId){
            return 
        }

        
        let isAlreadyOnline=chat.addUser(socket.id,userId)

        if(!isAlreadyOnline){
            console.log("new",socket.id,userId)
            socket.emit("clients_connected",chat.getOnlineUsers())
        }

        socket.emit("successfull_connection")

        console.log(chat.getClientList())

    })

    socket.on("getOnlineUsers",()=>{
        socket.emit("clients_connected",chat.getOnlineUsers())
    })


    socket.on("disconnect",()=>{
       let isUserOffline=chat.removeUser(socket.id)
        console.log("user disconnected",socket.id)
       if(isUserOffline){
            socket.broadcast.emit("clients_connected",chat.getOnlineUsers())
       }

       console.log(chat.getClientList())
    })

    socket.on("sendMessage",data=>{
        socketlist=chat.getClientList()[data.userId]
        let ownSocketList=chat.getClientList()[chat.getUserIdFromSocketId(socket.id)]
        
        console.log("to",data.userId,"from",chat.getUserIdFromSocketId(socket.id))
        
        socketlist.map(socketId=>{
            io.to(`${socketId}`).emit('newMessageRecieved',{userId:chat.getUserIdFromSocketId(socket.id),type:"recieved",text:data.text});
            return socketId
        })

        ownSocketList.map(socketId=>{
            if(socketId!==socket.id){
                io.to(`${socketId}`).emit('newMessageRecieved',{userId:data.userId,type:"sent",text:data.text});
            }
            return socketId
        })

    
    })

}


module.exports=socketHandler