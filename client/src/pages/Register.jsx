import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import axios from 'axios';
import {handleErrorsClientSide} from '../handlers/handleClientSideErrors'

export default function Register() {

  const navigate = useNavigate();

  const [values, setValues] = useState({ 
    firstName:"",
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
    mobileNo:""
  })

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {

      const {data} = await axios.post("http://localhost:5000/api/register", {
        ...values
      }, {withCredentials:true})

      if(data.errors){
       handleErrorsClientSide(data);
      } else {
        navigate("/")
      }
    } catch (err) {
      console.log(err)
    }
  }

   

  return (
    <div className="container">
      <h2>REGISTER ACCOUNT</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" placeholder='First Name'  onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" placeholder='Last Name' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input type="text" name="age" placeholder='Age' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" name="address" placeholder='Address'onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="income">Income (Rs.)</label>
          <input type="text" name="income" placeholder='Income per year' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="religion">Religion</label>
          <input type="text" name="religion" placeholder='Religion' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="caste">Caste</label>
          <input type="text" name="caste" placeholder='Caste' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="language">Language</label>
          <input type="text" name="language" placeholder='Language' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" name="city" placeholder='City' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input type="text" name="state" placeholder='State' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input type="text" name="country" placeholder='Country' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder='Username' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder='Password' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder='Email' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="mobileNo">Mobile No.</label>
          <input type="text" name="mobileNo" placeholder='Mobile No.' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>

        <button type="submit">REGISTER</button>

        <span>Already have an account? <Link to={"/login"}>LOGIN</Link> </span>

      </form>
      <ToastContainer limit={2} />
    </div>
  )
}
