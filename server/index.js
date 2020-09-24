//서버를 시작하면 여기서 시작함

const express = require('express')
const app = express()
const port = 8000
const {User} = require("./models/User")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const {auth} = require('./middleware/auth')
const config = require('./config/key')



//application/x-www-form-urlencoded 이렇게 된것을 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true}));
//application/json 으로된것을 분석해서 가져올수있게함
app.use(bodyParser.json());
app.use(cookieParser());

//mongoose.connect(config.mongoURI,{
  mongoose.connect('mongodb+srv://psh:psh1234@boilerplate.idmdn.mongodb.net/boilerplate?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(() =>console.log('MongoDB Connected!'))
    .catch(err=> console.log(err))




app.get('/', (req, res) => {
  res.send('Hello World!~~')
})

app.get('/api/hello',(req,res)=>{

  //여기서 할거한다음에 프론트로 response를 줌
  res.send("안녕하세요~")
})

app.post('/api/users/register',(req,res)=>{
    //회원가입할떄 필요한 정보들을 클라이언트에서 가져오면 
    //그것들을 데이터베이스에 넣어준다.

    //req.body에 { id:psh, password:1234} 이런식으로 들어있음 이거를 bodyParser가 가능하게 해줌
    const user = new User(req.body)
    //정보들이 user모델이 저장됨
    //db에저장


    user.save((err,userInfo)=>{
        if(err) return res.json({ success:false,err})
        return res.status(200).json({success:true})
    }) 

})



app.post('/api/users/login',(req,res)=>{
  
  //LoginPage에서 입력한 이메일이 넘어옴
  //요청된 이메일을 데이터 베이스에서 있는지 찾는다
                        //req.body.email 이 LoginPage에서 넘겨받은이메일임
  User.findOne({ email:req.body.email},(err,user)=>{
    if(!user){
      return res.json({
        loginSuccess:false,
        message:"제공된 이메일에 해당하는 유저가 없습니다. "
      })
    }
     //요청된 이메일이 데이터베이스에있다면 비밀번호가 맞는비밀번호인지 확인
     user.comparePassword( req.body.password,(err,isMatch)=>{
        if(!isMatch)
        return res.json({loginSuccess:false,message:"비밀번호가 틀렸습니다."})

        //비밀번호가 맞다면 토큰을 생성한다. 원래 여기가 좀 복잡하다
        //토큰 생성을 위해 jsonwebtoken이라는 라이브러리를 설치
        user.generateToken((err,user)=>{
            if(err) return res.status(400).send(err);
            // 토큰을 저장한다. 어디에? user에 토큰이 현재 들어있다. 쿠키 ,로컬스토리지에 저장할수있는데 장단점이있다
             // 여기서는 쿠키에 저장한다. 
             //쿠키에 x_auth 란 이름으로 들어감
            res.cookie("x_auth",user.token)
            .status(200)
            .json({ loginSuccess:true,userId:user._id })
           
        })
     })

  })
})

//지금 이런것들을 로그인라우터, 회원가입 Router 이렇게 말하는데 이런걸 index 한군데 놔두면 굉장이 길어지는데 나중에 express 라우터로정리할꺼임

//가운데 있는 auth 는 미들웨어라고하는데 '/api/users/auth' 이 엔드 포인트에 리퀘스트를 받은다음에 콜백펑션 하기전에
//중간에서 뭘해주는것,  auth.js파일이 아래 auth로 옴 당연히 임포트 해줘야겠지
app.get('/api/users/auth',auth,(req,res)=>{

 
  //여기 들어왔따는건 auth 미들웨어 까지 다 통과했다는말
  res.status(200).json({
   
    _id:req.user._id,  //이렇게 할수있는 이유는 auth에서 user를 req에 넣었기 떄문에
    // role 이 0이면은 일반유저, role이 0이 아니면 관리자 나중에 role 1,2 다른부서 어드민 이런식으로 만들수도 있음
    isAdmin: req.user.role ===0? false:true,
    isAuth:true,
    email:req.user.email,
    name:req.user.name,
    lastname:req.user.lastname,
    role:req.user.role,
    image:req.user.image

  })




})
//로그인된 상태라서 auth미들웨어를 넣어주면됨
app.get('/api/users/logout',auth,(req,res)=>{

  User.findOneAndUpdate({_id:req.user._id},
    //토큰을 지워줌
    {token:""}
    ,(err,user) =>{
        if(err) return res.json({success:false,err});
        return res.status(200).send({
          success:true
        })
    })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})