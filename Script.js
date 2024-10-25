const express = require ("express")
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.set ('view engine','ejs')

app.get('/',(req, res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index",{files:files})
    })
   

})
   
app.get('/file/:filename',(req, res)=>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8",(err,filedata)=>{
        res.render('show', {filename: req.params.filename, filedata:filedata})
    })
   

})

app.get('/edit/:filename',(req, res)=>{
        res.render('edit', {filename: req.params.filename})
   

})




app.post('/create',(req, res)=>{
fs.writeFile(`./files/${req.body.title.split(' ').join(' ')}.txt`, req.body.details,(err)=>{
    res.redirect("/")
})

})

app.post('/edit',(req, res)=>{
fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err)=>{
res.redirect("/")
})
// console.log(res.body)
})

// app.get('/profile/:username',(req, res)=>{
    
//     res.send(req.params.username)

// })


app.listen(port,()=>{
    console.log("bhai chal gya")
})