import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children})=>{
  const {isLoggedIn} =  useSelector((store)=>store.User);
  if(isLoggedIn)
    return children;
  else 
    return <Navigate to = "/"/>
}
export default ProtectedRoute;