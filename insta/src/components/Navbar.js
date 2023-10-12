import React  from 'react'
import { Link, NavLink } from 'react-router-dom';
import logo from '../images/logo.png';
import "./Navbar.css";
import { LoginContext } from '../Context/LoginContext';
import { useContext } from 'react';

const Navbar = ({login}) => {
  const{setModalopen}=useContext(LoginContext)


  const loginStatus=()=>{
    const token = localStorage.getItem("jwt");
    if(login||token){
      return[
        <>
         <li> <NavLink className="aa" to='/'>home</NavLink></li>
         <li> <NavLink className="aa" to='./Profile'>Profile</NavLink></li>
        <li> <NavLink className="aa" to='./CreatePost'>Create Post</NavLink></li>
       <Link to={""}>
        <button className='primaryBtn' onClick={()=>setModalopen(true)}>Logout</button>
       </Link>
        </>
      ]
    }else{
      return[
        <>
       
        <li> <NavLink className="aa" to='./SignUp'>SignUp</NavLink></li>
        <li> <NavLink className="aa" to='./SignIn'>SignIn</NavLink></li>

        </>
      ]

    }
  }
  return (
    <div className='navbar'>
      <img className='aa' src={logo} alt ="logo"/>
      <ul>

        {loginStatus()}
       

      </ul>


    </div>
  );
};

export default Navbar;
