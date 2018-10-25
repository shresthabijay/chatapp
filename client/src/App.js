import React, { Component } from 'react';
import Login from "./Components/Login/Login"
import Signup from "./Components/Signup/Signup"
import {isAuthenticated} from "./Utils/auth"
import ChatLayout from "./Components/Chat/ChatLayout"
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom"
import ChatWindow from "./Components/Chat/ChatWindow"


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={()=>{
            return <Redirect to="protected-page"/>
          }}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/protected-page" render={(routerProps)=>{
            if(isAuthenticated()){
              return (<ChatLayout/>)
            }
            else{
              return (<Redirect to="/login"/>)
            }
          }}/>

        </Switch>
      </Router>
      );
  }
}

export default App;
