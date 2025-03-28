import { useEffect, useRef, useState } from "react";
import "./CreateChannel.css"
import axios from "axios";
import api from "../../api";
import {toast, ToastContainer} from "react-toastify";
const CreateChannel = ({sendDataToParent , serverId , ChannelToParent , ChildToParentForPopup , sendToHeroByAdmin})=>{
    const [status , setStatus] = useState();  
    const [isPrivate, setIsPrivate] = useState(false);  
    const [errorMessage , setErrorMessage] = useState();
    const [isAdminOnly , setIsAdminOnly] = useState(false);
    const channelNameRef = useRef();
    const textChannelRef = useRef();
    const voiceChannelref = useRef();

    const handleSubmit = async()=>{
        try{        
        const res = await axios.post(`${api.CREATE_CHANNEL}/${serverId}/create` , {channelname : channelNameRef.current.value , type : voiceChannelref.current.value || textChannelRef.current.value},{
        withCredentials : true //it ensure cookies are send and the creditaial true help us to get the cookies from the browser storage
       });
       //For live time re-rendering I did this thing,
      //  toast.success('Channel Created Successfully...!');
         ChannelToParent(serverId);
        }catch(err){
          // toast.error("Channel already exist...!")
          console.log("Error in handleSubmit function",err);
        }
       
      }
    const handleCancel = ()=>{
        setStatus(false);
        sendDataToParent({status , serverId});
    }
    
  const handleToggle = () => {
    setIsPrivate((prev) => !prev);
  };
  const handleSubmitForPrivate = async()=>{
    try{
      const res = await axios.post(`${api.CREATE_CHANNEL}/${serverId}/create`, {channelname : channelNameRef.current.value, type :voiceChannelref.current.value || textChannelRef.current.value , isPrivate : true} , {withCredentials : true});
      
      console.log(res.data);
      setErrorMessage("");
      ChildToParentForPopup(true);
      ChannelToParent(serverId);
    }catch(error){
      setErrorMessage(error.response.data.message);
      toast.error(error.response.data.message||"Channel name already exists...!")
      console.log("Error in handleSubmitForPrivate" , error);
      
    }
  }
  const handleToggleAdminOnly = ()=>{
    setIsAdminOnly((prev) => !prev);
    sendToHeroByAdmin(isAdminOnly);
  }
    return <>
         <ToastContainer/>
        <div className="modal-overlay">
      <div className="modal-container">
        <h2>Create Channel</h2>
        <p className="subheading">in Text Channels</p>

        <div className="channel-type-section">
          <label>
            <input ref={textChannelRef}
              type="radio"
              name="channelType"
              value="text"/>
            <div className="channel-type-info">
              <h4 style={{marginLeft : "30px"}}>Text</h4>
              <p>Send messages, images, GIFs, emoji, opinions</p>
            </div>
          </label>

          <label>
            <input ref={voiceChannelref}
              type="radio"
              name="channelType"
              value="voice" />
            <div className="channel-type-info">
              <h4>Voice</h4>
              <p>Hang out together with voice, video, and screen share</p>
            </div>
          </label>
        </div>

        <div className="input-section">
          <label htmlFor="channelName">CHANNEL NAME</label>
          <div className="channel-name-input">
            <span>#</span>
            <input ref={channelNameRef}
              id="channelName"
              type="text"/>
          </div>
        </div>
        <div className="private-channel-toggle">
      <div className="toggle-container">
        <span className="lock-icon">🔒</span> {/* Lock icon like Discord */}
        <span className="label">Private Channel</span>
        <button className={`toggle-button ${isPrivate ? "active" : ""}`} onClick={handleToggle}>
          <span className="toggle-circle"></span>
        </button>
      </div>
      <p className="description">
        Only selected members and roles will be able to view this channel.
      </p>
    </div>
                    <div className="private-channel-toggle">
                        <div className="toggle-container">
                            <span className="admin-icon">👑</span>
                            <span className="label">Admin-Only Messages</span>
                            <button className={`toggle-button adminBtn ${isAdminOnly ? "active" : ""}`} onClick={handleToggleAdminOnly}>
                                <span className="toggle-circle"></span>
                            </button>
                        </div>
                        <p className="description">
                            Only admins will be able to send messages in this channel.
                        </p>
                    </div>
        <div className="modal-actions">
          <button onClick={()=>{handleCancel()}} className="cancel-btn" >
            Cancel
          </button>
          {isPrivate? <button  onClick={()=>{handleSubmitForPrivate(); errorMessage ? "" : setTimeout(()=>{handleCancel()},500) }} className="create-btn">Next</button> :  <button  onClick={()=>{handleSubmit(); handleCancel()}} className="create-btn" >
            Create Channel
          </button> }          
        </div>
      </div>
    </div>
    </>
}
export default CreateChannel;