import React, { useState, useEffect } from "react";
import "../PrivateChannel/MemberSelector.css";
import "./ShowMember.css";
import axios from "axios";
import api from "../../api";
const ShowMember = ({sendToMember , sendToHeroByMember}) => {  
  const [members , setMembers] = useState([]);
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData = async ()=>{
  try{
     const res = await axios.get(`${api.GET_SERVER_DETAILS}${sendToMember._id}`, {withCredentials : true})
    setMembers(res.data.serverInfo.members);
    
  }catch(error){
    console.log(error)
  }
}
  const [onClose , setOnClose] = useState(false);
  const handleOnClose = ()=>{
    setOnClose(!onClose)
    sendToHeroByMember(onClose);
  }
  
  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        tabIndex="0"
      >
        <h3>Members of the Server</h3>
        {/* <input
          type="text"
          placeholder="e.g. Moderators, @username"
          className="search-box"
        /> */}

        {/* <div className="roles-section">
          <p>ROLES</p>
          <span>You haven't created any roles yet</span>
        </div> */}

        <div className="members-section">
          <p>MEMBERS</p>
          {members.map((data , index)=>{return <label className="member-label" key={index}>{data.user.username}</label>})}
        </div>

        <div className="buttons">
          <button onClick={handleOnClose} className="back-btn">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowMember;
