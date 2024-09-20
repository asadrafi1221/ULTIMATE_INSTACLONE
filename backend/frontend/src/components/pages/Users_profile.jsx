import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import User_Info from "../User_Info";
import { User_post } from "./User_post";
import Edit_profile from "../Edit_profile";

const Users_Profile = () => {
  const User_id = useSelector((state) => state.getProfile);
  const [user, setUser] = useState([]);
  const [post, setUserPost] = useState([]);
  const [PostLength,set_postLength] = useState(0);

  const baseurl = `${window.location.origin}`
  

  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      const id = User_id.default_id;
      const user_res = await fetch(
        `${baseurl}/api/users/get_authuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      const posts_res = await fetch(
        `${baseurl}/post/auth_userPosts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      if (!user_res.ok || !posts_res.ok) console.log("something went wrong");
      const users_data = await user_res.json();
      const posts_data = await posts_res.json();
      
      setUser(users_data);
      setUserPost(posts_data);
      set_postLength(posts_data.length);
    };
    fetchdata();
  }, []);
  console.log(user);
  return (
    <>
    <div className="flex flex-col items-center justify-center md-[90vw]">
    <User_Info
  name={user.username}
  following={user.folllowing}  
  followers={user.followers}
  postCount={'1'}
  bio={user.bio}
  button_class={"hidden"} 
  fullname={user.fullname}
  user_id = {localStorage.getItem('User_id')}
  postLength = {PostLength}
  isFollowed={'follow'}
/>
{console.log(PostLength)}
<User_post userPosts={post} hiddenclass={'hidden'} />
</div>
    </>
  );
};

export default Users_Profile;
