import { useEffect, useRef, useState } from "react";
import "./DeleteChannel.css";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import api from "../api";
import { data } from "react-router-dom";
const DeleteChannel = ({sendByDeleteChannel , sendToChild}) => {
//   if (!isOpen) return null;
 const popupRef = useRef(null);
const [close , setClose ] = useState(false);
  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
       handleCloseChannel() ;    
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

const handleCloseChannel = ()=>{
    setClose(!close)
    sendByDeleteChannel(close)
};
const channelNameRef = useRef();
const handleDeleteChannel = async()=>{
  try{
    console.log(channelNameRef.current.value);
    
     const res = await axios.delete(`${api.DELETE_CHANNEL}${sendToChild}/delete`,{withCredentials : true , data : {channelname : channelNameRef.current.value}} )
    toast.success("Channel Deleted Successfully...!");
    //This is for component rerendering   
    // handleCloseServer();
    }catch(error){
      toast.error(error.response.data.message||"Oops something went wrong...!")
      console.log("Error in handleUpdateClick " , error );
      
     }
}

  return <>
     <ToastContainer/>
     <div className="popup-overlay" >
       <div className="popup-container" ref={popupRef}>
         <div className="popup-header">
           <h2>Delete Channel Confirmation</h2>
           <button className="close-btn" >
           </button>
         </div>
         <div className="popup-body">
           <label>Enter Name for confirmation</label>
           <input onKeyDown={(e)=>{ if (e.key === "Enter"){handleDeleteChannel()}}}  ref={channelNameRef} className="in" type="text" placeholder="Enter channel name here " />
           <button onClick={()=>{handleDeleteChannel();}} className="update-btn bt">Delete Channel</button>
         </div>
       </div>
     </div>
</>
};

export default DeleteChannel;
