//서버를 시작하면 여기서 시작함

const express = require('express')
const app = express()
const port = 5000
const {User} = require("./models/User")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//application/x-www-form-urlencoded 이렇게 된것을 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true}));
//application/json 으로된것을 분석해서 가져올수있게함
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://psh:psh1234@boilerplate.idmdn.mongodb.net/boilerplate?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(() =>console.log('MongoDB Connected!'))
    .catch(err=> console.log(err))




app.get('/', (req, res) => {
  res.send('Hello World!')
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})