const express = require ('express')
const app = express()
const port = 3000



const userModel = require ('./usermodel')


app.get('/',(req,res)=>{
    res.send("hello world")
})
app.get('/create',async (req,res)=>{
  let createdUser = await userModel.create(
        {
            name:"manish",
            email: "12manish@gmail.com",
            username: "manish"
        }
    )
    res.send(createdUser)
})


app.get('/update',async (req,res)=>{
    let updatedUser = await userModel.findOneAndUpdate({username: "manish"},{name: "manisha sharma"},{new: true}  )
      res.send(updatedUser)
  })

  app.get('/read',async(req,res)=>{
  let users = await userModel.find()
  res.send(users)
  })

  app.get("/delete", async (req,res) => {
    let deleteUser = await userModel.findOneAndDelete({username:"manish"});
    res.send(deleteUser)
    
  })
  



app.listen(port,()=>{
    console.log('chal gya')
})