import axios from "axios";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function MessageSection() {
  const socket = useMemo(() => io("http://localhost:3500"), []); 
  const [loading, setLoading] = useState(true);
  const [socketId, setSocketId] = useState();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const [type, setType] = useState("");
  const userInfo = useSelector((state) => state.userChat);
  const navigate = useNavigate();

  const baseurl = `http://localhost:3500`;
  const messageRef = useRef();

  useEffect(() => {
    const scrollToBottom = () => {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseurl}/messageApi/getMessage/${localStorage.getItem(
            "User_token"
          )}/${userInfo.default_data.id}`
        );
        if (response) {
          setMessages(response.data);
          setLoading(false);
          scrollToBottom(); 
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    setUser(userInfo.default_data);
    fetchData();

    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Socket connected with ID:", socket.id);
    });

    socket.on("newMessage", (newMessage) => {
      if (
        newMessage.senderId === userInfo.default_data.id ||
        newMessage.receiverId === userInfo.default_data.id
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        scrollToBottom(); 
      }
    });

    return () => {
      socket.disconnect();
    };
    
  }, [socket, userInfo]);

  const handleMessages = async () => {
    if (type === "") {
      return;
    }

    try {
      await fetch(
        `${baseurl}/messageApi/sendMessage/${localStorage.getItem(
          "User_token"
        )}/${userInfo.default_data.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: type }),
        }
      );

      socket.emit("message", { type, socketId });
      setType(""); 
      document.querySelector(".message").value = "";
      messageRef.current?.scrollIntoView({ behavior: "smooth" }); 
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="flex w-[100vw] md:w-[90vw] md:h-[100vh] items-center justify-center">
        {loading && (
          <div className="flex items-center justify-center w-[100vw] md:w-[600px] h-[90vh] md:h-[100vh]">
            <span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        )}

        {!loading && (
          <div className="md:p-4 md:rounded-xl shadow-md shadow-gray-500">
            <div className="p-4 w-[100vw] md:w-[600px] flex items-center justify-between">
              <div className="flex items-center justify-center gap-3">
                <img
                  src={`${userInfo.default_data.profileImg}`}
                  className="h-10 w-10 rounded-[50%] object-cover"
                />
                <p className="font-bold text-white">
                  {userInfo.default_data.username}
                </p>
              </div>
            </div>

            <div className="max-h-[90vh] h-[80vh] p-2 overflow-auto flex flex-col justify-between">
              <div className="max-h-[93%] pb-5">
                <div className="flex flex-col items-center justify-center mt-10">
                  <img
                    src={`${userInfo.default_data.profileImg}`}
                    className="h-24 w-24 mb-2 rounded-[50%] object-cover"
                  />
                  <p className="font-bold text-white">
                    {userInfo.default_data.username}
                  </p>
                  <p className="">{`Chat with friends ...`}</p>
                  <button className="p-2 rounded-xl bg-gray-800 text-white mt-5">
                    View Profile
                  </button>
                </div>
                <div className="mt-10 flex flex-col gap-8">
                  {messages.map((ele, index) => (
                    <div
                      key={index}
                      className={`flex items-center h-auto animated_messages ${
                        ele.senderId === localStorage.getItem("User_token")
                          ? "relative left-[41%] md:left-[330px]"
                          : ""
                      }`}
                    >
                      <img
                        src={
                          ele.senderId === localStorage.getItem("User_token")
                            ? `${baseurl}/${localStorage.getItem("User_name")}`
                            : userInfo.default_data.profileImg
                        }
                        className="h-8 relative left-5 bottom-3 w-8 rounded-[50%] object-cover"
                      />
                      <p
                        className={`p-5 rounded-xl max-w-[43%] md:max-w-[30%] ${
                          ele.senderId === localStorage.getItem("User_token")
                            ? "bg-blue-700"
                            : "bg-red-800"
                        }`}
                      >
                        {ele.message}
                      </p>
                    </div>
                  ))}
                  <div ref={messageRef} className="mt-20"></div>
                </div>
              </div>
              <div className="p-1 flex items-center justify-center relative">
                <input
                  className="w-[80%] p-2 rounded-xl bg-black outline-none message"
                  placeholder="send message"
                  onChange={(e) => setType(e.target.value)}
                />
                <button
                  className="text-blue-400 p-2 bg-black"
                  onClick={handleMessages}
                >
                  send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
