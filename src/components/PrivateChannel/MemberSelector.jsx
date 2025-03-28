import React, { useState, useEffect } from "react";
import "./MemberSelector.css";
import axios from "axios";
import api from "../../api";
const MemberSelector = ({ MemberSelectorToHero , sendToChild }) => {
  console.log(sendToChild)
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  useEffect(() => {
      fetchData();
  }, []);
   const detail = sendToChild[sendToChild.length-1]   
//    console.log(detail);
   
  const fetchData = async ()=>{
     const res = await axios.get(`${api.GET_SERVER_DETAILS}${detail.serverId}/` , {withCredentials : true});
     setMembers(res.data.serverInfo.members);
  }
  const handleCheckboxChange = (member) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(member)
        ? prevSelected.filter((m) => m !== member)
        : [...prevSelected, member]
    );
    // console.log("Hello world" , selectedMembers);
    // console.log("Handle Data",member);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Selected Members:", selectedMembers);
      onClose(); // Close the modal on Enter
    }
  };
  const onClose  = ()=>{
    MemberSelectorToHero(false)
  };
  
  const handleAddMember = async ()=>{
       if(selectedMembers.length === 0){
            console.log("No members selected");
            return; 
       }
       const memberIds = selectedMembers.map(member => member.user._id);
       console.log("Sending membersIds : " , memberIds);
       try{
         const res = await axios.post(`${api.ADD_MEMBERTO_CHANNEL}${detail._id}/add-members`, {memberIds} , {withCredentials : true});
         console.log("Response from backend:", res);
        }catch(error){
            console.log("Error in adding member : " , error.response?.data || error.message );
        }
  }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        onKeyDown={handleKeyDown}
        tabIndex="0"
      >
        <h3>Add members or roles</h3>
        <input
          type="text"
          placeholder="e.g. Moderators, @username"
          className="search-box"
        />

        <div className="roles-section">
          <p>ROLES</p>
          <span>You haven't created any roles yet</span>
        </div>

        <div className="members-section">
          <p>MEMBERS</p>
          {members.map((member) => (
            <label key={member.user._id} className="member-item">
              <input  type="checkbox"
                checked={selectedMembers.includes(member)}
                onChange={() => handleCheckboxChange(member)}
              />
              {member.role != "admin" ? <div> <img src={`http://localhost:5400${member.user.profilePic}`} alt={member.name} className="avatar" /> {member.user.username}</div>: ""}
            </label>
          ))}
        </div>

        <div className="buttons">
          <button className="back-btn" onClick={onClose}>
            Back
          </button>
          <button className="skip-btn" onClick={()=>{handleAddMember(); onClose();}}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberSelector;
