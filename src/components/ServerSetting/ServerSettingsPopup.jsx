import { useEffect, useRef, useState } from "react";
import "./ServerSettingsPopup.css";
import axios, { AxiosError } from "axios";
import api from "../../api";
import {toast, ToastContainer} from "react-toastify";
const ServerSettingsPopup = ({sendToHeroByServer , sendServerDetails, sendUpdatedMessage}) => {
  const [close , setClose ] = useState(false);
//   if (!isOpen) return null;
 const popupRef = useRef(null);

  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
       handleCloseServer() ;    
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

const handleCloseServer = ()=>{
    setClose(!close)
    sendToHeroByServer(close)
};
const serverNameRef = useRef();
const handleUpdateClick = async()=>{
  try{
     const res = await axios.put(`${api.UPDATE_SERVER_NAME}${sendServerDetails._id}/usn`, {updatedname : serverNameRef.current.value} , {withCredentials : true});
    toast.success("Name Updated Successfully...!");
    //This is for component rerendering
    sendUpdatedMessage(res.data.message)    
    handleCloseServer();
    }catch(error){
      toast.error("Name already exist...!")
      console.log("Error in handleUpdateClick " , error );
      
     }
}

  return <>
     <ToastContainer/>
     <div className="popup-overlay" >
       <div className="popup-container" ref={popupRef}>
         <div className="popup-header">
           <h2>Server Settings</h2>
           <button className="close-btn" >
           </button>
         </div>
         <div className="popup-body">
           <label>Server Name</label>
           <input ref={serverNameRef} className="in" type="text" placeholder="Enter new server name" />
           <button onClick={handleUpdateClick} className="update-btn bt">Update</button>
         </div>
       </div>
     </div>
</>
};

export default ServerSettingsPopup;
