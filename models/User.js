const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }

})
const User = mongoose.model('User',userSchema) //스키마를 모델로 감싸줌
module.exports ={User}//이 모델을 다른파일에서도 쓸수있게 exprot 해줌
//시작할떄 git init 해도 stagingArea로 다 들어가고 추가로 더하고싶으면 git add .
//git add . 하면 workingDirectory에 있떤 파일들을 StagingArea로 옮겨줌 깃에 넣기전에 대기시켜두는곳
//git rm --cached node_modules -r 하면 stagingArea에 있는 것들을 지워줌
// git commit -m "또저장소에 올림" 이파일들이 git repository(Local)에 올라감 그럼 이제 stagingArea에 아무것도 없음