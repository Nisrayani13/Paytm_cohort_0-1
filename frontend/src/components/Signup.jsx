import { SignCard } from "../stylingComponents/SignCard";
import { InputField } from "../stylingComponents/InputField";

export function Signup() {
  return (
      <SignCard
        heading={"Sign Up"}
        about={"Enter your information to create an account"}
        buttonText={"Sign Up"}
        linkText={"Already have an account?"}
        linkUrl={"Sign in"}
        to={"/signin"}
      >
        <InputField label={"First Name"} placeholder={"John"}></InputField>
        <InputField label={"Last Name"} placeholder={"Doe"}></InputField>
        <InputField label={"Email"} placeholder={"name@gmail.com"}></InputField>
        <InputField label={"Password"} placeholder={"123456"}></InputField>
      </SignCard>
  );
}
