import { useEffect, useRef, useState } from "react";
import "./ResetPassword.css"
import axios from "axios";
import api from "../../api";
import {useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UpdatePassword from "./UpdatePassword";
const ResetPassword = ({email})=>{
  const navigate = useNavigate();
  useEffect(()=>{
    verificationForReset();
  },[email])
  const verificationForReset = async()=>{
    try{
        const res = await axios.post(api.OTP_FOR_PASSWORD_RESET , {email} , {withCredentials : true});
        toast.success("OTP sent SuccessFully")
      }catch(error){
        toast.error("Email id not exist...!")
        console.log("Error in verficationForReset " , error);
        navigate("/")
        
      }
  }
    const [isTrue ,setIsTrue] = useState(false);
    const inputRefs = useRef();    
    const handleVerifyOTP  = async ()=>{
          try{
             const res = await axios.post(api.OTP_VERIFICATION_FOR_PASSWORD , {OTP : inputRefs.current.value}, {withCredentials : true})
             toast.success("OTP Verified successfully..." , {
              position: "top-right",
              style: { zIndex: 9999 }
            })
             setIsTrue(true);
          }catch(error){
            toast.error("Invalid OTP....!");
            console.log(error);
            
          }
    }
    return <>
    <ToastContainer/>
    {isTrue && <UpdatePassword/>}
    <div className="d-flex align-items-center justify-content-center" style={{height : "100%"}}>
      <div className="otp-container">
      <h2>Enter OTP</h2>
      <p>We have sent a code to your email. Please enter it below.</p>
      <div className="otp-inputs">
        <input onKeyDown={(e)=>{if(e.key === "Enter"){ handleVerifyOTP()}}} style={{width : "100%"}} ref = {inputRefs} type="text" maxLength= "6" placeholder="Please Enter your OTP here..." />
      </div>
      <button onClick={handleVerifyOTP} className="submit-btn">Verify</button>
    </div>
</div>
    </>
};
export default ResetPassword;