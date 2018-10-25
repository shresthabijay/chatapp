import React, { Component } from 'react';


const MessageBody=(props)=>{

    return(
        <div style={{...Styles.messageBody,backgroundColor:props.bgcolor}}>
                <p style={Styles.text}>{props.text}</p>
        </div>
    )
}

class Message extends Component {

    render() {

        let bgcolor=""
        let justifyContent=""

        if(this.props.textData.type==="sent"){
            bgcolor="lightblue"
            justifyContent="flex-end"
        }
        else if(this.props.textData.type==="recieved"){
            bgcolor="lightgrey"
            justifyContent="flex-start"
        }

        
        console.log(this.props.textData)

        let content=(
            <div style={{...Styles.outerWrapper,justifyContent}} >
                {this.props.textData.type==="recieved" &&
                    <div>
                    <img src="https://www.w3schools.com/howto/img_avatar.png" style={Styles.userImage}/>
                    </div>
                }
                <div style={Styles.innerWrapper}>
                    {this.props.textData.data.map((data,id)=>{
                        return(<div key={id}><MessageBody text={data.text} bgcolor={bgcolor}/></div>)
                    })}
                </div>
            </div>
        )

        return (
            <div>
                {
                   content
                }
            </div>
        );
    }
}

const Styles={
    messageBody:{
        padding:"8px 10px",
        color:"black",
        marginBottom:"3px",
        display: 'inline-block',
        borderRadius:"8px"
    },
    text:{
        margin:"0px"
    },
    outerWrapper:{
        display:"flex",
        margin:"10px"
    },
    userImage:{
        width:"35px",
        top:"100px",
        borderRadius:"50%",
    },
    innerWrapper:{
        marginLeft:"8px",
        maxWidth:"60%",
    }  
  }

Message.defaultProps={
    textData:{type:"",data:[]}
}

export default Message;