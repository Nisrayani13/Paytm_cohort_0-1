import { SignCard } from "../stylingComponents/SignCard";
import { InputField } from "../stylingComponents/InputField";
import { useState } from "react";
import axios from "axios";

export function Signup() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  return (
    <SignCard
      heading={"Sign Up"}
      about={"Enter your information to create an account"}
      buttonText={"Sign Up"}
      linkText={"Already have an account?"}
      linkUrl={"Sign in"}
      to={"/signin"}
      onClick={ async () => {
        const response=await axios.post("http://localhost:3000/user/signup", {
          username: username,
          firstName: firstName,
          lastName: lastName,
          password: password
        });
        localStorage.setItem("token",response.data.token);
      }}
    >
      <InputField
        onChange={(event) => setfirstName((firstName) => event.target.value)}
        label={"First Name"}
        placeholder={"John"}
      ></InputField>
      <InputField
        onChange={(event) => setlastName((lastName) => event.target.value)}
        label={"Last Name"}
        placeholder={"Doe"}
      ></InputField>
      <InputField
        onChange={(event) => setusername((username) => event.target.value)}
        label={"Email"}
        placeholder={"name@gmail.com"}
      ></InputField>
      <InputField
        onChange={(event) => setpassword((password) => event.target.value)}
        label={"Password"}
        placeholder={"123456"}
      ></InputField>
    </SignCard>
  );
}
