import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ className }) => {
  const navigate = useNavigate();
  return (

    <div className={`${className} `} >
      <div className='bg-black text-white mt-10 flex flex-col items-center justify-center gap-20'>
        <div className='text-sm font-extralight'>
        <p><em>asadGram</em></p>
        </div>
        <div className='flex flex-col gap-10 items-center justify-center'>
      <p className="text-white font-bold text-xl flex xl:gap-3" onClick={() => navigate('/Home')}>H<em className='hidden xl:block font-extralight'>home</em></p>
      <p className="text-white font-bold text-xl flex xl:gap-3" onClick={()=> navigate('/profile')}>P<em className='hidden xl:block font-extralight'>home</em></p>
      <p className="text-white font-bold text-xl flex xl:gap-3" onClick={() => navigate('/Home')}>E<em className='hidden xl:block font-extralight'>home</em></p>
      <p className="text-white font-bold text-xl flex xl:gap-3" onClick={()=> navigate('/Notification')}><svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg><em className='hidden xl:block font-extralight'>Notifaction</em></p>
      <p className="text-white font-bold text-xl  flex l:gap-3" onClick={() => navigate('/Home')}>R<em className='hidden xl:block font-extralight'>home</em></p>
      <p className="text-white font-bold text-xl  flex xl:gap-3" onClick={()=> navigate('/profile')}>C<em className='hidden xl:block font-extralight'>home</em></p>
      </div>
      </div>
      <div className='mb-10 text-xl text-white flex flex-col items-center justify-center'>
        <p>=</p>
        <p>L</p>
      </div>
    </div>
    
  );
};

export default Sidebar;
