import { InputField } from "../stylingComponents/InputField";
import { SignCard } from "../stylingComponents/SignCard";

export function Signin() {
  return (
    <SignCard
      heading={"Sign In"}
      about={"Enter your credentials to access your account"}
      buttonText={"Sign In"}
      linkText={"Don't have an account?"}
      linkUrl={"Sign Up"}
      to={"/signup"}
    >
      <InputField label={"Email"} placeholder={"name@gmail.com"}></InputField>
      <InputField label={"Password"} placeholder={"123456"}></InputField>
    </SignCard>
  );
}
