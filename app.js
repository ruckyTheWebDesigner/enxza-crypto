//jshint esversion:6
// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
// const https = require("https");
const mongoose = require("mongoose");
// const session = require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
const date = require("./public/config/date");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://admin:daniel080@cluster0.p9zcb.mongodb.net/userDB?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  console.log("connected successfully");
}

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/usersaccountDB", {
//   useNewUrlParser: true,
// });

const usersSchema = {
  fname: String,
  lname: String,
  email: String,
  password: String,
  country: String,
};

const User = mongoose.model("User", usersSchema);

app.get("/", function (req, res) {
  res.render("home", { copyright: date });
});

app.get("/login", function (req, res) {
  res.render("login", { copyright: date });
});

app.post("/login", function (req, res) {
  const userID = req.body.email;
  const password = req.body.password;

  User.findOne({ email: userID, password: password }, function (err, user) {
    if (user) {
      // console.log("Found user");
      res.render("/welcome", {});
    } else {
      console.log("No user found");
    }
  });
});

app.get("/register", function (req, res) {
  res.render("register", { copyright: date });
});

app.post("/register", function (req, res) {
  const user = new User({
    fname: req.body.fName,
    lname: req.body.lName,
    email: req.body.email,
    username: req.body.userName,
    password: req.body.password,
    country: req.body.country,
  });

  // user.save(function (err) {
  //   if (!err) {
  //     res.redirect("/welcome");
  //   } else {
  //     res.redirect("/register");
  //   }
  // });
  console.log(user);
});

app.get("/welcome", function (req, res) {
  console.log(req.body);
  res.render("welcome");
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  // Post.findOne({ _id: requestedPostId }, function (err, post) {
  //   res.render("post", {
  //     title: post.title,
  //     content: post.content,
  //   });
  // });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.listen(port, function () {
  console.log("Server started on port 3000");
});
