import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Create_post = ({ PostClass, set_Class, Name, setPosts, setPostCount, setNoPosts, PresentUser }) => {
  console.log(PresentUser);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
   const navigate =  useNavigate()

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to('.artboard', {
      backgroundImage: 'linear-gradient(to right, #ff7e5f, #feb47b)',
      duration: 3,
      ease: 'power1.inOut'
    })
      .to('.artboard', {
        backgroundImage: 'linear-gradient(to right, #ff6a00, #ee0979)',
        duration: 3,
        ease: 'power1.inOut'
      })
      .to('.artboard', {
        backgroundImage: 'linear-gradient(to right, #00c6ff, #0072ff)',
        duration: 3,
        ease: 'power1.inOut'
      });
  }, []);

  useEffect(() => {
    if (imageUrl) {
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [imageUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(newImageUrl);
    }
  };
  const baseurl = `http://localhost:3500`;

  const addPost = async (event) => {
  
    const text = document.querySelector(".post").value;
    const id = localStorage.getItem('User_token');
    
    if (text === "") {
      alert('Please add post text');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('text', text); 
      if (image) {
        formData.append('image', image);
      }
  
      const response = await axios.post(
        `${baseurl}/api/users/createpost/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Uploaded successfully:", response.data);
  
      setPosts((prevPosts) => [...prevPosts, response.data]);
      setPostCount((prevCount) => prevCount + 1);
      setNoPosts(false);
      set_Class('h-[0vh]');
    } catch (err) {
      console.error("Error creating post:", err.message);
    }
  };
  

  return (
    <div
      className={`${PostClass} absolute w-[100vw] top-0 z-50 create_post md:w-[90vw] lg:w-[80vw] flex flex-col overflow-hidden transition-all duration-300 bg-[rgb(0,0,0)]`}
    >
      <div className='w-[100vw] flex items-center p-5 gap-36 bg-black border_bottom text-white'>
<p onClick={()=>set_Class('h-[0vh]')} className='text-2xl'>{'<'}</p>
      </div>
      <div className='p-5'>
        <h1 className='text-2xl text-white font-extralight '>New Post</h1>
        <div className=' flex flex-col items-center p-5 '>
          {`${!imageUrl ? <label htmlFor='photos' className='bg-blue-500 rounded-xl p-2 cursor-pointer text-white'>
            Choose your Photo
          </label>: ''}`}
          <input
            type='file'
            id='photos'
            className='opacity-0'
            onChange={handleFileChange}
          />
          <div id='photo-preview' className='mt-4'>
            {imageUrl && <img src={imageUrl} alt='Selected Preview' className='h-72 w-72 rounded-lg border border-gray-300' />}
          </div>
        </div>
      </div>
      <div className='p-5 flex items-center gap-5 mt-10'>
      <div className='h-12 w-12 rounded-[50%] flex items-center justify-center gap-5 border'>
          {PresentUser && PresentUser.profileImg ? <img src={`${baseurl}/${PresentUser.profileImg}`} /> : <p>hello</p>}
        </div>
        <p className='text-white text-xl'>{PresentUser.username}</p>
</div>
<div className='p-5 '>
  <input className='w-full rounded-xl outline-none h-auto p-4 post' placeholder='Whats on your Mind ? '  />
  <div className='w-[90vw] flex justify-end'>
{imageUrl?<button className='bg-blue-500 rounded-xl w-[30%] p-1 mt-10' onClick={()=>addPost()}>share</button> : ''}
  </div>
</div>

    
    
    </div>
  );
};

export default Create_post;
