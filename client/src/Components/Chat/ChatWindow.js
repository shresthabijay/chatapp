import React, { Component } from 'react'
import Message from "./Message"


const ChatHeader=(props)=>{
    return(
        <div style={Styles.chatHeader}>
            <h2 style={Styles.name}>{props.name}</h2>
            <p style={Styles.status}>Last seen: 1 hrs ago</p>
        </div>
    )
}


class ChatFooter extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         text:"",
         isButtonHovered:false,
         isInputFocused:false
      };
    };

    btnHoverInHandler=()=>{this.setState({isButtonHovered:true})}

    btnHoverOutHandler=()=>{this.setState({isButtonHovered:false})}

    onChangeHanlder=(e)=>{this.setState({text:e.target.value})}

    onFocusHandler=()=>{this.setState({isInputFocused:true})}

    onBlurHandler=()=>{this.setState({isInputFocused:false})}

    onSendingMessage=()=>{
        this.props.onSendingMessage(this.state.text)
        this.setState({text:""})
    }
    
    render() {

      const {isButtonHovered,isInputFocused}=this.state
      let buttonBg=isButtonHovered?"lightgreen":"white"
      let buttonIcon=isButtonHovered?"white":"black"
      let borderColorInput=""
      let borderColorButton=""

      if(isInputFocused){
          borderColorInput=borderColorButton="grey"
      }
      else{
          borderColorInput=borderColorButton="lightgrey"
      }
      if(isButtonHovered){
          borderColorButton="darkgreen"
      }


      return (
        <div style={Styles.footerWrapper}>
            <div style={Styles.footerFlexWrapper}>
                <input 
                value={this.state.text}
                onFocus={this.onFocusHandler} 
                onBlur={this.onBlurHandler} 
                onChange={this.onChangeHanlder} 
                style={{...Styles.footerInput,borderColor:borderColorInput}}/>
                <div 
                onMouseEnter={this.btnHoverInHandler}
                onMouseLeave={this.btnHoverOutHandler}
                onClick={this.onSendingMessage}
                style={{...Styles.sendButton,backgroundColor:buttonBg,color:buttonIcon,borderColor:borderColorButton}}
                >
                    <span className="fas fa-plus"/>
                </div>
            </div>
        </div>
      )
    }
  }

const MessageSlider=(props)=>{
    
    return(
        <div style={Styles.messageSlider}>   
        {props.messages.map((textData,id)=>{
            return <Message key={id} textData={textData}/>
        })}
        </div>
    )
} 
  
export default class ChatWindow extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       isTextLoaded:true
    };
    
  };

  onSendingMessage=(text)=>{
      if(text.length===0){
          return
      }
      this.props.sendMessage({myId:this.props.userId,userId:this.props.currentChatId,messageData:{type:"sent",data:[{text}]}})
      this.props.socket.emit("sendMessage",{text:text,userId:this.props.currentChatId})

  }

  componentDidMount=()=>{
    this.setState({isTextLoaded:true})
  }  
  render() {
    


    return (
      <div style={{height:"100%"}}>
          {this.props.isChatSelected?(
              <div style={Styles.mainChatWindow}>
                <ChatHeader name={this.props.currentChatId}/>
                <MessageSlider showText={this.state.isTextLoaded} messages={this.props.messageData} />
                <ChatFooter onSendingMessage={this.onSendingMessage} />
              </div>
          ):(<div>
              No Chat Selected
          </div>)
          }    
      </div>
    )
  }
}

const Styles={
    chatHeader:{
        padding:"15px",
        height:"85px",
        boxShadow:"0 0 0 1px rgba(0, 0, 0, 0.2)",
        backgroundColor:"white"
    },
    name:{
        margin:"0",
        fontSize:"20px",
        fontWeight:"700",
    },
    status:{
        margin:"0"
    },
    footerWrapper:{
        padding:"0 40px",
        paddingBottom:"20px"
    },
    footerFlexWrapper:{
        display:"flex",
        height:"46px",
    },
    footerInput:{
        flexGrow:"1",
        padding:"6px",
        fontSize:"16px",
        outline:"none",
        border:"2px solid lightgrey",
        borderRight:"0px",
        borderTopLeftRadius:"7px",
        borderBottomLeftRadius: "7px",
    },
    sendButton:{
        width:"50px",
        display:"flex",
        fontSize:"20px",
        justifyContent: 'center',
        alignItems: 'center',
        border:"2px solid lightgrey",
        borderTopRightRadius:"7px",
        borderBottomRightRadius: "7px",
        cursor:"pointer"
    },
    mainChatWindow:{
        height:"100%",
        backgroundColor:"aliceblue",
        display:"flex",
        flexDirection: 'column',
    },
    messageSlider:{
        flexGrow:"1",
        padding:"0 15px",
        overflow:"scroll"
    }
}