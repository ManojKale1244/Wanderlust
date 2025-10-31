const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));


const sessionoptions = {
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
};

app.use(session(sessionoptions));
app.use(flash());

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
 if(name =="anonymous"){
req.flash("error",` ${req.session.name},we have not successfull register`);
 }
 else{
   req.flash("success",` ${req.session.name},we have successfull register`);
 }
 res.redirect("/hello");
});

app.get("/hello", (req, res) => {
   res.locals.messages = req.flash("success");
    res.locals.messages2 = req.flash("error");
     res.render("page.ejs", {name: req.session.name});
    
 
});



// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     }
    
//   res.send(`You send request ${req.session.count} times`);
// });


app.listen(8080,()=>{
    console.log("Server is listing to 8080");
});