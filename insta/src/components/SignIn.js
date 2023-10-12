import React, { useState , useContext} from 'react'
import './SignIn.css';
import { LoginContext } from '../Context/LoginContext';
import { toast } from 'react-toastify';
import logo from '../images/logo.png';
import { Link , useNavigate} from 'react-router-dom';
const SignIn = () => {

 const{setuserLogin}=useContext(LoginContext) 
const Navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
//toast Function:
  const notifyA=(msg)=>toast.error(msg)
  
  const notifyB=(message)=>toast.success(message)

  //Ragex
  const emailragex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  const postData=()=>{
    /// email checking
    if(!emailragex.test(email)){
        notifyA("Invalid Email")
        return
    }
    
      //data Sending  to server
      fetch("http://localhost:5000/SignIn", {
        method:"POST",
        headers:{"Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password
    
      })
      }).then(res => res.json())
      .then(data=>{
        if(data.error){
          notifyA(data.error);
        }else{
          notifyB("Signed In Successfully")
          //local create post ka work
          console.log(data)
          localStorage.setItem("jwt",data)
          setuserLogin(true);
          Navigate('/')
        }
        console.log(data)})
    }

  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
          <img className="signUpLogo" src={logo} alt="logo" />
          <div>
            <input type="email" name="email" id="email"
              placeholder='Username or Email' value={email}
              onChange={(e) => { setEmail(e.target.value) }}/>
            
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}

            />
          </div>
          <button className='sb' onClick={()=>{postData()}}> Sign In</button>
        </div>
        <div className="loginForm2">
          Don't have an account ?
          <Link to="/SignUp" style={{ color: "blue", cursor: "pointer" }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn;
