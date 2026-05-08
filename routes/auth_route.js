
const { registerUser,userLogin}=require("../controllers/auth");

const express=require("express")

const routes=express.Router();


routes.post("/users",registerUser);
routes.post("/login",userLogin);

module.exports=routes;