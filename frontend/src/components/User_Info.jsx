import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Display_FollowUnfollow from "./Notification/display_FollowersUnfollowers";

const User_Info = ({
  name,
  postCount,
  button_class,
  setposttook,
  fullname,
  setedit,
  following,
  followers,
  set_Class,
  followingUsersLength,
  followersLength,
  bio,
  profile,
  user_id,
  postLength,
  isFollowed,
}) => {
  const [userFollowers, setFollowers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [userFollowing, setUserFollwing] = useState([]);
  const [displayFolllowing, setFollowing] = useState(false);
  const [profileimg, setProfileImg] = useState();

  console.log(user_id);
  if (profile) {
    user_id = localStorage.getItem("User_token");
  }
  if (postCount === "1") {
    postCount = "";
  }
  const user = localStorage.getItem("User_token");
  console.log(user);
  console.log(postLength);
  useEffect(() => {
    const GetPresenTuser = async () => {
      const res = await fetch("http://localhost:3500/api/users/get_authuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user }),
      });

      const presentUser = await res.json();

      console.log(presentUser);
      if (presentUser && presentUser.profileImg) {
        setProfileImg(presentUser.profileImg);
      }
      console.log(profileimg)
      console.log(presentUser.profileImg)
      const findFollower = presentUser.folllowing.map((ele) => {
        return ele;
      });
      console.log(findFollower);
      const alreadyFollowed = findFollower.find((ele) => ele === user_id);
      console.log(alreadyFollowed);

      console.log(isFollowed);

      if (alreadyFollowed) {
        document.querySelector(".following").innerHTML = "Unfollow";
        document.querySelector(".followedby").innerHTML = "Unfollow";
      } else {
        document.querySelector(".following").innerHTML = isFollowed;
        document.querySelector(".followedby").innerHTML = isFollowed;
      }
    };
    GetPresenTuser();
    console.log(" i am called");
  }, []);

  //////////////////////////////////////function to handle follow unfollow user/////////////////////////////////
  const handleFollowUnfollow = async () => {
    try {
      const res = await fetch("http://localhost:3500/api/users/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user, id: user_id }),
      });
      const message = await res.json();
      console.log(message.message);

      alert(message.message);
    } catch (err) {
      alert(err);
    }
  };

  const displayFollowers = async () => {
    const url = `http://localhost:3500/api/users/users_followers/`;
    try {
      const response = await fetch(
        `${url}${localStorage.getItem("User_token")}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log(data);
      setFollowers(data);
      setIsVisible(true);
    } catch (err) {
      console.log("Error fetching followers:", err);
    }
  };
  const displayFollowingUser = async () => {
    const url = `http://localhost:3500/api/users/users_following/`;
    try {
      const response = await fetch(
        `${url}${localStorage.getItem("User_token")}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log(data);
      setUserFollwing(data);
      setFollowing(true);
    } catch (err) {
      console.log("Error fetching followers:", err);
    }
  };
  const baseurl = "http://localhost:3500";

  const navigate = useNavigate();
  return (
    <>
      <div className="w-[100vw]  flex flex-col flex-start text-white bg-black md:hidden ">
        <div className="bg-black h-12  p-3 text-2xl font-extrabold md:hidden border_bottom  w-[100vw]  md:w-[900px] flex items-center ">
          <p onClick={() => navigate("/Home")}>{"<"}</p>
          <div className="w-full flex items-center justify-center">
            <p className="font-extralight text-sm ">
              {fullname ? fullname : name}
            </p>
          </div>
        </div>
        <div className="p-3  bg-black h-32">
          <div className="h-24 flex items-center ">
            <div className="flex gap-4 items-center ">
              <div className="bg-gradient-to-r from-red-700 via-blue-400 to-black border  border-spacing-3 w-20 h-20 rounded-[50%] flex items-center justify-center text-sm font-extralight">
              {profileimg ? (
        <img src={`${baseurl}/${profileimg}`} />
      ) : (
        <p>{'helo'}</p>
      )}
              </div>
              <div className="flex flex-col h-20 justify-between">
                <p className="text-sm sm:text-xl">
                  {name ? name : "cristiano"}
                </p>
                <div
                  className={`${user_id === user ? "hidden" : "flex gap-3"}`}
                >
                  <button
                    className="bg-gray-800 rounded-md w-32 text-white flex items-center justify-center p-1 following"
                    onClick={() => handleFollowUnfollow()}
                  >
                    {isFollowed}
                  </button>
                  <button className="bg-gray-800 rounded-md w-24 text-white  flex items-center justify-center">
                    Message
                  </button>
                </div>
                <div
                  className={`${user_id !== user ? "hidden" : "flex gap-3"}`}
                >
                  <button
                    className="bg-gray-800 rounded-md w-32 text-white flex items-center justify-center p-1"
                    onClick={() => setedit(true)}
                  >
                    edit profile
                  </button>
                  <button
                    className="bg-gray-800 rounded-md w-24 text-white  flex items-center justify-center"
                    onClick={() => set_Class("h-[93vh]")}
                  >
                    create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 text-sm pb-5 border_bottom ">
          <p>{fullname ? fullname : name}</p>
          <p>{bio && bio}</p>
          <p className="underline">
            <span className="no-underline">🥨</span>{" "}
            https://www.youtube.com/watch?v=R657sMICd4M
          </p>
        </div>
        <div className="w-[100vw] md:w-[90vw] flex items-center justify-center text-sm lg:w-[900px]">
          <div className="w-[35%] flex flex-col items-center justify-center h-16">
            <p className="font-bold">
              {postLength && postLength}
              {postCount && postCount}
            </p>
            <p className="text-gray-500">posts</p>
          </div>
          <div className="w-[35%] flex flex-col items-center justify-center">
            <p className="font-bold" onClick={() => displayFollowers()}>
              {followersLength && followersLength.length}
              {followers && followers.length}
            </p>
            <p className="text-gray-500">follower</p>
          </div>
          <div className="w-[35%] flex  flex-col items-center justify-center">
            <p className="font-bold" onClick={() => displayFollowingUser()}>
              {followingUsersLength && followingUsersLength.length}
              {following && following.length}
            </p>
            <p className="text-gray-500">following</p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-[90vw] lg:w-[900px] p-10 items-center gap-20 h-64 text-white overflow-hidden">
        <div className="">
          <p className="h-40 w-40 border-2 rounded-[50%] bg-gradient-to-r from-red-500 to-blue-900 font-extralight text-xl flex items-center justify-center ">
          {profileimg ? (
        <img src={`${baseurl}/${profileimg}`} />
      ) : (
        <p>{'helo'}</p>
      )}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between gap-10">
            <p className="text-xl">{name}</p>
            <div className={`flex gap-5 `}>
              <div className={`${user_id === user ? "flex gap-5" : "hidden"} `}>
                <button
                  className="bg-blue-500 rounded-md w-32 text-white flex items-center justify-center p-1"
                  onClick={() => setedit(true)}
                >
                  edit profile
                </button>
                <button
                  className="bg-blue-500 rounded-md w-24 text-white  flex items-center justify-center"
                  onClick={() => set_Class("h-[90vh]")}
                >
                  create
                </button>
              </div>
              <div className={`${user_id !== user ? "flex gap-4" : "hidden"}`}>
                <button
                  className="bg-blue-500 rounded-md w-32 text-white flex items-center justify-center p-1 followedby"
                  onClick={() => handleFollowUnfollow()}
                >
                  {isFollowed}
                </button>
                <button className=" bg-blue-500 rounded-md w-24 text-white  flex items-center justify-center">
                  Message
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <p>{fullname}</p>
            <p>{bio}</p>
            <p>Helo welcome to my Profile</p>
            {/* <p className="underline">
              <span className="no-underline">🥨</span>{" "}
             {}
            </p> */}
          </div>
        </div>
      </div>
      <div className="flex gap-10 p-5  uppercase text-sm bg-black">
        <p className="border_bottom">Post</p>
        <p>Reels</p> <p>tagged</p>
      </div>

      <Display_FollowUnfollow
        setstate={setIsVisible}
        type={"Followers"}
        isDisplay={isVisible}
        usertype={userFollowers}
      />
      <Display_FollowUnfollow
        setstate={setFollowing}
        type={"following"}
        isDisplay={displayFolllowing}
        usertype={userFollowing}
      />
    </>
  );
};

export default User_Info;
