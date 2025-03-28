import React, { useEffect, useRef, useState } from "react";
import "./UpdatePassword.css";
import axios from "axios";
import api from "../../api";
import { ToastContainer , toast } from "react-toastify";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from "react-router-dom";
const UpdatePassword = () => {
    const navigate = useNavigate();
    const newPassRef = useRef();
    const confirmPassref = useRef();

    const handleSubmit =  async ()=>{
        try{
        const res = await axios.post(api.UPDATE_PASSWORD , {newPassword : confirmPassref.current.value} , {withCredentials : true});
        toast.success("Password updated successfully...!" ,{
            position: "top-right",
            style: { zIndex: 9999 }
          });
          setTimeout(()=>{
              navigate("/");
          },2000);

        }catch(error){
            toast.error(error.response.data.message||"Something went wrong...!" ,);
            console.log("This error occur in submiting the form " , error); 
        }
    }
    const matchPass = ()=>{
        let confirm = document.getElementById("confirm").value;
        //The confirmPassref give me undefied so I target the vlaue by the help of id 
        if(newPassRef.current.value == confirm){
            handleSubmit();
        }else{
            toast.error("Password didn't match it...!")
        }
        
    }
    const handleVisibility = ()=>{
      let target =  document.getElementById("pass");
        target.type = target.type == "password" ? "text"  : "password";
    }
    const handleConfirmVisibility = ()=>{
        let target =  document.getElementById("confirm");
          target.type = target.type == "password" ? "text"  : "password";

    }
  return <>
        <ToastContainer/>
      <div className="update-password-container">
      <h2>Update Password</h2>
      <p>Enter your current and new password below.</p>
      <div className="password-form">
        <label>New Password</label>
        <div className="input-container">
        <input id="pass" ref={newPassRef} type="password" placeholder="Enter new password" />
        <span onClick={handleVisibility} className="icon"><VisibilityOutlinedIcon/></span>
        </div>
        <label>Confirm New Password</label>
        <div className="input-container">
        <input id="confirm"  ref = {confirmPassref} type="password" placeholder="Confirm new password" />
        <span onClick={handleConfirmVisibility} className="icon"><VisibilityOutlinedIcon/></span>
        </div>  
        <button onClick={matchPass} type="submit" className="update-btn">Update Password</button>
      </div>
    </div>
  </>
};

export default UpdatePassword;
