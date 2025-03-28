import { useState } from "react";
import "./CreateServer.css";
import CustomizeServer from "./CustomizeServer";
import JoinServer from "./JoinServer";
const CreateServer = ({sendDataToParent, sendDataToHero })=>{
    const [close , setClose] = useState();
    const [customizeState , setCustomizeState] = useState();
    const [joinServer , setJoinServer] = useState(false);
    const handleClose = ()=>{
        setClose(false);
        sendDataToParent(close);
    }
    const handleCustomize = ()=>{
            setCustomizeState(prev => !prev); 
    }
    const handleReceivedData =()=>{
        handleClose();
    }
    const handleCreateData = (data)=>{
       sendDataToHero(data)        
    }
    const handleJoin = ()=>{
        setJoinServer(true);
    }
    const handleOnClose = ()=>{
        setJoinServer(false);    
    }
    const handlePopup = ()=>{
        handleClose();
    }
    return <>
    {/* Sending data to upper parent by using sendDataToCreate that help me to showing server creation live */}
        {customizeState ?  <CustomizeServer receivedFromCustomize = {handleReceivedData}  sendDataToCreate={handleCreateData}/> : joinServer ? <JoinServer popUpClose={handlePopup} closeStatus={handleOnClose}/> :
        <div className="modal-overlay">
      <div className="modal-container">
        <h2>Create Your Server</h2>
        <p className="modal-description">
          Your server is where you and your friends hang out. Make yours and start talking.
        </p>

        <div onClick={()=>{handleCustomize()}}  className="option create-own">
          <div className="icon">🛠️</div>
          <p>Create My Own</p>
        </div>

        <p className="section-title">Start From a Template</p>

        <div className="option">
          <div className="icon">🎮</div>
          <p>Gaming</p>
        </div>

        <div className="option">
          <div className="icon">👥</div>
          <p>Friends</p>
        </div>

        <div className="option">
          <div className="icon">📚</div>
          <p>Study Group</p>
        </div>

        <div className="join-server">
          <p>Have an invite already?</p>
          <button onClick={handleJoin}  className="join-btn">Join a Server</button>
        </div>

        <button className="close-btn" style={{width : "30px" , outline : "none"}} onClick={handleClose}>X</button>
      </div>
    </div>
    };
    </>
}
export default CreateServer;