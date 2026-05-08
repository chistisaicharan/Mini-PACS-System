
const { registerUser,userLogin}=require("../controllers/auth");

const express=require("express")

const routes=express.Router();

const authMiddleware=require("../middleware/auth.middleware");


routes.post("/users",registerUser);
routes.post("/login",authMiddleware,userLogin);


// Only doctor can access
routes.get(
  "/doctor-dashboard",
  authMiddleware("Doctor"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Doctor",
    });
  }
);


// Doctor and admin both can access
routes.get(
  "/patients",
  authMiddleware("Doctor", "Admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Patient Records",
    });
  }
);

module.exports=routes;