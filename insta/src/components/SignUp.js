import React  from 'react'
import './SignUp.css'
import { toast } from 'react-toastify';
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const SignUp = () => {
 
const Navigate = useNavigate()

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [userName, setUserName] = useState("");
const [password, setPassword] = useState("")

//toast function 
const notifyA=(msg)=>toast.error((msg), {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",})

  const notifyB=(message)=>toast.success((message), {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",})


    const emailragex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passragex=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
const postData=()=>{
/// email checking
if(!emailragex.test(email)){
    notifyA("Invalid Email")
    return
}else if(!passragex.test(password)){
  notifyA("Please Create a Strong Password!!")
  return
}




  //data Sending  to server
  fetch("http://localhost:5000/signup", {
    method:"POST",
    headers:{"Content-Type":"application/json"
  },
  body:JSON.stringify({
    name:name,  
    userName:userName,
    email:email,
    password:password

  })
  }).then(res => res.json())
  .then(data=>{
    if(data.error){
      notifyA(data.error);
    }else{
      notifyB(data.message)
      Navigate('/signIn')
    }
    console.log(data)})
}



  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={logo} alt=" logo" />
          <p className="loginPara">
            Sign up to see photos and videos <br /> from your friends
          </p>
          <div>
            <input type="email" name="email" id="email" value={email}  placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
          <div>
            <input type="text" name="name" id="name"  value={name} placeholder="Full Name" onChange={(e)=>{setName(e.target.value)}}/>
          </div>
          <div>
            <input
              type="text"
              name="userName"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e)=>{setUserName(e.target.value)}}
            
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
             
            />
          </div>
          <p
            className="loginPara"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
            By signing up, you agree to out Terms, <br /> privacy policy and
            cookies policy.
          </p>
         <button className='submit-btn' onClick={()=>{
          postData()
         }}> SignUp</button>
        </div>
        <div className="form2">
          Already have an account ?
          <Link to="/signIn"  style={{color:"blue"}}>
           
           Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
