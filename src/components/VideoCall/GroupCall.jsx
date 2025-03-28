import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { APP_ID , SERVER_SECRET } from "../../constant";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
function GroupCall(){
    const location = useLocation();
     const [input, setInput] = useState('');
     const [roomID, setRoomID] = useState(location.state);
     const meetingContainer = useRef(null);
   
     const submitHandler = () => {
       if (input.trim()) {
         setRoomID(input.trim());
       }
     };
   
     useEffect(() => {
       if (roomID && meetingContainer.current) {
         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
           APP_ID,
           SERVER_SECRET,
           roomID,
           Date.now().toString(),
           'Client'
         );
   
         const zp = ZegoUIKitPrebuilt.create(kitToken);
         zp.joinRoom({
           container: meetingContainer.current,
           sharedLinks: [
             {
               name: 'Copy link',
               url: `${window.location.protocol}//${window.location.host}?roomID=${roomID}`,
             },
           ],
           scenario: {
             mode: ZegoUIKitPrebuilt.OneONoneCall,
           },
         });
       }
     }, [roomID]);
   
     return (
<div style={{ textAlign: "center", padding: "20px" }}>
      {!roomID ? (
        <section>
          <h2>Join a Video Call</h2>
          <p>Enter a Room ID to start or join a call.</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter Room ID..."
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "250px",
                textAlign: "center",
              }}
            />
            <button
              onClick={submitHandler}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            >
              Join
            </button>
          </div>
        </section>
      ) : (
        <section>
          <h2>Meeting Room</h2>
          <div ref={meetingContainer} style={{ width: "100%", height: "80vh", marginTop: "10px" }}></div>
        </section>
      )}
    </div>
     );
}
export default GroupCall;