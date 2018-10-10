import axios from "axios"
const url="http://localhost:8000"


export const login=(credentials)=>{
    console.log(credentials)
    return axios.post(`${url}/login`,credentials)
}

export const signup=(details)=>{
    return axios.post(`${url}/signup`,details)
}



