import React,{Component} from "react"
import {connect} from "react-redux"

class UserStatusBox extends Component{

    constructor(props) {
      super(props)
    
      this.state = {
         isHovered:false,
         isActive:this.props.isActive
      }
    }

    onClickHandler=()=>{
        this.props.onChatSelect(this.props.data)
    }

    onHoverInHandler=()=>{
        this.setState({isHovered:true})
    }

    onHoverOutHandler=()=>{
        this.setState({isHovered:false})
    }
    
    render(){
        let backgroundColor=""

        if(this.props.isActive){
            backgroundColor="lightblue"
        }

        else{
            if(this.state.isHovered){
                backgroundColor="lightgrey"
            }
            else{
                backgroundColor="white"
            }
        }

        return(
        <div onMouseEnter={this.onHoverInHandler} onClick={this.onClickHandler}  onMouseLeave={this.onHoverOutHandler} style={{...Styles.userStatusBox,backgroundColor}}>
            <img src="https://www.w3schools.com/howto/img_avatar.png" style={Styles.userImage}/>
            <div>
                <div style={Styles.userBoxName}>{this.props.data}</div>
            </div>
        </div>
        )
    }

}

export default class ChatSidebar extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         currentChatId:this.props.currentChatId
      }

    }

    onChatSelect=(id)=>{
        this.props.changeCurrentChat(id)
    }
    
    render() {
        return (
            <div>
                <div style={Styles.sidebarHeader}>
                    <i className="far fa-comment-alt" style={Styles.sidebarIcon}></i>
                    <div style={Styles.sidebarHeaderText}>Chat App</div>
                </div>
                <div>
                    {this.props.onlineUsersList.map((data,id)=>{
                        let isActive=this.props.currentChatId===data
                        return(
                            <UserStatusBox onChatSelect={this.onChatSelect} isActive={isActive} isHovered key={id} data={data}/>
                        )
                    })}
                </div>
            </div>
        );
    }
}


const Styles={
    sidebarHeader:{
        display:"flex",
        height:"85px",
        alignItems: 'center',
        justifyContent:"center",
        padding:"15px",
        boxShadow:"0 0 0 1px rgba(0, 0, 0, 0.2)",
        backgroundColor:"white"
    },
    sidebarIcon:{
        padding:"0 10px",
        fontSize:"22px"
    },
    sidebarHeaderText:{
        display:"inline-block",
        fontSize: "22px",
        fontWeight: '500',
    },
    userStatusBox:{
        height:"70px",
        border:"1px solid rgba(0, 0, 0, 0.2)",
        padding:"10px 25px",
        display:"flex",
        alignItems: 'center',
    },
    userImage:{
        height:"40px",
        borderRadius:"50%",
    },
    userBoxName:{
        fontSize:"20px",
        fontWeight:"350",
        paddingLeft:"12px",
    }
}