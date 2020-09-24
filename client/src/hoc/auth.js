import Axios from 'axios';
//import { response } from 'express';
import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'

export default function(SpecificComponent,option,adminRoute = null){
   // alert("sdfzsd")
    function AuthenticationCheck(props){
       // alert("sdfzsd")
       // console.log("sdf")
        //null => 아무나 출입이 가능한 페이지
        //true => 로그인한 유저만 출입이 가능한 페이지
        //false => 로그인한 유저는 출입불가능한 페이지
        const dispatch = useDispatch();

        useEffect(() => {
            //백엔드에서 처리해서 가져온 정보들이 response안에 다들어있음
            dispatch(auth()).then(response=>{
                  //  console.log("std")
                    console.log(response)
                    //로그인 하지 않은 상태
                    if(!response.payload.isAuth){
                         if(option)   {
                             props.history.push('/login')
                         }
                    }else{
                        //로그인 한 상태
                        if(adminRoute && !response.payload.isAdmin){
                            props.history.push('/')
                        }else{
                            if(option === false)
                            props.history.push('/')
                        }
                    }

            })
            //Axios.get('/api/users/auth')
        }, [])

        return (
            <SpecificComponent />
        )

    }


    return AuthenticationCheck
}   