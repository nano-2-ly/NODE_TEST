const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const { User } = require("./models/User")
const mongoose = require('mongoose')
const config = require('./config/key')


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

mongoose.connect(config.mongoURI,{
  useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log("mongoDB connected..."))
  .catch(err=> console.log(err))
  

app.get('/', (req, res) => {
  res.send('Hello World!!!!!!!!!!!!@@@!')
})

app.post('/register', (req,res)=>{
  // 회원가입 시 필요한 정보들을 client에서 가져오면
  // 그것들을 DB에 넣어준다.

  const user = new User(req.body)

  user.save((err, userInfo)=> {
    if (err) return res.json({ success : false, err })
      return res.status(200).json({
        success:true
      })
  })


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)  
})


