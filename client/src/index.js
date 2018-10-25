import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import {isAuthenticated,getAccessToken} from "./Utils/auth"
import jwtDecode from "jwt-decode"
import {AddCurrentUser} from "./Actions/userActions"
import store from "./store"
import 'bootstrap/dist/css/bootstrap.min.css';

store.subscribe(()=>{
    console.log("store changed")
    console.log(store.getState())
})


if(isAuthenticated()){
    const token=getAccessToken()
    const decoded=jwtDecode(token)
    console.log(decoded)
    store.dispatch(AddCurrentUser({id:decoded.user_id}))
}


ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
