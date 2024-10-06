import React, { useEffect, useState  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageSection from "./MessageSection";
import { update_user } from "../../../redux/Chat/chatuser.js";
import { useSelector, useDispatch } from "react-redux";


export default function Chat() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const baseurl = `http://localhost:3500`;

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const token = localStorage.getItem("User_token");
        const response = await axios.get(
          `${baseurl}/api/users/FollowingFollowers/${token}`
        );

        setData(response.data.data.following);
        console.log(response.data.data.following); 

      } catch (err) {
        console.error("Error fetching followers:", err.message);
      }
    };

    getFollowers();
  }, []); 

  const HandleMessageSection = (e) =>{
    console.log(e.target)
  const id = e.target.querySelector('.hidden').innerHTML
  const username = e.target.querySelector('.username').innerHTML
  const profileImg = e.target.querySelector('img').src;
  console.log(id,username,profileImg)
 
  const data = {username,profileImg,id}
  dispatch(update_user(data))
  
  navigate('/MessageSection')
   
  }
 
  return (
   <div className="flex flex-col md:items-center md:justify-center">
    <div className="max-h-[90vh]   overflow-auto  md:max-h-[100vh] md:h-[100vh] w-[100w] md:w-[600px]">
      <div className=" bg-black p-3 flex justify-between ">
        <p className="text-xl">{""}</p>
        <p className="text-white font-bold text-xl">{"asad_codes"}</p>
        <p>{""}</p>
      </div>
      <div className="flex flex-col items-center justify-center w-[30%]  p-4 mt-5">
        <img
          className=" h-20 w-20 rounded-[50%] object-cover"
          src={`${baseurl}/${localStorage.getItem("User_name")}`}
          alt="User Profile"
        />
        <p className="text-sm">Your note</p>
      </div>
      <div className="p-4 flex flex-col">
        <p className="text-white font-bold text-md">{"Messages"}</p>
        {data &&
          data.map((ele) => (
            <div
              className="mt-8 flex flex-col items-center justify-center gap-5 " 
              key={ele._id}
            >
              <div className="flex  items-center gap-3 w-[100%]  rounded-xl md:bg-gray-800 md:p-5" onClick={(e)=>HandleMessageSection(e)}>
                <p className="hidden">{ele._id}</p>
                <img
                  className="h-14 w-14 rounded-[50%] object-cover "
                  src={`${baseurl}/${ele.profileImg}`}
                  alt={`${ele.username}'s profile`}
                />
                <div className="flex flex-col justify-center">
                  <p className=" text-white username">{ele.username}</p>
                  <p>{ele.bio}</p>
                </div>

              </div>          
            </div>
            
          ))}
      </div>
    </div>
    </div>
    
   
  );
}
