import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loggedIn,
  notLoggedIn,
} from "../../redux/stores/User_Auth/isUsserLoggedin.js";
const SignUp = () => {
  const Authuser = useSelector((state) => state.userAuth.isLoggedIn);
  console.log(Authuser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const baseurl = `http://localhost:3500`

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    console.log(formData);

    try {
      const response = await fetch(`${baseurl}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          fullname: formData.fullname,
          password: formData.password,
          email: formData.email,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      console.log(data);
      if (data.error) throw new Error(data.error);

      navigate('/login')
    }
    catch(err){
        console.log(err)
        throw new Error(err)
        return <p>{err}</p>
    }
  };

  const arr = ["username", "fullname", "password", "email"];
  const isSkeleton = false;

  return (
    <div className="bg-gradient-to-r from-blue-900 to-black flex h-[100vh]  flex-col  p-5   center gap-10 text-white items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`h-[90%] flex flex-col p-5 gap-5 justify-around w-[95%] md md:sm:p-8 bg-black shadow-md shadow-blue-500 ${
          isSkeleton ? "skeleton " : "  rounded-md shadow-md shadow-black "
        }`}
      >
        {arr.map((ele, index) => (
          <input
            key={index}
            {...register(ele, { required: true })}
            placeholder={ele}
            className={`h-1/6 shadow-md p-5 outline-none md:text-2xl text-white ${
              isSkeleton ? "skeleton" : "bg-transparent shadow-md shadow-black"
            }`}
          />
        ))}

        <button
          className={` rounded-md p-3 ${
            isSkeleton ? "skeleton" : "bg-gradient-to-r from-blue-400 to-black "
          }`}
          onClick={() => console.log("i am clicked")}
        >
          Click me
        </button>
        {errors&&<p className='text-red-400'>{errors.message}</p>}
      </form>
      <div className="flex items-center w-[100vw] justify-around">
        <p>Aleardy have an Account</p>
        <button
          className={` rounded-md p-1 ${
            isSkeleton ? "skeleton" : "bg-gradient-to-r from-blue-400 to-black "
          }`}
          onClick={() => navigate("/Login")}
        >
          Login
        </button>
      </div>
    </div>

  
  );
};

export default SignUp;
