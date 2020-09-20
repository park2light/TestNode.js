//서버를 시작하면 여기서 시작함

const express = require('express')
const app = express()
const port = 5000
const {User} = require("./models/User")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
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

app.post('/register',(req,res)=>{
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

app.post('/login',(req,res)=>{

  //요청된 이메일을 데이터 베이스에서 있는지 찾는다
  
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




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})