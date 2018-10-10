import React, { Component } from 'react'
import Message from "./Message"
// import socketClient from "so"

const ChatHeader=(props)=>{
    return(
        <div style={Styles.chatHeader}>
            <h style={Styles.name}>{props.name}</h>
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
        {props.messages.map((textData)=>{
            return <Message textData={textData}/>
        })}
        </div>
    )
} 
  
export default class ChatWindow extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       messages:[{type:"sent",data:[{text:"Hello!"},{text:"Ex tempor labore aliqua nulla minim officia cillum aliqua amet excepteur. Labore aliqua duis irure fugiat occaecat magna duis pariatur. Proident occaecat nulla aute fugiat commodo eiusmod consectetur eiusmod dolor ipsum nisi est ut. Est nisi quis sit ut incididunt proident sit elit cupidatat ullamco aute occaecat. In nulla ad consectetur qui enim culpa non ex nisi. Eu ipsum culpa deserunt aute nulla non excepteur eu mollit anim aute adipisicing dolore irure."}]},
                 {type:"recieved",data:[{text:"Hi!"},{text:"I am fine. How are you?"}]}
                ],
       isTextLoaded:true
    };
    
  };

  onSendingMessage=(text)=>{
      if(text.length===0){
          return
      }
      let data=[...this.state.messages]
      data.push({type:"sent",data:[{text:text}]})
      this.setState({messages:data})

  }

  componentDidMount=()=>{
    this.setState({isTextLoaded:true})
  }
  
  render() {
    return (
      <div style={Styles.mainChatWindow}>
          <ChatHeader name="Bijay"/>
          <MessageSlider showText={this.state.isTextLoaded} messages={this.state.messages} />
          <ChatFooter onSendingMessage={this.onSendingMessage} />
      </div>
    )
  }
}

const Styles={
    chatHeader:{
        padding:"15px",
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
        height:"100vh",
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