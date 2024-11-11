const express = require('express')
const app = express()
const port = 3000
// const bcrypt= require ('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
app.use(cookieParser())


app.get('/',(req,res)=>{
    // res.cookie("name","Manish")

    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("jai ho", salt, function(err, hash) {
    //         console.log(hash)
    //     });
    //     bcrypt.compare("jai ho", "$2b$10$JHNo6mwvS9xaeJkMAgsnhOkV5UWv4TA1R7k5ac1IVWbWgFVyWvlLi", function(err, result) {
            
    //         console.log(result);
            
    //     });
    // });
  let token =  jwt.sign({email : "manish@hotmail.com"},"wdknnufu4d1wlklkqkkeo3odmeknffwko336566272efejfjehhjh")
  res.cookie("token", token)
  console.log(token)
  res.send("done")
})

app.get('/read',(req,res)=>{
    res.send("sahi h ")
const data =jwt.verify(req.cookies.token,"wdknnufu4d1wlklkqkkeo3odmeknffwko336566272efejfjehhjh")
 console.log(data);

})

app.listen(port,()=>{
    console.log("chal gya bhadve")
})