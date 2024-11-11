const express = require('express')
const app = express()
const userModel = require('./model/user')
const postModel = require('./model/posts')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get("/",(req,res)=>{
res.send('come on baby')
})

 

app.get('/create',async(req,res)=>{
   let user = await userModel.create({
        username:"manish",
        age:22,
        email:"a@gmail.com"


    })
    res.send(user)
})


app.get('/post/create', async(req,res)=>{
   let postuser = await postModel.create({
        postdata : "sab badiya",
        user : '672b593884842126fc265259',
        

    })
    let user = await userModel.findOne({_id : "672b593884842126fc265259"})
    user.posts.push(postuser._id)
    user.save()
    
     res.send({postuser,user})
 })

app.listen(port,()=>{
    console.log("wah re bsdk")
})

