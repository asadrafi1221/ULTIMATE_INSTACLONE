import React, { useEffect, useState } from "react";
import gsap from "gsap";

// utils/formatDate.js
import { formatDistanceToNow, parseISO } from 'date-fns';

export const formatRelativeTime = (dateString) => {
  const date = parseISO(dateString);

  return formatDistanceToNow(date, { addSuffix: true });
};
 
const baseurl = `http://localhost:3500`

const Notification = () => {
  const [Notifactions, setNotifications] = useState([]);

  useEffect(() => {
    const get_notifications = async () => {
      try {
        const userId = localStorage.getItem("User_token");
        const res = await fetch(
          `${baseurl}/notification/get_notification/${userId}`
        );
        const data = await res.json();
        console.log(data);
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    };

    get_notifications();

    const artboardTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    artboardTimeline
      .to(".artboard", {
        backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)",
        duration: 3,
        ease: "power1.inOut",
      })
      .to(".artboard", {
        backgroundImage: "linear-gradient(to right, #ff6a00, #ee0979)",
        duration: 3,
        ease: "power1.inOut",
      })
      .to(".artboard", {
        backgroundImage: "linear-gradient(to right, #00c6ff, #0072ff)",
        duration: 3,
        ease: "power1.inOut",
      });

    const notificationTimeline = gsap.timeline();
    notificationTimeline
      .to(".notification_component", {
        y: 0,
        duration: 0.5,
      })
      .to(".notificationtext", {
        x: 0,
        duration: 0.5,
      })
      .to(".mockup-phone", {
        y: 150,
        duration: 0.5,
      });
  }, []);

  return (
    <div className="flex flex-col h-[93vh]  md:h-[100vh] relative animate-background translate-y-[-300%] notification_component overflow-y-auto">
      <div className="w-[99vw] flex items-center justify-center mt-16 absolute md:w-[90vw] lg:w-[80vw] ">
        <p className="text-2xl font-extralight text-white notificationtext translate-x-[-200%] z-10 lg:text-5xl">
          These are your Notifications
        </p>
      </div>
      <div className="mockup-phone z-50 translate-y-[-200%] ">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-1 ">
            <div className="h-[55vh] w-full max-h-[55vh] overflow-y-auto bigbox">
              {Notifactions.length > 0 ? (
                Notifactions.map((ele, index) => (
                  <div
                    key={index}
                    className="p-3 bg-blue-700 rounded-xl m-2 flex items-center  flex-col"
                  >
                    <div className="flex justify-between items-center   w-full">
                      <div className="flex  w-full items-center gap-2">
                      <p className="animate-background h-10 w-10 rounded-[50%] flex items-center justify-center">
                        helo
                      </p>
                      <p className="text-white">{ele.sendfrom}</p>
                  </div>
                  <div className="flex w-full items-center justify-end">
                      <p>
                        {ele.type === "UNLIKE" || ele.type === "LIKE"
                          ? `${ele.type} your post`
                          : `${ele.type} you`}
                      </p>
                      
                                            </div>
                    </div>
                    <div className="w-full  flex justify-end">
                      <p className="text-sm text-white">{formatRelativeTime(ele.createdAt)}</p>
                      </div>
                  </div>
                  
                ))
              ) : (
                <div className="text-white text-center absolute top-40 text-4xl flex flex-col items-center justify-center w-[95%]">
                  <p className="font-extrabold">user have</p>
                  <p className="font-extrabold">No Notifications</p>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
