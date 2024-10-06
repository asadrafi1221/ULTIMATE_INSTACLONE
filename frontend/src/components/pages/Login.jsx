import React from "react";
import "../../App.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn } from "../../redux/stores/User_Auth/isUsserLoggedin.js";

const arr = ["email", "password"];

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const isSkeleton = false;
  const dispatch = useDispatch();
  const Authuser = useSelector((state) => state.userAuth.isLoggedIn);
  const baseurl =`http://localhost:3500`

  const onSubmit = async (formdata) => {
    
    console.log(formdata);

    const url = `${baseurl}/auth/login`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formdata.email,
          password: formdata.password,
        }),
      });
      if (!res.ok) throw new Error("Somthing went wrong");
      const data = await res.json();
      console.log(data);
      if (data.error) throw new Error(data.error);
      if (data) {
        const token = data.id;
        localStorage.setItem("User_token", token);
        dispatch(loggedIn(Authuser));
        navigate("/Home");
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh]  md:flex-row  text-white overflow-auto">
        <div className="h-96 bg-transparent rounded-md flex items-center justify-center p-5 w-[100%] ">
          <h1 className=" h-[100%] w-[100%] text-5xl rounded-md  font-extralight bg-black  flex items-center justify-center shadow-md shadow-blue-900">
            Login plz
          </h1>
        </div>
        <div className="flex h-96 flex-col  p-5  items-center justify-center  rounded-md center w-[100%] ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`h-[100%] flex flex-col p-5 gap-5 justify-around w-[100%] sm:p-8 bg-black shadow-md shadow-blue-900 ${
              isSkeleton ? "skeleton " : "  rounded-md shadow-md shadow-black "
            }`}
          >
            {arr.map((ele, index) => (
              <input
                key={index}
                {...register(ele, { required: true })}
                placeholder={ele}
                className={`h-1/6 shadow-md p-5 outline-none md:text-2xl text-white ${
                  isSkeleton
                    ? "skeleton"
                    : "bg-transparent shadow-md shadow-black"
                }`}
              />
            ))}

            <button
              className={` rounded-md p-3 ${
                isSkeleton
                  ? "skeleton"
                  : "bg-gradient-to-r from-blue-400 to-black "
              }`}
              onClick={() => console.log("i am clicked")}
            >
              Click me
            </button>
          </form>
        </div>
        <div className="flex items-center   w-[100vw] justify-around md:hidden p-2">
          <p className="font-extralight">want to sign in</p>
          <button
            className={` rounded-md p-1  ${
              isSkeleton
                ? "skeleton"
                : "bg-gradient-to-r from-blue-400 to-black "
            }`}
            onClick={() => navigate("/Signup")}
          >
            SignUp
          </button>
        </div>
      </div>
      <div className="hidden md:flex items-center   w-[100vw] justify-around  relative top-[-10vh] p-3">
        <p className="font-extralight">want to sign in</p>
        <button
          className={` rounded-md p-1  ${
            isSkeleton ? "skeleton" : "bg-gradient-to-r from-blue-400 to-black "
          }`}
          onClick={() => navigate("/Signup")}
        >
          SignUp
        </button>
      </div>
    </>
  );
}

export default Login;
