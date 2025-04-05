import { useState, useEffect, useRef } from "react";
import "./ProfilePopup.css";
import { useDispatch } from "react-redux";
import { unSetUser } from "../../Redux/UserSlice";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const ProfilePopup = ({profileState , sendToChild, sendEditToParent}) => {
  const [profileClosing , setProfileClosing ] = useState(false);
  const [userData , setUserData] = useState(sendToChild.user);
  const [editPopup , setEditPopup] = useState(true);
  const popupRef = useRef(null);
  const fileInputRef = useRef(null)
  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
       handleProfileClosing();       
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileClosing]);
useEffect(()=>{},[])
  const handleProfileClosing = ()=>{
    setProfileClosing(!profileClosing);
    profileState(profileClosing);
  }
  const handleEditStatus = ()=>{
    setEditPopup(!editPopup);
    sendEditToParent(editPopup);
  }
  let url = `http://localhost:5400${userData.profilePic}`
  const dispatch = useDispatch();
  //Handling logout here 
  const handleLogout = ()=>{
     dispatch(unSetUser());
  }
  const handleUpdateProfile = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
  
      const formData = new FormData();
      formData.append("avatar", selectedFile); 
  
      try {
        const response = await axios.post(
          `${"http://localhost:5400/user/upload-avatar/"}${sendToChild.user.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true, 
          }
        );
  
        if (response.data.success) {
          setUserData((prev) => ({
            ...prev,
            profilePic: response.data.profilePic, 
          }));
          console.log("Upload successful:", response.data);
        } else {
          console.error("Upload failed:", response.data.error);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  
  return (
    <div className={`profile-overlay ${true? "show" : ""}`}>
      <div className={`profile-popup ${true? "popup-open" : "popup-close"}`} ref={popupRef}>
        <div className="profile-header">
          <img
            src={url}
            alt="Profile"
            className="profile-avatar"
          />
            <input 
            type="file" 
            accept="image/*" 
            style={{ display: "none" }} 
            ref={fileInputRef} 
            name="avatar"
            onChange={handleFileChange} 
          />
          <EditIcon onClick = {handleUpdateProfile} />
        </div>

        <h2 className="profile-name">{userData.username}</h2>
        <p className="username">{userData.username}</p>

        <div className="profile-promo">
          <span>Amp up your profile(Upcoming)</span>
          <button className="close-promo">✖</button>
          <div className="promo-buttons">
            <button className="promo-btn">🚀 Get Nitro</button>
            <button className="promo-btn">🛍 Shop</button>
          </div>
        </div>

        <div className="profile-options">
          <button onClick={handleEditStatus}  className="profile-option">✏ Edit Profile</button>
          <button className="profile-option">{userData.status == "online" ? "🟢 Online" : userData.status == "offline" ? "⚫ Offline" : userData.status == "idle" ? "🌙 Idle" : userData.status == "dnd" ? "⛔ DND" : ""} </button>
          <button onClick={handleLogout} className="profile-option">🔓 Log out</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
