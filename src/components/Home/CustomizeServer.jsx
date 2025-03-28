import React, { useEffect, useState } from "react";
import "./CustomizeServer.css";
import axios from "axios";
import api from "../../api";

const CustomizeServer = ({receivedFromCustomize , sendDataToCreate}) => {
  const [serverName, setServerName] = useState("");
  const handleCustomize = ()=>{
        receivedFromCustomize();
  }
    const handleSubmit = async()=>{
    try{
      const res = await axios.post(api.CREATE_SERVER , {servername : serverName} , {withCredentials : true});
      sendDataToCreate(serverName)
    }catch(err){
        console.log(err);     
    }
}
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Customize Your Server</h2>
        <p>
          Give your new server a personality with a name and an icon. You can always change it later.
        </p>

        {/* Upload Section */}
        <div className="upload-section">
          <div className="upload-circle">
            <span className="upload-icon">📷</span>
            <input type="file" className="upload-btn" placeholder="+"/>
          </div>
          <p className="upload-text">UPLOAD</p>
        </div>

        {/* Server Name Input */}
        <label className="server-label">SERVER NAME</label>
        <input
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
            handleSubmit();
            handleCustomize();
            }
          }}
          type="text"
          className="server-input"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
          placeholder="Enter server name"
        />

        <p className="guidelines-text">
          By creating a server, you agree to Discord’s{" "}
          <span className="link-text">Community Guidelines.</span>
        </p>

        {/* Buttons */}
        <div className="button-container">
          <button onClick={handleCustomize} className= "back-btn" >Back</button>
          <button onClick={()=>{handleSubmit(); handleCustomize()}} className="create-btn">Create</button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeServer;
