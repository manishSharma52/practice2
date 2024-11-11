const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const userModel = require("./models/userModel");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

// app.get('/read',(req,res)=>{
//     let users = userModel.find()
//     res.render('read',{users:users || []})
// })

app.get("/read", async (req, res) => {
  try {
    const users = await userModel.find(); // Fetch all users from the database
    res.render("read", { users: Array.isArray(users) ? users : [] }); // Ensure `users` is an array
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/delete/:id", async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});
app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user });
});

app.post("/update/:userid", async (req, res) => {
  let { name, email, image } = req.body;
  let user = await userModel.findOneAndUpdate(
    { _id: req.params.userid },
    { name, email, image },
    { new: true, runvalidators: true }
  );
  res.redirect("/read");
});

app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  let createUser = await userModel.create({
    name,
    email,
    image,
  });

  res.redirect("/read");
});

app.listen(port, () => {
  console.log("fir aa gya");
});
