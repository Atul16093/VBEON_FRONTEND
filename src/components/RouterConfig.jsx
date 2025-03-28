import { Route, Routes } from "react-router-dom";
import LandingPage from "./nonAuthenticatePage/LandingPage.jsx";
import Emo from "./nonAuthenticatePage/Emo.jsx";
import Login from "./nonAuthenticatePage/login.jsx";
import Hero from "./Home/Hero.jsx";
import About from "./Home/About.jsx";
import Contact from "./Home/Contact.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import GroupCall from "./VideoCall/GroupCall.jsx";
let RouterConfig = ()=>{
    return <>
        <Routes>
            <Route path="/" element = {<LandingPage/>}/>
            <Route path = "/emo" element = {<Emo/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/home"  element = {<ProtectedRoute><Hero/></ProtectedRoute>}/>
            <Route path = "about"  element = {<About/>}/>
            <Route path = "contact"  element = {<Contact/>}/>
            <Route path = "group-chat" element = {<GroupCall/>}/>
        </Routes>
    </>
}

export default RouterConfig;