import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({children}){
    const navigate=useNavigate();
    const token=localStorage.getItem("token");
    useEffect(()=>{
        if(!token){
            navigate("/signup")
        }
    },[navigate,token])
    if(!token)return null;
    return children;
}

export default ProtectedRoute;