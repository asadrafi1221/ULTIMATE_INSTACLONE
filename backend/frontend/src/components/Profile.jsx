import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User_Info from "./User_Info.jsx";
import { User_post } from "./pages/User_post.jsx";
import Edit_profile from "./Edit_profile.jsx";
import Create_post from "./pages/Create_post.jsx";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [userPosts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [followers, setFollower] = useState([]);
  const [showbar, setshowbar] = useState(false);
  const [post, setPost] = useState("");
  const [desc, setDesc] = useState("");
  const [posttook, setposttook] = useState(false);
  const[editProfile,setedit] = useState(false)
  const [PostClass,set_Class] = useState('h-[0vh]')

  const id = localStorage.getItem("User_token");
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_model = await fetch(
          `${window.location.origin}/api/users/get_authuser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          }

        );
        
        const posts_model = await fetch(
          "http://localhost:3500/post/auth_userPosts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          }
        );
        

        if (!user_model.ok || !posts_model.ok) {
          throw new Error("Network response was not ok");
        }

        const users_data = await user_model.json();
        const post_data = await posts_model.json();

        setPosts(post_data);
        setUserData(users_data);
        setPostCount(post_data.length);
        setNoPosts(post_data.length === 0);
        console.log(userPosts);
        console.log(users_data.followers)
       
        

      } catch (err) {
        console.error("Error fetching user data:", err.message);
      }

    };

    if (id) {
      fetchData();
    }
  }, [id]);

  



  return (
   <> 
    <div className="overflow-hidden h-[100vh] w-[100vw] md:w-[90vw]  md:h-auto z-20 flex flex-col items-center">
        <User_Info
          name={userData.username}
          fullname={userData.fullname}
          followingUsersLength = {userData.folllowing}
          postCount={postCount}
          followersLength = {userData.followers}
          setposttook={setposttook}
          setedit={setedit}
          set_Class={set_Class}
          bio = {userData.bio}
          link = {userData.link}
          profile={'profile'}
        />
    {console.log(PostClass)}
      {noPosts && (
        <div className="bg-black text-3xl text-white font-extralight h-96 flex items-center justify-center">
          User has no Posts yet
        </div>
      )}
      <User_post
        userPosts={userPosts}
        setshowbar={setshowbar}
        showbar={showbar}
      />
      
      <div className="Follower_page max-h-96 w-96 bg-trasnparent backdrop-blur-lg  backdrop-filter absolute top-28 hidden left-5 rounded-xl  justify-center overflow-auto p-5 pb-5">
        <div className="flex flex-col gap-5 center text-white">
          {Defaultdata.map((ele, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-black to-blue-500 rounded-md m- flex justify-around  items-center w-[110%] p-4"
            >
              <div className="center gap-3">
                <p className="rounded-[50%] h-10 w-10 center bg-blue-600">
                  {ele.Logo}
                </p>
                <p className="font-bold">{ele.name}</p>
              </div>
              <p className="text-sm text-gray-400">{ele.date}</p>
              <button className="bg-red-800 p-2 rounded-md text-white">
                Follow
              </button>
            </div>
          ))}
        </div>
        
      </div>
      

      
    </div>
    <Edit_profile editProfile={editProfile} setedit={setedit}  setUserData={setUserData} userData={userData}/>
    <Create_post PostClass={PostClass} set_Class={set_Class} Name={userData.username} setPosts={setPosts} setPostCount={setPostCount} setNoPosts={setNoPosts} PresentUser={userData}/>
   
    </>
  );
};

export default Profile;