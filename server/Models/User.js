const mongoose = require("mongoose");
const  bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: [true, "first name is required"]
    },
    lastName:{
        type:String,
        required: [true, "last name is required"],
    },
    age:{
        type:String,
        required: [true, "age is required"],
    },
    address:{
        type:String,
        required: [true, "address is required"],
    },
    income:{
        type:String,
        required: [true, "income is required"],
    },
    religion:{
        type:String,
        required: [true, "religion is required"],
    },
    caste:{
        type:String,
        required: [true, "caste is required"],
    },
    language:{
        type:String,
        required: [true, "language is required"],
    },
    city:{
        type:String,
        required: [true, "city is required"],
    },
    state:{
        type:String,
        required: [true, "state is required"],
    },
    country:{
        type:String,
        required: [true, "country is required"],
    },
    username:{
        type:String,
        required: [true, "username is required"],
    },
    password:{
        type:String,
        required: [true, "password is required"],
    },
    email:{
        type:String,
        required: [true, "email is required"],
        unique:true
    },
    mobileNo:{
        type:String,
        required: [true, "mobileNo is required"],
        unique:true
    }
    


})

//Hash the password with bcrypt
/*Before saving the password to database, 
this function hashes the password and stores in the DB*/

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
  };
  



module.exports = mongoose.model("Users", userSchema);