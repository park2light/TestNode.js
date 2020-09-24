const { User } = require("../models/User");


let auth = (req,res,next)=>{
// 인증처리를 여기서 함

// 클라이언트에서 쿠키에서 토큰을 가져옴

let token = req.cookies.x_auth;

// 가져온 토큰을 복호화한후 유저를 찾는다
//console.log("asdf"),
User.findByToken(token,(err,user)=>{
   // console.log("asdf")
    //console.log("sdf")
    if(err) throw err;
    //auth가 있고 에러가 있고
    if(!user) return res.json({isAuth:false,error:true})

    //만약 유저가 있으면
    req.token = token;
    req.user = user;
    next(); // 이거하면 아마 미들웨어 auth 에서 다음으로 진행함

})

//유저가 있으면 인증 Okay

//유저가 없으면 인증 NO


}
module.exports ={ auth };