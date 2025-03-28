import { useState, useEffect, useRef } from "react";
import "./InvitePopup.css";
import axios from "axios";
import api from "../../api";

const InvitePopup = ({inviteClose , serverInfo}) => {
  const [close , setClose] = useState(false);
  const [generate , setGenerate] = useState();
  const popupRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
         setClose(!close);
         inviteClose(close);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Copy link to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generate);
    alert("Link copied!");
  };
  const handleClose = ()=>{
     setClose(!close);
     inviteClose(close)
  }
  useEffect(()=>{
    const generateLink =  async ()=>{
    const res = await axios.post(`${api.GENERATE_LINK}${serverInfo._id}/invite`, {} , {withCredentials : true});
    let code = res.data.link;
        code = code.substring(34,42);
        setGenerate(code);
          
    };
    generateLink();
  },[serverInfo]);
  return (
    <div className="overlay">
      <div className="invite-popup" ref={popupRef}>
        <button className="close-btn" onClick={handleClose} style={{width : "30px" , outline : "none"}} >✖</button>
        <h2>Invite friends to your server</h2>
        <p className="expires-text">Your invite code expires in 7 days.</p>
        <div className="invite-link-container">
          <input type="text" value={generate} readOnly />
          <button className="copy-btn" onClick={handleCopy}>Copy</button>
        </div>
        <p className="edit-link">It's a code for joining the {serverInfo.servername} Server </p>
      </div>
    </div>
  );
};

export default InvitePopup;
