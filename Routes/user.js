const route=require('express').Router();
const user_controller=require("../controller/user");




route.post("/signup",user_controller.signup)
route.post("/login",user_controller.login)




module.exports=route;