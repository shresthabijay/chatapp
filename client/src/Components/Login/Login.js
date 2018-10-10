import React, { Component } from 'react'
import {login} from "../../Utils/api"
import {setAccessToken} from "../../Utils/auth"
import { Alert } from 'reactstrap'
import {isAuthenticated} from "../../Utils/auth"
import axios from "axios"
import Redirect from 'react-router-dom/Redirect';


export default class Login extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       username:"",
       password:"",
       showAlert:false,
       status:"",
       alertColor:""
    };
  };

  onChangeHandler=(e)=>{
    let obj={}
    obj[e.target.id]=e.target.value
    this.setState(obj)
  }

  onSubmit=(e)=>{

      login({username:this.state.username,password:this.state.password}).then(
          res=>{

            console.log(res)
              if(!res.data.token){
                  this.setState({status:"Login Failed!",alertColor:"danger",showAlert:true})
              }


              setAccessToken(res.data.token)
              this.setState({status:"Login Successfull!",alertColor:"success",showAlert:true})
          }
      ).catch(err=>{
        this.setState({status:"Login Failed!",alertColor:"danger",showAlert:true})
      })
  }

  onDismiss=()=>{this.setState({showAlert:false,status:"",alertColor:""})}
  
  render() {

    if(isAuthenticated()){
      return <Redirect to="/protected-page"/>
    }
    return (
      <div className="container" style={{padding:"2% 20vw"}}>
        <h2 style={{textAlign:"center"}} className="text-info">Login</h2>
        <div className="form-group">
            <label>Username</label>
            <input type="email" onChange={this.onChangeHandler} className="form-control" id="username"/>
            <label>Password</label>
            <input type="password" onChange={this.onChangeHandler} className="form-control" id="password"/>
        </div>
        <button type="button"  onClick={this.onSubmit} className="btn btn-info">Login</button>
        <div>
        <Alert isOpen={this.state.showAlert} color={`${this.state.alertColor} mt-3`} toggle={this.onDismiss}>
            {this.state.status}
        </Alert>
        </div>
      </div>
    )
  }
}
