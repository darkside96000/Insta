import './App.css';
import React, {createContext,useState} from 'react';
import { LoginContext } from './Context/LoginContext';
import Navbar from "./components/Navbar";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './components/Profile'
import Home from './components/Home';
import Modal from './components/Modal';
import CreatePost from './components/CreatePost';


function App() {
  const [modalopen, setModalopen] = useState(false)

  const [userLogin, setuserLogin] = useState(false)
  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setuserLogin,setModalopen}}>
      <Navbar login= {userLogin} />
   
   <Routes>
   <Route path="/" element={<Home/>}/>
     <Route path="/SignUp" element={<SignUp/>}/>
     <Route path="/SignIn" element={<SignIn/>}/>
     <Route path="/Profile" element={<Profile/>}/>
     <Route path="/CreatePost" element={<CreatePost/>}/>
   </Routes>
   <ToastContainer theme='dark'/>
   {/* <Modal/> */}
   
   {modalopen && <Modal setModalopen={setModalopen}></Modal>}
      </LoginContext.Provider>
     
    </div>
  </BrowserRouter>
    
  );
}

export default App;
