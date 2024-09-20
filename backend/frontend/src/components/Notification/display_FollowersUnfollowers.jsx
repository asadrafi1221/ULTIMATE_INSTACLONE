import react from "react"
const Display_FollowUnfollow = ({isDisplay,setstate,usertype,type})=>{
return (
    <>
<div className={`mockup-phone border-primary absolute z-20 transition-all duration-500 ${isDisplay ? 'translate-y-[3%]' : 'translate-y-[-900%]'}`}>
  <div className="camera"></div>
  <div className="display">
    <div className="artboard artboard-demo phone-1 ">
      <div className="w-full items-center flex justify-center flex-col  ">
        <p className="text-white  text-3xl font-extralight absolute top-20  p-3">{type}</p>
{usertype&&usertype.map((ele)=>(
  <div className="flex bg-red-600 rounded-xl w-[90%] p-2 items-center gap-5  text-white m-3" key={ele._id}>
   <p className="h-10 w-10 border-2 rounded-[50%] bg-gradient-to-r from-red-500 to-blue-900 font-extralight text-xl flex items-center justify-center ">
            {ele.username.charAt(0)}
          </p>
    <p>{ele.username}</p>
    </div>
))}

      </div>
    <button className={`p-2 rounded-xl bg-black text-white absolute bottom-10 w-[90%]` } onClick={()=>setstate(false)}>Close</button>

    </div>
  </div>
</div>
</>
)
}

export default Display_FollowUnfollow