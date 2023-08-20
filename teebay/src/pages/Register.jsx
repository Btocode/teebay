import React, { useState } from "react";
import Button from "../ui/Button";
import Password from "../ui/Password";
import AuthLayout from "../ui/AuthLayout";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <AuthLayout heading={"Sign Up"} classname={"xl:w-[800px] md:w-[700px] w-full border-2 py-10"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col justify-center items-center px-3 py-5 gap-8 w-[80%]">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border-2 px-4 py-2 outline-none rounded w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border-2 px-4 py-2 outline-none rounded w-full"
            />
          </div>
          <input
            type="text"
            placeholder="Address"
            className="border-2 px-4 py-2 outline-none rounded w-full"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Email"
              className="border-2 px-4 py-2 outline-none rounded w-full"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border-2 px-4 py-2 outline-none rounded w-full"
            />
          </div>
          <Password
            setPassword={setPassword}
            text="Password"
          />
          <Password
            setPassword={setConfirmPassword}
            text="Confirm Password"
          />

          <Button
            text="Sign Up"
            classname={
              "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-36"
            }
          />
        </form>
        <div className="flex gap-3">
          <p>Already have an account? </p>
          <a
            href="/login"
            className="text-blue-500 hover:text-blue-600 font-semibold">
            Sign In
          </a>
        </div>
        </AuthLayout>
  );
};

export default Register;
