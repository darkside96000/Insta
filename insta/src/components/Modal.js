import React from 'react';
import './Modal.css';
import { Navigate, useNavigate } from 'react-router-dom';
import {RiCloseLine} from 'react-icons/ri';

export default function Modal({setModalopen}) {
    const navigate=useNavigate()
  return (
    <div className="darkbg" onClick={()=>setModalopen(false)}>
        <div className="centered">
         <div className='modal'>
        {/* modal-header */}
        <div className="modal-header">
            <h5 className='heading'>Confirm</h5>
        </div>
        <button className='closebtn1' onClick={()=>setModalopen(false)}>
            <RiCloseLine></RiCloseLine>        
        </button>
        {/* model-content */}
        <div className="modalcontent">
            Are you Really wanna logout?
        </div>
        <div className="modalaction">
            <div className="actioncontainer">
                <button className="logoutbtn" onClick={()=>{
                    setModalopen(false);
                    localStorage.clear()
                    navigate("./SignIn");
                }}>Logout</button>
                <button className="cancelbtn">Cancel</button>
            </div>
        </div>
      
    </div>
    </div>
    </div>
    
   
  )
}
