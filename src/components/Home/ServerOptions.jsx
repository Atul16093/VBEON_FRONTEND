import { useEffect, useRef, useState } from "react";
import "./ServerOptions.css"; // Import CSS
import api from "../../api";
import axios from "axios";

const ServerOptions = ({inviteStatus , clickSentToParent , sendDataToChild , sendSelectedServer , isClose,sendToHeroForDelete , sendToHeroByMember}) => {
    const [invitePopup , setInvitePopup] = useState(true);
    const [whileClick , setWhileClick]  = useState(false);
    const [userData , setUserData] = useState(sendDataToChild.user);
    const [close , setClose ] = useState(true);
    const [resp , setResp] = useState();
    const popupRef = useRef(null);
     useEffect(() => {
        const handleClickOutside = (event) => {
          if (popupRef.current && !popupRef.current.contains(event.target)) {
             setClose(!close);
             handleWhileClick();
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

    const handleInvite = ()=>{
        setInvitePopup(!invitePopup);
        inviteStatus(invitePopup);
    }
    const handleWhileClick = ()=>{
        setWhileClick(!whileClick);
        clickSentToParent(whileClick);
    }   
    const handleServerStatus = ()=>{ 
      setClose(!close)
      isClose(close)
    }
    const handleDeleteServer = async()=>{
      if (window.confirm("Are you sure you want to delete the server?")){
      try{
      const res = await axios.delete(`${api.DELETE_SERVER}${sendSelectedServer._id}`,{withCredentials : true});           
      sendToHeroForDelete("hello");
      
      }catch(error){
        console.log("Error in handleDeleteServer " , error);
        
      }      
    }
  }
  const [memberState ,setMemberState] = useState(true);
    const handleShowMember = ()=>{
        setMemberState(!memberState);
        sendToHeroByMember(memberState);
    }
  return <>
    <div  className="server-options-menu" ref={popupRef}>
      {/* <div className="menu-item">Mark As Read</div> */}
      <div onClick={()=>{handleInvite(); handleWhileClick()}} className="menu-item invite">Invite People</div>
      {/*  Only admin can see the customize server option */}
      {userData.id == sendSelectedServer.owner._id  || userData.id == sendSelectedServer.owner ? <div onClick={handleServerStatus}  className="menu-item invite">Customize Server</div> : ""}
      {userData.id == sendSelectedServer.owner._id || userData.id == sendSelectedServer.owner ? <div onClick={handleDeleteServer}  className="menu-item invite">Delete Server</div> : ""}
      {<div onClick={handleShowMember} className="menu-item invite">Show Members</div>}
      {/* <div className="menu-item">Mute Server ▶</div>
      <div className="menu-item">Notification Settings ▶</div>
      <div className="menu-item">
        Hide Muted Channels <input type="checkbox" />
      </div>
      <div className="menu-divider"></div>
      <div className="menu-item">Server Settings ▶</div>
      <div className="menu-item">Privacy Settings</div>
      <div className="menu-item">Edit Per-server Profile</div>
      <div className="menu-divider"></div>
      <div className="menu-item">Create Channel</div>
      <div className="menu-item">Create Category</div>
      <div className="menu-item">Create Event</div> */}
    </div>
</>
};

export default ServerOptions;
