import { useRef, useState, useEffect} from "react";
import "./Emo.css"
import axios from "axios";
import api from "../../api.jsx";
import Cookies from "js-cookie";
import {toast, ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
const Emo = ()=>{
  //Count the step for tracking the user action
    const [step , setStep] = useState(0);
    const [chatHistory , setChatHistory] = useState([
        {sender : "Emo" , text : "Greetings! May I know the name behind that awesome personality ? "}
    ]);
    const [userData , setUserData] = useState({
        username : "",
        email    : "",
        dob      : "",
        status   : "",
        password : "",
        OTP      : ""
    })

    //Navigation hook
    const navigate = useNavigate();

    //This array will help us , to setting the data into userData object
    const userKeys = ["username", "email", "dob", "status", "password"];

    let userInputRef = useRef();
    //Chat container ref will help us to scroll chat automatically
    let chatContainerRef = useRef();
    const steps = [
        "Greetings! May I know the name behind that awesome personality?",
        "What's the email address where you'd like to receive updates and cool surprises?",
        "Could you share your birthday so we can celebrate you in style?",
        "How would you like to show up? Are you online, offline, idle, or in Do Not Disturb mode?",
        "Time to lock things down! Create a password that only you know.",
        "Please Enter your OTP for verify the email."
    ]
//Validating the password in the function
    function validatePassword(password){
      if(password.length < 8 || password.length >16){
        return false;
      }
      let hasLower = false ;
      let hasUpper = false;
      let hasDigit = false;
      let hasSpecial = false;
      const specialCharacters = "!@#$%^&*()_+[]{}|;':\",.<>/?";
      for(let char of password){
        if(char >= 'a' && char <= 'z'){
            hasLower = true;
        } else if (char >= 'A' && char <= 'Z') {
          hasUpper = true;
        } else if (char >= '0' && char <= '9') {
          hasDigit = true;
        } else if (specialCharacters.includes(char)) {
          hasSpecial = true;
        }
      }
      return hasLower && hasUpper && hasDigit && hasSpecial;
    }

    //Checking the validation of user messages 
    const validateInput = (field , value)=>{
      if(field === "email"){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(value)){
          setChatHistory((prev) => [...prev , {sender : "user" , text : value}]);
          return "Please enter a valid email address."
        }
      }
      if(field === "password"){
        if(!validatePassword(value)){
          setChatHistory((prev) => [...prev , {sender : "user" , text : value}]);
          return "Password must contain one lowercase , one uppercase , one special character and one number "
        }
      }
      if (field === "dob") {
        const dobRegex = /^(?:19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!dobRegex.test(value)) {
          setChatHistory((prev) => [...prev , {sender : "user" ,  text : value}]);
          return "Date of birth must be in YYYY-MM-DD format.";
        }
      }
      if(field === "status"){
        console.log(value);
        if(value !== "idle" && value !=="offline" && value !== "online" && value !== "dnd"){
          setChatHistory((prev) => [...prev , {sender : "user" , text : value}]);
          return "The status should be either 'offline', 'online', 'dnd', or 'idle'."
        }
      }
      return "";
    }
    const [view , setView] = useState("password");
    const handleView = ()=>{
      if(view == "password")
        setView("text")
      else
        setView("password");
    }
    //This function will run after the each response of user 
    const sendMessage = ()=>{
        let mess = userInputRef.current.value;
        if(!mess) return;
        if (step === userKeys.length) {
          // Append user's OTP message.
          setChatHistory((prev) => [...prev, { sender: "user", text: mess }]);
          // Update OTP in userData.
          setUserData((prev) => ({ ...prev, OTP: mess }));
          userInputRef.current.value = "";
          // Advance to the next step (step 6) to trigger OTP verification.
          setStep(steps.length);
          return;
        }
        const currentField = userKeys[step];
        const error = validateInput(currentField , mess);

        if(error){
          setChatHistory(prev =>[...prev , {sender : "assistant" , text : error}]);
          userInputRef.current.value = "";
          return;
        }



        setChatHistory([...chatHistory , {sender : "user" , text : mess}]); 

        setUserData(prev => ({ ...prev, [userKeys[step]]: mess }));
      
        
        userInputRef.current.value = "";
        let nextStep =step + 1;
        setStep(nextStep);
        if (nextStep < steps.length) {          
            setChatHistory(prev => [
              ...prev,
              { sender: "assistant", text: steps[nextStep] }
            ]);
          }else if(steps.length == 5){
            setChatHistory(prev => [
              ...prev,
              { sender: "assistant", text: "Registration complete!" }
            ]);
            setStep(steps.length )
          }else if(steps.length == 6){            
            setChatHistory(prev =>[
              ...prev , {sender : "assistant" , text : steps[nextStep]}
            ])
          }
        };
        //For scrolling at the bottom of the chat 
        useEffect(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, [chatHistory]);

        useEffect(() => {          
          if (step === userKeys.length) {            
            const register = async () => {
              console.log(userData);
              
              try {
                const res = await axios.post(api.REGISTER, {
                  username: userData.username,
                  email: userData.email,
                  password: userData.password,
                  status: userData.status,
                  dob: userData.dob
                });
                toast.success("Registration Success ! Now Please verify your email...")
                console.log("Registration successful:", res.data);

                //Here we're getting the token from the backend and set that token into the cookies 
                

                const emailToken = res.data.user.emailVerifyToken;
                console.log(emailToken);
                
                if (emailToken) {
                  Cookies.set("emailVerifyToken", emailToken, { expires: 7, path: "/" });
                }
              } catch (err) {
                toast.error("Oops! something went wrong...")
                console.log("Error in Emo.jsx register function", err);
                const errMsg = err.response.data.message || "Invalid Information";
                setChatHistory((prev)=>[...prev , {sender : "assistant" , text : errMsg}]);
                setChatHistory((prev)=>[...prev , {sender : "assistant" , text : "Let's try again. Greetings! May I know the name behind that awesome personality?"}]);
                setStep(0);
              }
            };
            register();
          }else if (step == steps.length){
            
            const verifyEmail = async ()=>{
              try{
                const res = await axios.post(api.EMAILVERIFICATION , {
                  OTP : userData.OTP,
                },{ withCredentials: true });
                setChatHistory((prev) => [
                  ...prev,
                  { sender: "assistant", text: res.data.message || "Email verified successfully!" }
                ]);
                toast.success("Email verified successfully...");
                setTimeout(()=>{
                  navigate("/login");
                },2000)
              }catch(err){
                toast.error("Invalid OTP! Please try again...");
                console.log("Error in verifyOtp fucntion" , err);
                const errorMsg =
                err.response.data.message || "Incorrect OTP. Please try again.";
              setChatHistory((prev) => [
                ...prev,
                { sender: "assistant", text: errorMsg }
              ]);
              // Reset the step to re-prompt OTP entry.
              setStep(userKeys.length);
              }
            }
            verifyEmail();
          }
        }, [step, userData, steps.length]);
        
        const login = ()=>{
            navigate("/login");
        }
        const landing = ()=>{
          navigate("/")
        }
        console.log(step);
    return <>
     <ToastContainer/>
     <div className="glass-bg">
        <header className="glass-header">
          <h1 onClick={landing} className="signup-btn">Emo</h1>
          <h1 className="info" style={{fontWeight : "bold"}}>Create Your Account</h1>
          <button onClick={login} className="signup-btn">Login</button>
        </header>
      <div className="glass-container">
        <div className="glass-content" ref={chatContainerRef}>
        {chatHistory.map((msg , index)=>{ return <div key={index} className={`assistant-bubble ${msg.sender === "user" ? "user" : ""}`}> 
            <p style={{color : "white"}}>{msg.text} </p>
        </div>
    })}

         </div>
        <div className="message-input">
          <input type = {step == 4 ? view : "text"} onKeyDown={(e)=>{
            if(e.key === "Enter"){
                sendMessage();
            }
          }} ref={userInputRef}  placeholder="Message..." />
          {step == 4 && <EyeIcon onClick = {()=>{handleView()}} style={{marginRight : "12px"}}/>}
          <button onClick={()=>{sendMessage()}} className="send-btn">&#x27A4;</button>
        </div>
      </div>
    </div>
    </>
}
export default Emo;