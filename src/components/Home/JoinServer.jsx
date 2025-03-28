import { useState } from "react";
import "./JoinServer.css";
import axios from "axios";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
const JoinServer = ({ closeStatus , popUpClose}) => {
    const [inviteLink, setInviteLink] = useState("");
    const [close , setClose]    =  useState();
     console.log(inviteLink);
     
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        if (!inviteLink) {
            alert("Please enter an invite Code.");
            return;
        }
        //Getting the last invite code from here 
        const code = inviteLink;
        const res = await axios.post(`${api.JOIN_SERVER}${code}` ,{}, {withCredentials : true})
        console.log(res);
        toast.success("Server joined successfully");
        setTimeout(() => {
            closePopup(); 
        }, 1500);
        }catch(error){
            toast.error(error.response.data.message || "Invalid Server code...");
            console.log("Error in handle submit " , error);
            
        }
    };
    const handleClose = ()=>{
        setClose(false);
        closeStatus(close);
    }
    const closePopup = ()=>{
        setClose(false);
        popUpClose()
    }
    return <>
        <ToastContainer/>
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" style={{outline : "none", width : "45px"}} onClick={closePopup}>X</button>
                <h2>Join a Server</h2>
                <p className="modal-description">
                    Enter an invite below to join an existing server
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="invite-link" className="input-label">
                        INVITE LINK <span className="required">*</span>
                    </label>
                    <input
                        onKeyDown={(e)=>{
                            if(e.key === "Enter"){
                                handleSubmit();
                            }
                        }}
                        type="text"
                        id="invite-link"
                        className="invite-input"
                        placeholder="e57e0bc0"
                        value={inviteLink}
                        onChange={(e) => setInviteLink(e.target.value)}
                        required
                    />

                    <p className="invite-examples">INVITES SHOULD LOOK LIKE</p>
                    <p className="example-link">hTKzmak</p>
                    <p className="example-link">15edefc6k</p>

                    <div className="discover-section">
                        <span className="discover-icon">✅</span>
                        <div>
                            <p className="discover-title">Don't have an invite?</p>
                            <p className="discover-text">Check out Discoverable communities in Server Discovery.</p>
                        </div>
                    </div>

                    <div className="buttons">
                        <button type="button" className="back-btn" onClick={handleClose}>Back</button>
                        <button type="submit" className="join-btn" >Join Server</button>
                    </div>
                </form>
            </div>
        </div>
     </>
};

export default JoinServer;
