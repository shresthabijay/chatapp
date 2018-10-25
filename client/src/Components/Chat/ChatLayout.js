import React, { Component } from 'react'
import ChatWindow from "./ChatWindow"
import ChatSidebar from "./ChatSidebar"
import io from "socket.io-client"
import {connect} from "react-redux"
import {change_current_chat,add_message} from "../../Actions/chatActions"


class ChatLayout extends Component {
  
    constructor(props) {
      super(props)
      this.state = {
         user_id:this.props.userState.id,
         active:false,
         clientList:[],
         currentChatId:this.props.chatState.currentChatId
      };
      this.requestOnline=true
      this.initSocket()    
    };

    initSocket=()=>{
        const url="http://localhost:8000"
        this.socket=io(url)

        this.socket.on("clients_connected",(clientList)=>{

            let newList=clientList.filter(clientId=>{
                return this.state.user_id!=clientId
            })
            this.setState({clientList:newList})
        })

        this.socket.on("successfull_connection",()=>{
            this.socket.emit("getOnlineUsers")
            console.log("connected")
            this.setState({active:true})
            this.requestOnline=false
        })

        this.socket.on("reconnect",()=>{
            console.log("hello")
            this.socket.emit("makeMeActive",this.state.user_id)
            this.socket.emit("getOnlineUsers")  
        })

        this.socket.on("newMessageRecieved",data=>{
            this.props.addMessage({userId:data.userId,messageData:{type:data.type,data:[{text:data.text}]}})
        })
    }

    componentDidMount = () => {
        
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.userState.id!==prevState.user_id){
            return {user_id:nextProps.userState.id}
        }
        if(nextProps.chatState.currentChatId!==prevState.currentChatId){
            return {currentChatId:nextProps.chatState.currentChatId}
        }
        return {}
    }
    
    
    
    render() {
        
        console.log(this.state.active)

        if(!this.state.active && this.requestOnline && this.state.user_id){
            console.log("make me active")
            this.socket.emit("makeMeActive",this.state.user_id)
            this.requestOnline=false
        }

        let isChatSelected=this.state.currentChatId!=null
        

        let messageData=isChatSelected?this.props.chatState.messages[this.state.currentChatId]:null
        
        return (

        
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 p-0">
                    <ChatSidebar changeCurrentChat={this.props.changeCurrentChat} currentChatId={this.state.currentChatId} onlineUsersList={this.state.clientList}/>
                </div>
                <div className="col-lg-9 p-0 " style={{height:"100vh"}}>
                    <ChatWindow messageData={messageData} userId={this.state.user_id} sendMessage={this.props.addMessage} socket={this.socket} isChatSelected={isChatSelected} currentChatId={this.state.currentChatId}/>
                </div> 
            </div>
        </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        userState:state.userState,
        chatState:state.chatState,
    }
}

const dispatchActionsToProps=(dispatch)=>{
    return{
        changeCurrentChat:(chatId)=>{
            dispatch(change_current_chat(chatId))
        },
        addMessage:data=>{
            dispatch(add_message(data))
        }

    }
}

export default connect(mapStateToProps,dispatchActionsToProps)(ChatLayout)







