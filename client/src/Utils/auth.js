const tokenName="client_token"

export const isAuthenticated=()=>{
    if(localStorage.getItem(tokenName)){
        return true
    }
    else{
        return false
    }
}

export const setAccessToken=(token)=>{
    localStorage.setItem(tokenName,token)
}

export const clearAccessToken=(token)=>{
    localStorage.removeItem(tokenName)
}