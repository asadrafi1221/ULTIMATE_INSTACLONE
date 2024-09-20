import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import axios from "axios";

export default function Edit_profile({
  editProfile,
  setedit,
  setUserData,
  userData,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(".artboard", {
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
  }, []);
  const [image, setImage] = useState([]);
  

  const handleEdit = (e) => {
    setedit(false);
    if (e) {
      console.log("helo");
    }
  };
  const handleUserBio = async () => {
    console.log("Image:", image);

    const formData = new FormData();
    formData.append("profileImg", image);
    const userId = localStorage.getItem("User_token");

    try {
      const response = await axios.post(
        `${window.location.origin}/api/users/uploadImg/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Uploaded successfully:", response.data);
    } catch (err) {
      console.error(
        "Upload failed:",
        err.response ? err.response.data : err.message
      );
    }

    const bio = document.querySelector(".Bio").value;
    if (!bio) alert("plz put the values ");
    else {
      console.log(bio);
      try {
        const res = await fetch(
          `http://localhost:3500/api/users/updateBio/${userId}/${bio}`
        );
        const data = await res.json();
        console.log("this is data  : ");

        setUserData(data);
        console.log(userData);
        document.querySelector(".Bio").value = "";
      } catch (err) {
        console.log(err);
      }
      setedit(false);
    }
    setedit(false);
  };
  return (
    <div
      className={`${
        editProfile
          ? "bg-black w-[100vw]  max-h-[85vh]  overflow-auto h-[85vh] md:h-[100vh] md:max-h-[100vh] absolute md:w-[88vw] md:top-0 top-12 flex flex-col z-50 "
          : "hidden"
      }`}
    >
      <div className="m-3">
        <button
          className="hidden md:flex md:rounded-md h-10  ml-10 bg-gray-900 z-50 text-white  items-center justify-center mb-5 mt-5 w-[20vw]"
          onClick={() => handleEdit()}
        >
          close{" "}
        </button>
        <div className="flex artboard rounded-xl p-3 gap-5 items-center ">
          <p className="p-1 h-16 w-16 flex items-center justify-center rounded-[50%] bg-gradient-to-r from-black to-green-600">
            <input
              type={"file"}
              className="opacity-0"
              namwe="profileImg"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </p>
          <div className="">
            <p className="font-bold text-white">{"Cristiano"}</p>
            <p className="text-black font-extrabold">{"Change photo"}</p>
          </div>
        </div>
        <p className="mt-7 mb-3 text-white font-bold">Wesbite</p>
        <p className="flex bg-[#292b2d] rounded-xl p-3 mb-1">website</p>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          excepturi temporibus{" "}
        </p>
        <p className="mt-7 mb-3 text-white font-bold">BIo</p>
        <input className="w-[100%] rounded-xl p-4 bg-black border Bio" />
        <p className="mt-7 mb-3 text-white font-bold">Gender</p>
        <select className="w-full bg-black border rounded-xl p-3 mb-1">
          <option value="prefer not to say">Prefer not to say</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p className="text-sm">Lorem, ipsum dolor sit amet c </p>
        <p className="mt-7 mb-3 text-white font-bold">
          Show account suggestion on profile
        </p>
        <div className="flex flex-col p-4 rounded-xl border">
          <p className="text-white">Show account suggestion on profile</p>
          <p className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            excepturi temporibus{" "}
          </p>
        </div>
        <div className="w-[93vw] flex items-center justify-center  mt-10">
          <div className="mockup-phone">
            <div className="camera "></div>
            <div className="display flex flex-col justify-center items-center">
              <div className="artboard artboard-demo phone-1 ">
                <div className="phone ">
                  <h1 className="text-white mb-10 text-2xl font-extralight">
                    Edit your Profile{" "}
                  </h1>

                  <div className="flex w-52 flex-col gap-4">
                    <div className="skeleton h-32 w-full text-md text-white flex items-center justify-center">
                      Lets make it awesome
                    </div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="artboard mt-10 relative mb-10 rounded-xl  p-3 w-[100%] "
          onClick={() => handleUserBio()}
        >
          submit
        </button>
      </div>
    </div>
  );
}
