import React from "react";
import "./index.css";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/pages/Home";
import Profile from "./components/Profile";
import Mobiles_Navbar from "./components/Mobile_Navbar";
import Sidebar from "./components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import Users_Profile from "./components/pages/users_profile";
import Notifcation from "./components/Notification/Notifcation";
import Notification from "./components/Notification/Notifcation";


const App = () => {
  const Authuser = useSelector((state) => state.userAuth.isLoggedIn);
  let user = false;
  if(Authuser===true){
    user = true;
  }
  console.log(user)

  return (
    <div className="h-[100vh]">
    <BrowserRouter>
      <Toaster />
      <div className={`${user ? 'flex flex-col sm:flex-row' : 'w-[100vw] h-[100vh]  flex center'}`}>
        <Sidebar className={`${user ? 'hidden md:flex w-[10%] bg-black h-[100vh] flex-col justify-between items-center' : 'hidden'}`} />
        <Mobiles_Navbar user={user} />
        <div className="w-[100%] md:w-[90%] sticky ">
          <Routes>
            <Route path="/signup" element={user ? <Home /> : <SignUp />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/Home" element={!user ? <Login /> : <Home />} />
            <Route path="/" element={!user ? <Login /> : <Home />} />
            <Route path="/profile" element={!user ? <Login /> : <Profile />} />
            <Route path="/Users_Profile" element={!user ? <Login /> : < Users_Profile/>} />
            <Route path="/Notification" element={!user ? <Login /> : < Notification/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </div>
  );
};

export default App;
