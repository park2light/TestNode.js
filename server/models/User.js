const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
//salt가 10자리
const saltRounds = 10
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

userSchema.pre('save',function( next ){
//이 안에 할꺼 다한다음에 이게 끝나면은 next로 넘어감
//비밀번호를 암호화 시킨다.
var user= this; // 지금 이페이지를 가르킴
if(user.isModified('password')){
bcrypt.genSalt(saltRounds,function(err,salt){
    if(err) return next(err)
 
       //이메일같은게 아니라 비밀번호만 바꿀때
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err)
            //user.password 를 hash된 비밀번호로 바꿔줌
            user.password = hash
            next() // index /register로돌아감
        })
    })
        
    }else{
        next()
    }
})

userSchema.methods.comparePassword =function(plainPassword,cb){
    //plainPassword 1234567 암호화된 비밀번호 #$#*FHKLWsdfsdfs
    //암호화를 한다음에 맞는지 체크해야함
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
            //비교해봐서 같으면 콜백
        if (err) return cb(err);
        //이게 user.comparePassword(req.body~~)로 다시감
        cb(null, isMatch);
       
       // if(err) return cb(err),
        //cb(null,isMatch) 
    })

}


userSchema.methods.generateToken = function(cb){

    var user = this;
    //jsonwebToken을 이용해서 토큰 생성하기

    var token = jwt.sign(user._id.toHexString(),'secretToken')

    // user._id +'secretToken' = token
    // ->
    // 'secretToken' -> user._id
    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        //save가 잘 됐으면은 에러는 없고 user정보만 잘 전달해주면됨
        cb(null,user)
        //이 user 정보가 user.generateToken(req.body) 으로 넘어감
    })
}
//만약 안되는 부분있으면 오류나는 부분에서 다시 지우고 저장했따가 똑같은거 다시쓰고 저장해봐..혹시나
userSchema.statics.findByToken = function(token,cb){
    var user = this;
    //user._id +'' = token
    // 토큰을 decode 한다.
    // decoded 된게 나옴 이건 userid임
    jwt.verify(token,'secretToken',function(err,decoded){
        //유저아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id":decoded,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User',userSchema) //스키마를 모델로 감싸줌
module.exports ={ User }; //이 모델을 다른파일에서도 쓸수있게 exprot 해줌
