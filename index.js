//서버를 시작하면 여기서 시작함

const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://psh:psh1234@boilerplate.idmdn.mongodb.net/boilerplate?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(() =>console.log('MongoDB Connected!'))
    .catch(err=> console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})