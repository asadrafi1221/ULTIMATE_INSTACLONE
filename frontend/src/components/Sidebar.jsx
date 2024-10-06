import React from "react";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { LuUserCircle2 } from "react-icons/lu";
import { IoNotificationsSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { IoChatbubbleOutline } from "react-icons/io5";

const Sidebar = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div className={`${className} `}>
      <div className=" text-white flex flex-col  lg:gap-10 gap-20  items-center   w-full h-[70%] lg:h-full">
        <div className="text-sm font-extralight lg:ml-3 lg:w-[90%] mt-10 lg:text-2xl lg:font-bold">
          <p>
            <em>asadGram</em>
          </p>
        </div>
        <div className="flex flex-col gap-5  justify-center lg:w-[90%] ">
          <p
            className="text-white font-bold text-xl flex lg:gap-3 md:text-md  items-center box"
            onClick={() => navigate("/Home")}
          >
            <GoHome className="md:text-xl lg:text-3xl" />
            <p className="hidden lg:block font-extralight">home</p>
          </p>
          <p
            className="text-white font-bold text-xl flex lg:gap-3 md:text-xl items-center box"
            onClick={() => navigate("/profile")}
          >
            {" "}
            <LuUserCircle2 className="md:text-xl lg:text-3xl" />
            <p className="hidden lg:block font-extralight">Profile</p>
          </p>
          <p
            className="text-white font-bold text-xl flex lg:gap-3 md:text-xl items-center box"
            onClick={() => navigate("/Notification")}
          >
            <IoNotificationsSharp className="md:text-xl lg:text-3xl" />
            <p className="hidden lg:block font-extralight">Notification</p>
          </p>
          <p
            className="text-white font-bold text-xl flex lg:gap-3 md:text-md items-center box"
            onClick={() => navigate("/Chatpage")}
          >
            {" "}
            <IoChatbubbleOutline className="md:text-xl lg:text-3xl" />
            <p className="hidden lg:block font-extralight">Chat</p>
          </p>
          <p
            className="text-white font-bold text-xl flex lg:gap-3 md:text-xl items-center box"
            onClick={() => navigate("/Home")}
          >
            <CiLogout className="md:text-xl lg:text-3xl" />
            <p className="hidden lg:block font-extralight p-1">Log Out</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
