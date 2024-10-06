import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { update_id } from "../../redux/GetProfile/getProfile";
import { comment } from "postcss";
import { FaRegComment } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { ReplyonComment } from "../../../../backend/controllers/Posts_controller";
import { IoChevronBackCircle } from "react-icons/io5";

const Home = () => {
  const [data, setData] = useState([]);
  const [likecolor, setlike] = useState(false);
  const [commenstSection, setComment] = useState(false);
  const [displaycomments, setDisplayComments] = useState([]);
  const [userData, setUserData] = useState();
  const [userReplies, setReplies] = useState([]);
  const [displayReplies, setDisplayReplies] = useState(false);

  const arr = [
    {
      name: "Cristiano",
    },
  ];

  const get_id = useSelector((state) => state.getProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseurl = `http://localhost:3500`

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await fetch(`${baseurl}/post/get_allpost`);
        const users = await res.json();
        console.log("these are users : ");
        console.log(users);
        setData(users);
      } catch (err) {
        console.log(err.message);
      }
    };
    getdata();
  }, []);

  const HandleuserLikes = async (e) => {
    const postid = e.target.parentElement.firstElementChild.innerHTML.trim();
    
    const presentUser_id = localStorage.getItem("User_token").trim();

    try {
      const response = await fetch(`${baseurl}/post/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: presentUser_id, postId: postid }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
    } catch (err) {
      console.error(err);
    }
    setlike(!likecolor);

    const likes_para =
      e.target.parentElement.nextElementSibling.querySelector(".user_likes");
      
    let likes_num = likes_para.innerHTML.replace('likes','');
   
    
    console.log(likes_num)
    let num = Number(likes_num);
   
    if (likecolor) {
      num++;
    } else {
      num--;
    }

    e.target.parentElement.nextElementSibling.querySelector(
      ".user_likes"
    ).innerHTML = num.toString();

    e.target.style.transform = "scale(1.3)";
    if (!likecolor) e.target.style.color = "red";
    else e.target.style.color = "white";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 100);
  };

  const getUserProfile = (e) => {
    const _id = e.target.querySelector("p" || ".hidden").innerHTML;
    console.log(_id)
    if (_id) {
      dispatch(update_id(_id));
      localStorage.setItem("User_id", _id);
      navigate("/Users_profile");
    }
  };

  const handleComment = async (e) => {
    const postId = e.target.parentElement.querySelector(".hidden").innerHTML;
    console.log(postId?postId : 'helo there')
    try {
      const res = await fetch(
        `${baseurl}/post/get_specificComments/${postId}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log(data);
      setDisplayComments(data.comments);
      setUserData(data.users);
      console.log(userData);
      console.log(data);
      setComment(true);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const getuser = async () => {
    const id = localStorage.getItem("User_token");
    const userdata = await fetch(
      `${baseurl}/api/users/get_authuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    const user = await userdata.json();
    localStorage.setItem("User_name", user.profileImg);
    console.log(user);
  };

  getuser();

  

  const handleCommentPost = async (e) => {
    const text = e.target.parentElement.querySelector("input").value;
    const postId = e.target.parentElement.parentElement.querySelector('.commentsId').innerHTML.trim()
      console.log(text)
      console.log(postId)
    const userId = localStorage.getItem("User_token").trim();

    if (!text) {
      alert("Please fill in the comment");
      return;
    }

    const dataToSend = { postId, userId, text };

    try {
      const res = await fetch(`${baseurl}/post/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log("Fetching error", err);
    }
  };
  async function openReplies(e, commentId) {
    console.log(commentId);

    localStorage.setItem("commentId", commentId);
    const postId = displaycomments._id;

    const res = await fetch(
      `${baseurl}/post/getreplies/${postId}/${commentId}`
    );
    const data = await res.json();

    console.log("this is replies: ", data);
    setReplies(data);

    setDisplayReplies(true);
  }

  async function postreplies(e) {
    const text = e.target.parentElement.querySelector("input").value;

    if (!text) {
      alert("sorry plz fill the feild");
    } else {
      const userId = localStorage.getItem("User_token");
      const postId = displaycomments._id;
      console.log(postId);
      console.log(userId);
      console.log(text);
      console.log("comment id is  : ");
      console.log(localStorage.getItem("commentId"));
      console.log("postId id is  : ");
      console.log(postId);
      const commentId = localStorage.getItem("commentId");

      try {
        const res = await fetch(`${baseurl}/post/replyoncomment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId, userId, text, commentId }),
        });
        const data = await res.json();
        console.log(data);
        e.target.parentElement.querySelector("input").value = "";
      } catch (err) {
        console.log("fetching error", err);
      }
    }
    setDisplayReplies(false)
  }

  useEffect(() => {
    console.log("Updated displayComments:", displaycomments);
    console.log("updated Userdata", userData);
  }, [displaycomments]);
  useEffect(() => {
    console.log("Updated ", userReplies);
    console.log("Updated comments",userReplies)
  }, [userReplies],[userReplies]);

  
  var i = 0;
  return (
    <>
      <div className="flex  w-[100vw]   md:w-[90vw] lg:max-h-[100vh] overflow-y-hidden lg:w-[80vw]">
        <div className="all_section overflow-x-hidden  bg-black w-[100vw]   md:w-[90vw]  sm:max-h-[100vh]">
          <div className="bg-black border_bottom flex w-[100vw] justify-between items-center h-16 p-1 gap-2 md:hidden ml-2 mr-2">
            <em className="font-sans text-white font-bold">SahilKuana</em>
            <div className="flex items-center justify-center gap-3 sm:gap-5 pr-8">
              <input
                className="bg-gray-600 h-8  rounded-md p-3 text-white w-44"
                placeholder="Search"
              ></input>
              <p>
                <CiHeart />
              </p>
            </div>
          </div>
          <div className="w-[100vw] md:w-[90vw] flex items-center justify-center"></div>
          <div className="flex-1 max-h-[85vh] overflow-y-auto sm:max-h-[100vh] ">
            {data.map((ele, index) => (
              <div
                className="flex flex-col   sm:items-center sm:justify-center"
                key={index}
              >
                <div className="  sm:p-1 flex flex-col">
                  <div
                    className="flex items-center  p-4 justify-between  user md:w-[500px]"
                    onClick={(e) => getUserProfile(e)}
                  >
                    <p className="hidden">{ele.user ? ele.user._id : "4591"}</p>
                    <div className="flex gap-3 items-center">
                      {ele.user && ele.user.profileImg ? (
                        <img
                          className="h-10 w-10 rounded-full bg-black  border-gradient-to-r from-blue-700 to-blue-800"
                          src={`${baseurl}/${ele.user.profileImg}`}
                        />
                      ) : (
                        <p className="h-10 w-10 rounded-full bg-black  border-gradient-to-r from-blue-700 to-blue-800 flex items-center justify-center">
                          {ele.user.username.charAt(0)}
                        </p>
                      )}

                      <p className="font-bold text-white text-sm flex justify-start">
                        {ele.user ? ele.user.username : "helo"}
                      </p>
                    </div>
                    <p className="font-bold text-white flex justify-start text-xl">
                      {"..."}
                    </p>
                  </div>
                  <div className="">
                    {ele.Image ? (
                      <img
                        src={`${baseurl}/${ele.Image}`}
                        className={`h-[60vh] object-contain bg-black text-3xl font-extrabold center  sm:rounded-md  sm:w-[500px]`}
                      />
                    ) : (
                      <p className="h-[60vh]   bg-black text-3xl font-extrabold center  sm:rounded-md sm_border sm:w-[500px]">
                        {ele.text}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col p-4 text-white gap-1 ">
                    <div className="flex gap-3 items-center">
                      <p className="hidden">{ele._id}</p>
                      <IoIosHeartEmpty
                        className={"likes text-3xl text-white"}
                        onClick={(e) => HandleuserLikes(e)}
                      />

                      <FaRegComment
                        onClick={(e) => handleComment(e)}
                        className="text-3xl"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="user_likes">{ele.likes.length} likes</p>
                      <p className="text-gray-400">
                        {ele.comments.length <= 0} view all{" "}
                        {ele.comments.length} comments
                      </p>
                    </div>
                    <div>
                      <p className="text-white flex items-center mt-1 gap-3">
                        <spam className="font-bold">{ele.user.username}</spam>
                        {ele.desc ? ele.desc : ele.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))} 
          </div>
        </div>
      </div>
      <div className="w-[100vw] md:w-[90vw] lg:w-[80vw] flex justify-center items-center">
        <div
          className={`bg-gray-600 absolute bottom-0  w-[100vw]    md:w-[550px] z-50 duration-500 flex flex-col transition-all border_curvetop md:rounded-xl md:transition-none md:bottom-28 justify-between  ${
            commenstSection ? "h-[77vh]" : "h-[0vh]"
          }`}
        >
          <div
            className="w-full flex items-center justify-center mt-5 border_bottom p-2 text-white font-bold"
            onClick={() => setComment(false)}
          >
            <div className="flex  text-xl w-full items-center justify-center md:justify-start md:text-3xl">
            <IoChevronBackCircle className='hidden md:flex mb-3'/>
            <p className="md:hidden">Comments</p>
            </div>
          </div>
          <div className="flex-1 max-h-[63vh] overflow-y-auto ">
         
            {commenstSection && displaycomments ? (
              displaycomments.comments.map((ele, index) => (
                <div className="p-5 border_bottom" key={index}>
                  
                  {console.log(index)}
                  <p className="hidden">{displaycomments._id}</p>
                  <div className="flex justify-between w-full items-center ">

                    <div
                      className="flex items-center gap-5   w-full"
                      onClick={(e) => getUserProfile(e)}
                    >
                        
                      <p className="hidden">{userData[index]._id}</p>
                      {displaycomments.Image ? (

                        <img
                          className="h-10 w-10 rounded-full bg-black border flex items-center justify-center object-cover"
                          src={`${baseurl}/${userData[index].profileImg}`}
                          alt="User Avatar"
                        />
                      ) : (
                        <p className="h-10 w-10 rounded-full bg-black border flex items-center justify-center">
                          {userData[index].username.charAt(0)}
                        </p>
                      )}

                      <div className="">
                        <p className="text-white font-bold">
                          {userData[index].username}
                        </p>
                        <p>{ele.text}</p>
                      </div>
                    </div>
                    <div className="">
                      <p>🧡</p>
                    </div>
                  </div>
                  <div className="flex w-full gap-5 ml-14 text-[13px] ">
                    <p>7 w</p>
                    <p>121 likes</p>

                    <p>reply {ele.reply.length}</p>
                  </div>
                  <div className="flex flex-col ">
                    <div
                      className={`${
                        userData
                          ? "flex flex-col text-white text-[12px] mt-3 "
                          : "hidden"
                      }`}
                    >
                      <p className="hidden">{ele._id}</p>
                    

                      <p
                        onClick={(e) =>
                          openReplies(
                            e,
                            e.target.parentElement.querySelector(".hidden")
                              .innerHTML
                          )
                        }
                        className="w-full flex justify-end"
                      >
                        view all replies
                      </p>

                      <div className="h-8  items-center w-full justify-center gap-5 mt-4 takereply hidden ">
                        <p className="h-8 w-8 flex rounded-[50%] bg-black border  items-center justify-center ">
                          {"h"}
                        </p>

                        <input
                          className="w-[70%] rounded-xl h-[90%]  p-1 outline-none"
                          placeholder="add a coment"
                        />
                        <button
                          className="text-blue-500 "
                          onClick={(e) => postreplies(e)}
                        >
                          reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-2xl text-white font-extralight">
                  User Have no Comments yet
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-around  h-16  ">
            <p className="hidden commentsId">{displaycomments._id}</p>
            {localStorage.getItem("User_name") ? (
              <img
                className="h-10 w-10 rounded-[50%] bg-black  flex items-center justify-center"
                src={`${baseurl}/${localStorage.getItem("User_name")}`}
              />
            ) : (
              <p className="h-10 w-10 rounded-[50%] bg-black border flex items-center justify-center">
                {"Helo"}
              </p>
            )}
            <input
              className="w-[70%] rounded-xl p-2"
              placeholder="add a coment"
            />
            <button
              className="text-blue-500 "
              onClick={(e) => handleCommentPost(e)}
            >
              post
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          displayReplies
            ? "flex h-[90vh] w-[100vw] i-c justify-center absolute top-0 z-50 items-center  md:w-[90vw] lg:w-[80vw]"
            : "hidden"
        }`}
      >
        
        <div
          className={`${
            displayReplies
              ? "flex-1 absolute  w-[90%] max-h-[60vh] overflow-y-auto overflow-x-hidden bg-black rounded-xl p-5 md:w-[550px]"
              : "hidden"
          }`}
        >
          <p onClick={()=>setDisplayReplies(false)} className="text-2xl text-white">{'<'}</p>
        
          {displayReplies && userReplies.map((ele,index) => (
           
            <div className="flex h-auto p-5 gap-3 " key={index} onClick={(e)=>getUserProfile(e)}>
              <p className="hidden">{ele.user}</p>
              <img
                src={`${baseurl}/${ele.profileImg}`}
                className="h-10 w-10 rounded-[50%] object-cover"
              />

              <div className="flex flex-col  gap-2">
                <p className="text-white font-bold">{ele.username}</p>
               <p>{ele.text}</p>
              </div>
             
            </div>
  
          ))}
      
          <div className="flex items-center  justify-center gap-3 mt-3  z-50">
          {localStorage.getItem('User_name') ? <img  src={`${baseurl}/${localStorage.getItem('User_name')}`}className="h-8 w-8 rounded-[50%] bg-black  border flex items-center justify-center"  /> : <p className="h-8 w-8 rounded-[50%] bg-black  border flex items-center justify-center">{'H'}</p>}
          
            <input
              className="w-[70%] rounded-xl p-1 outline-none"
              placeholder="add a reply"
            />
            <button 
              className="text-blue-500 "
              onClick={(e) => postreplies(e)}
            >
              post
            </button>
          </div>
        </div>
        
      </div>
      
    </>
  );
};

export default Home;
