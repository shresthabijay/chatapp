import React, { Component } from 'react';
import {Alert} from "reactstrap"
import {signup} from "../../Utils/api"
class Signup extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         fullname:"",
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
        
        signup({fullname:this.state.fullname,username:this.state.username,password:this.state.password}).then(
            res=>{
                this.setState({status:"Signup Successfull!",alertColor:"success",showAlert:true})
              }
          ).catch(err=>{
            this.setState({status:"Signup Failed!",alertColor:"danger",showAlert:true})
          })
    }
    
    
    render() {
        return (
            <div className="container" style={{padding:"2% 20vw"}}>
                <h2 style={{textAlign:"center"}} className="text-info">Signup</h2>
                <div className="form-group">
                    <label>Fullname</label>
                    <input type="fullname" onChange={this.onChangeHandler} className="form-control" id="fullname"/>
                    <label>Username</label>
                    <input type="username" onChange={this.onChangeHandler} className="form-control" id="username"/>
                    <label>Password</label>
                    <input type="password" onChange={this.onChangeHandler} className="form-control" id="password"/>
                </div>
                <button type="button"  onClick={this.onSubmit} className="btn btn-info">Submit</button>
                <div>
                <Alert isOpen={this.state.showAlert} color={`${this.state.alertColor} mt-3`} toggle={this.onDismiss}>
                    {this.state.status}
                </Alert>
                </div>
            </div>
        );
    }
}

export default Signup;