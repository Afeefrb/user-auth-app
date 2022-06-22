import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import axios from 'axios';
import {handleErrorsClientSide} from '../handlers/handleClientSideErrors'

export default function Register() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email:"",
    password:"",
  })

    const handleSubmit = async(e) => {
    e.preventDefault();
    try {

      const {data} = await axios.post("http://localhost:5000/api/login", {
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
    <div className="login-container">
      <h2>LOGIN</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
      <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder='Email' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder='Password' onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
        </div>

        <button type="submit">LOGIN</button>

        <span>Don't have an account? <Link to={"/register"}>REGISTER</Link> </span>

      </form>
      <ToastContainer limit={2} />
    </div>
  )
}
