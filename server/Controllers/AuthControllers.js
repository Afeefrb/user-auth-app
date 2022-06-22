//User Model
const User = require("../Models/User");

//JSON Web Token
const jwt = require("jsonwebtoken");
require("dotenv/config");

const maxAge = 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_KEY , {
        expiresIn: maxAge,
    })
}

const handleErrors = (err) => {
    let errors = {firstName:"",
    lastName:"",
    age:"",
    address:"",
    income:"",
    religion:"",
    caste:"",
    language:"",
    city:"",
    state:"",
    country:"",
    username:"",
    password:"",
    email:"",
    mobileNo:""};
  
    console.log(err);

    //Error No.1 during user login
    if (err.message === "incorrect email") {
      errors.email = "The email is not registered";
    }
  
    //Error No.2 during user login
    if (err.message === "incorrect password") {
      errors.password = "The password is incorrect";
    }
  
    //Error during user registration
    if (err.code === 11000) {
      errors.email = "Email or Phone No. is already registered";
      return errors;
    }
  
    if (err.message.includes("Users validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  };
  

//Register
module.exports.register = async (req,res,next) => {

    try {
        const {firstName, lastName, age, address, income, religion, caste, language, city, state, country, username, password, email, mobileNo} = req.body;

        const user = await User.create({firstName, lastName, age, address, income, religion, caste, language, city, state, country, username, password, email, mobileNo});
    
        const token = createToken(user._id) ;
    
        res.cookie("jwt", token , {
            withCredentials:true,
            httpOnly:false,
            maxAge : maxAge * 1000
        })
    
        res.status(201).json({username, userId :user._id, created:true})

    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false });

    }
    
};

//Login
module.exports.login = async (req,res,next) => {
  try {
    const {email,password} = req.body;

    const user = await User.login(email,password);

    const token = createToken(user._id) ;

    res.cookie("jwt", token , {
        withCredentials:true,
        httpOnly:false,
        maxAge : maxAge * 1000,
    })

    res.status(201).json({userId :user._id, created:true})

} catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });

}

};