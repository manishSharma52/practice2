const cookieParser = require("cookie-parser");
const express = require("express");
const userModel = require("./model/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const path = require("path");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/create", async (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        email,
        password : hash,
        age,
      });
      let token = jwt.sign({email}, 'sssseewwwwxdffew')
      res.cookie("token",token)

      res.send(user);
    });
  });
});

app.get('/login',(req,res)=>{
    res.render('login')

});


app.post('/login',async(req,res)=>{
   let user = await userModel.findOne({email:req.body.email})
   if (!user) return res.send("something went wrong")
//    console.log(user.password)
   bcrypt.compare(req.body.password,user.password,(err, result)=>{
        if (result) {
            let token =jwt.sign({email:user.email},"hhohhhhuhohooiiojijijii")
            res.cookie("token",token)
            res.send("now you can log in")
            
        } else {
            res.send("something is wrong")
        }
   })


})

app.get('/logout',(req,res)=>{
    res.cookie("token","")
    res.redirect('/')
})

app.listen(port, () => {
  console.log("fir se aa gya tu");
});
