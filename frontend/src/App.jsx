import React from "react";
import "./index.css";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Profile from "./components/Profile";
import Mobiles_Navbar from "./components/Mobile_Navbar";
import Sidebar from "./components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import Users_Profile from "./components/pages/users_profile.jsx";
import Notification from "./components/Notification/Notifcation";
import Chat from "./components/pages/Chat/Chat";
import MessageSection from "./components/pages/Chat/MessageSection";




const App = () => {
  const Authuser = useSelector((state) => state.userAuth.isLoggedIn);
  let user = false;
  if(Authuser===true){
    user = true;
  }
  console.log(user)
  console.log(document.querySelector('Mobile_Navbar'))

  return (
    <div className="h-[100vh]">
    <BrowserRouter>
      <div className={`${user ? 'flex flex-col sm:flex-row' : 'w-[100vw] h-[100vh]  flex center'}`}>
        <Sidebar className={`${user ? 'hidden md:flex  md:w-[10%] lg:w-[20%] bg-black h-[100vh] flex-col justify-between items-center right-border' : 'hidden'}`} />
        <Mobiles_Navbar user={user} className='mobilenav'/>
        <div className="w-[100%] md:w-[90%] sticky ">
          <Routes>
            <Route path="/signup" element={user ? <Home /> : <SignUp />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/Home" element={!user ? <Login /> : <Home />} />
            <Route path="/" element={!user ? <Login /> : <Home />} />
            <Route path="/profile" element={!user ? <Login /> : <Profile />} />
            <Route path="/Users_Profile" element={!user ? <Login /> : < Users_Profile/>} />
            <Route path="/Notification" element={!user ? <Login /> : < Notification/>} />
            <Route path="/ChatPage" element={!user ? <Login /> : < Chat/>} />
            <Route path="/MessageSection" element={!user ? <Login /> : < MessageSection/> } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </div>
  );
};

export default App;
