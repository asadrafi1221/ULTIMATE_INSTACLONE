import React from 'react'
import { IoIosHeartEmpty } from "react-icons/io";


export const User_post = ({userPosts,setshowbar,showbar,hiddenclass}) => {
  const baseurl = `http://localhost:3500`

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) return interval + " years ago";
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " months ago";
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + " days ago";
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + " hours ago";
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " minutes ago";
    return seconds + " seconds ago";
  }

  function handlePost(e){
    const div = e.target.parentElement
    const text = div.querySelector('.text').innerHTML
    const img =  div.querySelector('.image').innerHTML
    const likes =  div.querySelector('.likeslength').innerHTML
    const comments =  div.querySelector('.commentlenght').innerHTML
    const date =  div.querySelector('.date').innerHTML

    console.log(img)
    console.log(text)

    const display_post = document.querySelector('.display_post')

    display_post.style.display = 'flex'
    display_post.querySelector('img').src = `${baseurl}/${img}`;
    display_post.querySelector('.text').innerHTML = text
    display_post.querySelector('.likes').innerHTML = likes
    display_post.querySelector('.comments').innerHTML = comments
    display_post.querySelector('.date').innerHTML = timeAgo(date)
  }

  function handleDelete(e){
const id = e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild;
console.log(id)
  }

  return (
    <>
    <div className=''>
    <div className="flex flex-wrap z-10  max-h-[50vh] md:max-h-[10000vh] overflow-auto w-[100vw]  md:w-[90vw] lg:w-[800px] bg-transparent md:mb-10">
        {userPosts.map((ele, index) => (
          
          <div
            className="flex flex-col h-36 w-[33vw] bg-black justify-between   sm:w-[33%] sm:h-72 " onClick={(e)=>handlePost(e)}
            key={index}
          >
            <p className='id hidden'>{ele._id}</p>
            <p className='hidden image'>{ele.Image}</p>
            <p className='hidden text'>{ele.text}</p>
            
            <p className='hidden commentlenght'>{ele.comments.length}</p>
            <p className='hidden likeslength'>{ele.comments.length}</p>
            <p className='hidden date'>{ele.createdAt}</p>
              {ele.Image  ? <img src={`${baseurl}/${ele.Image}`} className={`h-full w-full object-cover omg`}/> : <p>{ele.text}</p>}
            </div>
        ))}
      </div>
      <div className='absolute h-[100vh] w-[100vw] md:w-[90vw] lg:w-[80vw] left-0 backdrop-filter backdrop-blur-lg top-0 z-50 display_post flex-col justify-center items-center hidden'>
      <button className='absolute top-5 right-5 rounded-xl p-2 bg-blue-500 ' onClick={()=> document.querySelector('.display_post').style.display = 'none'}>X</button>
          <img src={`${baseurl}/${localStorage.getItem('User_name')}`} className='h-[50%] w-[80%] object-cover rounded-xl'/>
          <div className='w-[95%] p-5 bg-black mt-5 rounded-xl '>
            <div className='flex items-center justify-between text-white font-bold '>
            <p className='mt-2 text'>helo its me asad khan</p>
            <p onClick={(e)=>handleDelete(e)}>delete</p>
            </div>
            <div className='flex justify-between mt-2 text-gray-300'>
  <div class="flex items-center gap-2 ">
    <p class="icon">❤️</p>
    <p className='likes'>3 likes</p>
  </div>
  <div class="flex items-center gap-2 ">
    <p class="icon">💬</p>
    <p className='comments'>5 comments</p>
  </div>
  <div ><p className="date">3 weeks ago</p></div>

            </div>
          </div>
      </div>
      </div>
    </>
  )
}
