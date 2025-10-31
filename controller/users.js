const User = require("../models/user");
module.exports.renderSignupForm = (req,res)=>{
res.render("users/signup.ejs");

};
module.exports.renderLoginForm = (req,res)=>{
   res.render("users/login.ejs");
};
module.exports.Login =  async (req,res)=>{
req.flash("success","Welcome back Wanderlust!");
let redirectUrl = res.locals.redirectUrl || "/listings";
res.redirect(redirectUrl)
};
module.exports.logout =  (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    req.flash("success", "You are logged out!");
    res.redirect("/listings"); 
})
};

module.exports.signup = async (req,res)=>{
    try{
  let {username,email,password} = req.body;
const newUser =new User({email,username});

 const registeredUser = await User.register(newUser,password);
 
console.log(registeredUser,(err)=>{
   if(err){
      return next(err);
   }
   req.flash("success","Welcome to Wanderlust");
 res.redirect("/listings");
});
 res.redirect("/listings");
    } catch(e){
       req.flash("error",e.message);
       res.redirect("/signup");
    }



};