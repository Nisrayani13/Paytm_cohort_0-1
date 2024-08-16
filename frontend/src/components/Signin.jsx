import { useState } from "react";
import { InputField } from "../stylingComponents/InputField";
import { SignCard } from "../stylingComponents/SignCard";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export function Signin() {
  const [username,setusername]=useState("");
  const [password,setpassword]=useState("");
  const navigate=useNavigate();
  return (
    <SignCard
      heading={"Sign In"}
      about={"Enter your credentials to access your account"}
      buttonText={"Sign In"}
      linkText={"Don't have an account?"}
      linkUrl={"Sign Up"}
      to={"/signup"}
      onClick={async ()=>{
        const response=await axios.post("http://localhost:3000/user/signin",{
          username: username,
          password: password
        })
        localStorage.setItem("token",response.data.token);
        console.log(localStorage.getItem("token"))
        navigate("/dashboard")
      }}
    >
      <InputField onChange={(event)=>setusername(event.target.value)} label={"Email"} placeholder={"name@gmail.com"}></InputField>
      <InputField onChange={(event)=>setpassword(event.target.value)} label={"Password"} placeholder={"123456"}></InputField>
    </SignCard>
  );
}
