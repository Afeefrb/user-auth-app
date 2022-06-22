const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv/config");

//Route imports
const authRoutes = require("./Routes/AuthRoutes");

//Express app
const app = express();

//Request body-parser, cookie-parser, cors

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );


//API Route
//Routes to: /api/register AND api/login
app.use("/api", authRoutes);



//PORT, Mongoose, Express server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
 
mongoose.connection.on('connected', () => {
    console.log("Database connected!")
})

app.listen(PORT, () => console.log("Express server is running!"));