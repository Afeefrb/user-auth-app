import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'


export default function HomePage() {

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [name,setName] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast(`Hello, ${data.user}`, {
            theme: "dark",
          });
      }
    };
    verifyUser();

    toast.clearWaitingQueue();
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <>
    <div className="homepage">
      <h1>Home</h1>
      {/* <p>Welcome {name? name:""}, you are logged in.</p> */}
      <p>Welcome  you are logged in.</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
    <ToastContainer limit={1}/> 
    </>
    
  )
}
