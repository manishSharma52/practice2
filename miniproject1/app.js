const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const upload = require("./utils/multer");
const path = require("path");
const bcrypt = require("bcrypt");

const userModel = require("./models/user");
const postModel = require("./models/post");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile/upload", (req, res) => {
  res.render("profileupload");
});

app.post("/upload", isLoggedIn, upload.single("image"), async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.profilepic = req.file.filename;
  await user.save();
  res.redirect("/profile");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("post");

  res.render("profile", { user });
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");

  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }

  console.log(req.user.userid);
  await post.save();
  res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");

  res.render("edit", { post });
});

app.post("/update/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { contant: req.body.contant }
  );

  res.redirect("/profile");
});

app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { contant } = req.body;

  let post = await postModel.create({
    user: user._id,
    contant,
  });
  user.post.push(post._id);
  await user.save();
  res.redirect("/profile");
});

app.post("/register", async (req, res) => {
  let { email, username, age, password, name } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("user already register");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      await userModel.create({
        name,
        username,
        age,
        email,
        password: hash,
      });
      let token = jwt.sign(
        {
          email: email,
          userid: user._id,
        },
        "nnnmmmmmmnnnnn"
      );
      res.cookie("token", token);
      res.send("registered");
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    return res.status(500).send("something went wrong");
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) {
      let token = jwt.sign(
        { email: email, userid: user._id },
        "nnnmmmmmmnnnnn"
      );
      res.cookie("token", token);

      res.status(200).redirect("/profile");
    } else res.redirect("/login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("login");
});

function isLoggedIn(req, res, next) {
  // console.log(req.cookies)

  if (req.cookies.token === "") res.redirect("/login");
  else {
    let data = jwt.verify(req.cookies.token, "nnnmmmmmmnnnnn");
    req.user = data;
    next();
  }
}

app.listen(port, () => {
  console.log("jeene de bhai ");
});
