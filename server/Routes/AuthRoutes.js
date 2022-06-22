const express = require("express");
const router = express.Router();

//Route Controllers
const { register, login } = require("../Controllers/AuthControllers");
//Auth Middleware - protected route
const {checkUser} = require("../Middlewares/authMiddleware");


//Route: "/api/[x]"
router.get("/test", (req,res) => {
    res.send("<h1>This is a test API endpoint!</h1>")
})
router.post("/auth", checkUser); 
router.post("/register", register);
router.post("/login", login);

module.exports = router;