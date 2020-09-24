import axios from 'axios'
import {
    LOGIN_USER,REGISTER_USER,AUTH_USER
} from './types'
export function loginUser(dataToSubmit){
    //dataToSubmit에 loginPage에서 넘어온 body들어있음

    //서버에서 받은 데이터를 리퀘스트에 저장 
    const request = axios.post('/api/users/login',dataToSubmit)
    .then(response=>response.data)

    return {
        type:LOGIN_USER,
        payload:request
    }
    
}


export function registerUser(dataToSubmit){
    //dataToSubmit에 loginPage에서 넘어온 body들어있음

    //서버에서 받은 데이터를 리퀘스트에 저장 
    const request = axios.post('/api/users/register',dataToSubmit)
    .then(response=>response.data)

    return {
        type:REGISTER_USER,
        payload:request
    }
    
}



export function auth(){
   
    const request = axios.get('/api/users/auth')
    .then(response=>response.data)
    //alert("sdf")
    //console.log("sdf")
    return {
        
        type:AUTH_USER,
        payload:request
    }
    
}


