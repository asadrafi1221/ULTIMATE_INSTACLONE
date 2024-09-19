import React from "react";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { LuUserCircle2 } from "react-icons/lu";
import { IoNotificationsSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

const Mobiles_Navbar = ({ user }) => {
  const navigate = useNavigate();

  const logout = async () => {
    const isConfirmed = window.confirm("Do you really want to logout?");
    if (!isConfirmed) {
      return;
    }

    const token = localStorage.getItem("User_token");
    localStorage.removeItem("User_token");

    try {
      const res = await fetch("http://localhost:3500/auth/logout")
      const data = await res.json();
      console.log(data);
      navigate("/Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {user && (
        <div className="flex fixed bottom-0 left-0 bg-black w-full  higher_index z-20 md:hidden p-5 ">
          <ul className="flex text-white justify-around w-full text-3xl">
            <li onClick={() => navigate("/Home")} className="cursor-pointer">
            <GoHomeFill />
            </li>
            <li  onClick={()=>navigate('/Notification')} className="cursor-pointer">
            <IoNotificationsSharp />
            </li>
            <li onClick={() => navigate("/profile")} className="cursor-pointer">
            <LuUserCircle2 />
            </li>
            <li onClick={logout} className="cursor-pointer">
            <CiLogout />
            </li>
            
          </ul>
        </div>
      )}
    </>
  );
};


export default Mobiles_Navbar;
