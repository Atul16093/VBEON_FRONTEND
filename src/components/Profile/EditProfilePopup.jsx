import React, { useState } from "react";
import "./EditProfilePopup.css"
const EditProfilePopup = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set profile image preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="overlay">
      <div className="profile-popup">
        <h2>Edit Profile</h2>

        {/* Profile Image Section */}
        <div className="profile-pic-container">
          <img
            src={profileImage || "https://via.placeholder.com/100"} // Default profile image
            alt="Profile"
            className="profile-pic"
          />
          <label className="edit-icon">
            {/* <FaPen /> */}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        {/* Input Fields */}
        <label>Name</label>
        <input type="text" placeholder="Enter your name" />

        <label>Status</label>
        <input type="text" placeholder="Enter your status" />

        <label>Bio</label>
        <textarea placeholder="Tell us about yourself"></textarea>

        <label>Date of Birth</label>
        <input type="date" />

        <div className="buttons">
          <button className="save">Save</button>
          <button className="cancel" >Cancel</button>
        </div>
      </div>
    </div>
  );
  
};

export default EditProfilePopup;
