import "./Hero.css";
import minimize from "../../assets/Vector.svg";
import Plus from "../../assets/Plus.svg";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api.jsx";
import axios from "axios";
import socket from "../../socket/SocketUrl.jsx";
import CreateChannel from "./CreateChannel.jsx";
import CreateServer from "./CreateServer.jsx";
import VerticalDot from "../../assets/VerticalDot.svg";
import ServerOptions from "./ServerOptions.jsx";
import InvitePopup from "../InviteSection/InvitePopup.jsx";
import ProfilePopup from "../Profile/ProfilePopup.jsx";
import ServerSettingsPopup from "../ServerSetting/ServerSettingsPopup.jsx";
import MemberSelector from "../PrivateChannel/MemberSelector.jsx";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import EmojiPicker from "emoji-picker-react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
// import GifOutlinedIcon from '@mui/icons-material/GifOutlined';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileComponent from "../AttachFile/FileComponent.jsx";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteChannel from "../../ModifyChannel/DeleteChannel.jsx";
import { useNavigate } from "react-router-dom";
import AddingMember from "../PrivateChannel/AddingMember.jsx";
import { Switch } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ShowMember from "../Members/ShowMember.jsx";
import VideoCall from '@mui/icons-material/Duo';
const Hero = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [channels, setChannels] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [server, setServer] = useState();
  const serverData = useSelector((store) => store.User);
  const [newServer, setNewServer] = useState(serverData.user.servers);
  const user_id = serverData.user.id;
  const newMessageRef = useRef();
  const chatContainerRef = useRef(null);
  const [addChannelPopup, setAddChannelPopup] = useState(false);
  const [addServerPopup, setAddServerPopup] = useState(false);
  const [serverOptionsPopup, setServerOptionsPopup] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState();
  const [updatedChannelData, setUpdatedChannelData] = useState([]);
  const [deleteChannel, setDeleteChannel] = useState(false);
  //It's for invite popup
  const [popupStatus, setPopupStatus] = useState(false);
  //Handle data from child
  const handleDataFromChild = async (data) => {
    try {
      setAddChannelPopup(data.data);
      let res = await axios.get(`${api.GET_CHANNEL}${data.serverId}`, {
        withCredentials: true,
      });
      // console.log(res.data.channelInfo);
      setChannels(res.data.channelInfo);
    } catch (err) {
      console.log("Error in handleDataFromChild", err);
    }
  };
  useEffect(() => {}, []);
  //Setup the socket io...
  useEffect(() => {
    socket.emit("userConnected", user_id);
  }, [user_id]);

  //This useEffect use for taking the container to current chat

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!selectedChannel) return;

    const handleMessage = (message) => {
      if (message.sender !== user_id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };
    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage); // Cleanup event listener
    };
  }, [selectedChannel, user_id]);

  const min = () => {
    setIsHidden(!isHidden);
  };

  const handleServerClick = async (server) => {
    setSelectedServer(server);
    setSelectedChannel(null);
    setMessages([]);
    try {
      let res = await axios.get(`${api.GET_CHANNEL}${server._id}`, {
        withCredentials: true,
      });
      setUpdatedChannelData(res.data.channelInfo);
      setChannels(
        Array.isArray(res.data.channelInfo) ? res.data.channelInfo : []
      );
    } catch (err) {
      console.log("Error fetching channels:", err);
      setChannels([]);
    }
  };

  const handleChannelClick = async (channel) => {
    setSelectedChannel(channel);
    setMessages([]);
    try {
      let res = await axios.get(`${api.GET_MESSAGES}${channel._id}`);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.log("error in handlechannel click", err);
    }
    socket.emit("joinChannel", { channelId: channel._id, user_id });
  };

  const sendMessage = () => {
    if (!newMessageRef.current.value.trim() || !selectedChannel) return;

    const messageData = {
      sender: { _id: user_id, username: serverData.user.username },
      content: newMessageRef.current.value,
      channelId: selectedChannel._id,
      timestamp: new Date().toISOString(),
    };

    socket.emit("sendMessage", messageData);

    setMessages((prevMessages) => [...prevMessages, messageData]);
    newMessageRef.current.value = "";
  };

  const handleAddChannel = () => {
    setAddChannelPopup(!addChannelPopup);
  };

  const handleCreateServer = async () => {
    setAddServerPopup(true);
  };

  const handleByServer = (data) => {
    setAddServerPopup(data);
    handleCreateData();
  };
  //WithCreditals true basically help us to taking the data from the cookies.
  const handleCreateData = async (data) => {
    const res = await axios.get(`${api.ALL_SERVER}${serverData.user.id}`, {
      withCredentials: true,
    });
    setNewServer(res.data.detail.servers);
    console.log("Handle create data ", data);
    setServer(data);
  };
  useEffect(() => {}, []);
  const handleOptions = () => {
    setServerOptionsPopup(!serverOptionsPopup);
  };
  const handleInviteStatus = (data) => {
    setServerOptionsPopup(!serverOptionsPopup);
    setPopupStatus(data);
  };
  //Handle the invite
  const handleInvite = (data) => {
    setPopupStatus(data);
  };
  const handleClick = (data) => {
    console.log("See your clicking status ", data);
    setServerOptionsPopup(data);
  };
  const [userPopup, setUserPopup] = useState(false);
  //UserPopup
  const handleUserPopup = () => {
    setUserPopup(!userPopup);
  };
  //handle closing of profile
  const handleProfileClosing = (data) => {
    setUserPopup(data);
  };
  let url = `http://localhost:5400${serverData.user.profilePic}`;
  const [isClose, setIsClose] = useState(false);
  const handleIsClose = (data) => {
    setServerOptionsPopup(!serverOptionsPopup);
    console.log("it's a data of is close ", data);
    setIsClose(data);
  };
  const handleSettingStatus = (data) => {
    setIsClose(data);
  };
  //It's a editing popup closing and displaying function
  //Doing this for live rendering
  const handleDeleteStatus = async (data) => {
    console.log(data);
    const res = await axios.get(`${api.ALL_SERVER}${serverData.user.id}`, {
      withCredentials: true,
    });
    setNewServer(res.data.detail.servers);
  };
  //It's help us the handle the rerendring the main component while we update the name of the server
  const handleForRendering = async (data) => {
    const res = await axios.get(`${api.ALL_SERVER}${serverData.user.id}`, {
      withCredentials: true,
    });

    setNewServer(res.data.detail.servers);
  };
  const handleChannelData = async (data) => {
    let res = await axios.get(`${api.GET_CHANNEL}${data}`, {
      withCredentials: true,
    });
    setUpdatedChannelData(res.data.channelInfo);
    setChannels(res.data.channelInfo);
  };
  //Handle private member popup
  const [privatePopup, setPrivatePopup] = useState(false);
  const handleChannelPopup = (data) => {
    setPrivatePopup(data);
  };
  const handleMemberSelector = (data) => {
    setPrivatePopup(data);
  };
  const [showPicker, setShowPicker] = useState(false);
  const handleEmojiSelect = (emoji) => {
    newMessageRef.current.value += emoji.emoji;
  };
  const [showFile, setShowFile] = useState(false);
  const handleAttachFile = () => {
    setShowFile(!showFile);
  };
  const handleAttachFalse = (data) => {
    setShowFile(data);
  };

  const handleDeleteChannelPopup = () => {
    setDeleteChannel(!deleteChannel);
  };
  const handleDeleteChannelProps = async (data) => {
    setDeleteChannel(data);
    try {
      let res = await axios.get(
        `${api.GET_CHANNEL}${selectedChannel.serverId}`,
        {
          withCredentials: true,
        }
      );
      setUpdatedChannelData(res.data.channelInfo);
      setChannels(
        Array.isArray(res.data.channelInfo) ? res.data.channelInfo : []
      );
    } catch (err) {
      console.log("Error fetching channels:", err);
      setChannels([]);
    }
  };
  console.log(channels);
  console.log(selectedChannel);
  const [memberPopup, setMemberPopup] = useState(false);
  const handleAddMemberPopup = () => {
    setMemberPopup(!memberPopup);
  };
  const handleClosingMemberData = (data) => {
    setMemberPopup(data);
  };
  const [text, setText] = useState("DarkMode");
  const handleText = () => {
    if (text == "Dark Mode") {
      setText("Light Mode");
    } else if (text == "Light Mode") {
      setText("Dark Mode");
    }
  };
  const [memberStatus, setMemberStatus] = useState(false);
  const handleServerShow = (data) => {
    setMemberStatus(data);
  };
  const handleChildData = () => {
    setMemberStatus(!memberStatus);
  };
  console.log("Selected by panda ", serverData);
  console.log("It's your message " , messages);
  const navigate = useNavigate();
  const handleVideoClick = (id)=>{
   
     navigate("/group-chat" , {state : id});
  }
  
  return (
    <>
      <div className="dashboard">
        {/* SERVER LIST (Far Left) */}
        <nav className="server-list">
          <ul>
            <li
              onClick={() => {
                setSelectedServer(null);
                min();
              }}
              className="server-icon home-icon"
            >
              🏠
            </li>
            {newServer.map((server, index) => {
              return (
                <button
                  className="server-icon"
                  key={index}
                  onClick={() => handleServerClick(server)}
                >
                  {server.servername[0]}
                </button>
              );
            })}
            <li onClick={handleCreateServer} className="server-icon">
              <img
                src={Plus}
                alt="add Server"
                style={{ width: "20px", height: "20px" }}
              />
            </li>
          </ul>
        </nav>
        {/* SIDEBAR (Channels) */}
        <aside className={isHidden ? "minSidebar" : "sidebar"}>
          <div className="sidebar-header">
            <h1 className="logo">VBEON</h1>
            <span
              onClick={() => {
                document.body.classList.toggle("light-mode");
                handleText();
              }}
            >
              <DarkModeIcon />
            </span>
            <h1>
              <img
                className="minimize"
                onClick={min}
                src={minimize}
                alt="arrow"
              />
            </h1>
          </div>

          <div className="channels">
            <div className="channel-group">
              <div>
                <span className="text-channel">TEXT CHANNELS </span>
                {serverData.user.servers.length > 0 &&
                serverData.user.servers[0].owner._id == user_id ? (
                  <button
                    onClick={handleAddChannel}
                    style={{ outline: "none", width: "43px" }}
                    className="plus-btn"
                  >
                    {selectedServer == null ? (
                      ""
                    ) : (
                      // <img className="plus" src={Plus} alt="" />
                      <span className="plus">
                        <AddIcon />
                      </span>
                    )}
                  </button>
                ) : (
                  ""
                )}
                <span
                  onClick={handleOptions}
                  className="plus-btn"
                  style={{ outline: "none", marginLeft: "1px", width: "40px" }}
                >
                  {" "}
                  {selectedServer == null ? "" : <MoreVertIcon />}
                </span>
              </div>
              {serverOptionsPopup ? (
                <ServerOptions
                  sendToHeroByMember={handleServerShow}
                  sendToHeroForDelete={handleDeleteStatus}
                  isClose={handleIsClose}
                  sendSelectedServer={selectedServer}
                  sendDataToChild={serverData}
                  inviteStatus={handleInviteStatus}
                  clickSentToParent={handleClick}
                />
              ) : (
                ""
              )}
              <ul>
                {channels.map((channel, index) => { return (!channel.private && channel.type == "text" && ( <li  key={index}  onClick={() => {  handleChannelClick(channel);}}> <PublicOutlinedIcon style={{ width: "15px" }} />{channel.channelname}
                      </li>
                    )
                  );
                })}
                <span className="text-channel">Private Channel </span>
                {channels.map((channel, index) => {
                  return (
                    channel.private &&
                    channel.type === "text" &&
                    channel.allowedMembers.includes(serverData.user.id) && (
                      <li
                        key={index}
                        onClick={() => handleChannelClick(channel)}
                      >
                        {" "}
                        <SecurityOutlinedIcon style={{ width: "15px" }} />{" "}
                        {channel.channelname}
                      </li>
                    )
                  );
                })}
              </ul>
            </div>

            <div className="channel-group">
              <h3>VOICE CHANNELS</h3>
              <ul>
                {channels.map((channel, index) => {
                  return (
                    channel.type == "voice" && channel.private == false &&
                    <li 
                      key={index}
                      
                      onClick={() => {
                        handleChannelClick(channel);
                      }}
                      >
                      🐼 {channel.channelname}
                    </li>
                  );
                })}
                <span className="text-channel">Private Group Call</span>
                {channels.map((channel, index) => {
                  return (
                    channel.private &&
                    channel.type === "voice" &&
                    channel.allowedMembers.includes(serverData.user.id) && (
                      <li
                        key={index}
                        onClick={() => handleChannelClick(channel)}
                      >
                        {" "}
                        <SecurityOutlinedIcon style={{ width: "15px" }} />{" "}
                        {channel.channelname}
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
          </div>
          {userPopup ? (
            <div className="user-details">
              <ProfilePopup
                profileState={handleProfileClosing}
                sendToChild={serverData}
              />{" "}
            </div>
          ) : (
            ""
          )}
          <div className="user-info">
            <img src={url} alt="User" />
            <div className="user-details">
              <button
                style={{ outline: "none " }}
                onClick={handleUserPopup}
                className="username plus-btn"
              >
                {serverData.user.username}
              </button>
              <p className="status">
                {serverData.user.status == "online"
                  ? "🟢 Online"
                  : serverData.user.status == "offline"
                  ? "⚫ Offline"
                  : serverData.user.status == "idle"
                  ? "🌙 Idle"
                  : serverData.user.status == "dnd"
                  ? "⛔ DND"
                  : ""}{" "}
              </p>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT (Chat) */}
        <main className="main">
          {memberStatus && (
            <ShowMember
              sendToHeroByMember={handleChildData}
              sendToMember={selectedServer}
            />
          )}
          {privatePopup ? (
            <MemberSelector
              sendToChild={updatedChannelData}
              MemberSelectorToHero={handleMemberSelector}
            />
          ) : (
            ""
          )}
          {isClose ? (
            <ServerSettingsPopup
              sendUpdatedMessage={handleForRendering}
              sendServerDetails={selectedServer}
              sendToHeroByServer={handleSettingStatus}
            />
          ) : (
            ""
          )}
          {popupStatus ? (
            <InvitePopup
              serverInfo={selectedServer}
              inviteClose={handleInvite}
            />
          ) : (
            ""
          )}

          {addChannelPopup && (
            <div className="modal-overlay">
              <div className="modal-content">
                <CreateChannel
                  ChildToParentForPopup={handleChannelPopup}
                  ChannelToParent={handleChannelData}
                  sendDataToParent={handleDataFromChild}
                  serverId={selectedServer._id}
                />
              </div>
            </div>
          )}

          {addServerPopup && (
            <CreateServer
              sendDataToParent={handleByServer}
              sendDataToHero={handleCreateData}
            />
          )}
          {selectedChannel ? (
            <>
              {deleteChannel && (
                <DeleteChannel
                  sendToChild={selectedChannel._id}
                  sendByDeleteChannel={handleDeleteChannelProps}
                />
              )}
              {memberPopup && (
                <AddingMember
                  currentChannel={selectedChannel}
                  sendToChildId={selectedChannel._id}
                  sendToChildServerId={selectedChannel.serverId}
                  closingAddingMemberPopup={handleClosingMemberData}
                />
              )}
              {/* Channel Header */}
              <div className="channel-header">
                <h2># {selectedChannel.channelname}</h2>
                <div
                  style={{ marginRight: "12px", display: "flex", gap: "15px" }}
                >
                  {selectedChannel.type == "voice" && <span onClick={()=>{handleVideoClick(selectedChannel._id)}}><VideoCall/></span>}
                  <span onClick={handleDeleteChannelPopup}>
                    <RemoveCircleIcon />
                  </span>
                  <span onClick={handleAddMemberPopup}>
                    {selectedChannel.private && <PersonAddIcon />}
                  </span>
                </div>
              </div>

              {/* Chat Area */}
             {messages.length == 0 ? <div className="empty-message">
          <p className="para" style={{fontSize : "16px"}}>No messages yet! Start the conversation 🎉</p>
        </div> : ""}
              <div className="chat-area">
                <div className="messages" ref={chatContainerRef}>
                  {messages.map((msg, index) => {
                    const isSentByUser = msg.sender._id === user_id;

                    // Convert timestamp to readable format
                   
                    return (
                      <div
                        key={index}
                        className={`message-container ${
                          isSentByUser ? "sent " : "received "
                        }`}
                      >
                        <p className="message-username ">
                          {msg.sender.username}
                        </p>
                        {/* Message Bubble */}
                        <div className="message-bubble">
                          <span className="message-text">{msg.content}</span>
                          {/* Timestamp Display */}
                          {/* <span >{formattedTime}</span> */}
                          <small className="message-time">
                            {/* It's a iife function */}
                            {(() => {
                              const timeParts = new Date(msg.timestamp)
                                .toLocaleTimeString()
                                .split(":");
                              return `${timeParts[0]}:${timeParts[1]} ${
                                timeParts[2].split(" ")[1]
                              }`;
                            })()}
                          </small>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Emoji Picker */}
                {showPicker && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "80px",
                      right: "34px",
                      zIndex: 10,
                    }}
                  >
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                  </div>
                )}
                {/* Message Input */}
                <div className="chat-input-container ">
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    ref={newMessageRef}
                    type="text"
                    placeholder="Message..."
                  />
                  {/* Sending the file  */}
                  {showFile && (
                    <FileComponent
                      isTrue={true}
                      attachFalse={handleAttachFalse}
                    />
                  )}
                  <button
                    onClick={handleAttachFile}
                    style={{
                      outline: "none",
                      border: "none",
                      background: "transparent",
                      width: "45px",
                    }}
                  >
                    {/* Emoji Button */}
                    <AttachFileIcon />
                  </button>
                  <button
                    onClick={() => {
                      setShowPicker((prev) => !prev);
                    }}
                    style={{
                      outline: "none",
                      border: "none",
                      background: "transparent",
                      width: "45px",
                    }}
                  >
                    <EmojiEmotionsOutlinedIcon />
                  </button>
                  <button onClick={sendMessage} className="send-btn">
                    &#x27A4;
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <p className="select-channel-message">
                Welcome {serverData.user.username} ☺️,
                <br /> Select a channel to start chatting
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Hero;
