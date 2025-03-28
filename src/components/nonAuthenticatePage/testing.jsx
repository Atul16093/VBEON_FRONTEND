import { useState, useEffect, useRef } from "react";
import "./ProfilePopup.css";
import { useDispatch } from "react-redux";
import { unSetUser } from "../../Redux/UserSlice";
import EditIcon from "@mui/icons-material/Edit";

const ProfilePopup = ({ profileState, sendToChild, sendEditToParent }) => {
  const [profileClosing, setProfileClosing] = useState(false);
  const [userData, setUserData] = useState(sendToChild.user);
  const [editPopup, setEditPopup] = useState(true);
  const popupRef = useRef(null);
  const fileInputRef = useRef(null); // Ref for file input

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleProfileClosing();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileClosing]);

  const handleProfileClosing = () => {
    setProfileClosing(!profileClosing);
    profileState(profileClosing);
  };

  const handleEditStatus = () => {
    setEditPopup(!editPopup);
    sendEditToParent(editPopup);
  };

  const handleUpdateProfile = () => {
    fileInputRef.current.click(); // Trigger file input when pen icon is clicked
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      // You can update the state or send the file to the backend here
    }
  };

  let url = `http://localhost:5400${userData.profilePic}`;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(unSetUser());
  };

  return (
    <div className={`profile-overlay ${true ? "show" : ""}`}>
      <div className={`profile-popup ${true ? "popup-open" : "popup-close"}`} ref={popupRef}>
        <div className="profile-header">
          <img src={url} alt="Profile" className="profile-avatar" />
          
          {/* Hidden File Input */}
          <input 
            type="file" 
            accept="image/*" 
            style={{ display: "none" }} 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />

          {/* Pen Icon */}
          <EditIcon className="edit-icon" onClick={handleUpdateProfile} />
        </div>

        <h2 className="profile-name">{userData.username}</h2>
        <p className="username">{userData.username}</p>

        <div className="profile-options">
          <button onClick={handleEditStatus} className="profile-option">✏ Edit Profile</button>
          <button className="profile-option">
            {userData.status === "online" ? "🟢 Online" 
              : userData.status === "offline" ? "⚫ Offline" 
              : userData.status === "idle" ? "🌙 Idle" 
              : userData.status === "dnd" ? "⛔ DND" 
              : ""}
          </button>
          <button onClick={handleLogout} className="profile-option">🔓 Log out</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
