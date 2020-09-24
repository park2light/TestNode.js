import React,{useEffect} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
//import { response } from 'express'
function LandingPage(props) {


    useEffect(() => {
        //get request를 서버에다가 보냄
        // 서버와 주소가 다르면 오류가남 지금은 react에 설정된 3000번 서버로 보내고있음
        axios.get('/api/hello')
        //서버 index.js에서 보낸 response를 받음
        .then(response => console.log(response.data) )
    }, [])

    const onClickHandler =() =>{

        axios.get(`/api/users/logout`)
        .then(response =>{
            if(response.data.success){
                props.history.push("/login")
            }else{
                alert("로그아웃하는데 실패했습니다")
            }
        })
    }

    return (
        <div style={{
            display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'
        }}>
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

export default withRouter(LandingPage)
