"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const roles = ["user", "owner", "deliveryBoy"];
  const router = useRouter();

  // form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !phone || !role) {
      alert("Please fill all fields");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:5000/api/register",
        { fullName, email, password, mobile: phone, role, address },
        { withCredentials: true }
      );

      console.log(result.data);
      router.push("/signin");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="shadow-[0_0_25px_rgba(0,0,0,0.35)] bg-white p-6 rounded-xl w-96">
        <h1 className="text-2xl font-bold mb-2 text-black">Vingo</h1>
        <p className="text-gray-600 mb-6">
          This is the signup page of the Vingo application and you can signup
          here!
        </p>

        <form className="" onSubmit={handleSignup}>
          {/* Full Name */}
          <div className="flex flex-col mb-4">
            <label htmlFor="fullName" className="text-black font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="text-black outline-none px-3 py-2 rounded-lg border border-gray-400 focus:border-red-500 focus:shadow-[0_-4px_12px_rgba(255,0,0,0.3)] transition-all duration-600"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-black font-medium mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="text-black outline-none px-3 py-2 rounded-lg border border-gray-400 focus:border-red-500 focus:shadow-[0_-4px_12px_rgba(255,0,0,0.3)] transition-all duration-600"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col mb-4">
            <label htmlFor="phone" className="text-black font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone"
              className="text-black outline-none px-3 py-2 rounded-lg border border-gray-400 focus:border-red-500 focus:shadow-[0_-4px_12px_rgba(255,0,0,0.3)] transition-all duration-600"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="text-black font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="text-black w-full outline-none px-3 py-2 rounded-lg border border-gray-400 focus:border-red-500 focus:shadow-[0_-4px_12px_rgba(255,0,0,0.3)] transition-all duration-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col mb-4">
            <label htmlFor="address" className="text-black font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address"
              className="text-black outline-none px-3 py-2 rounded-lg border border-gray-400 focus:border-red-500 focus:shadow-[0_-4px_12px_rgba(255,0,0,0.3)] transition-all duration-600"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col mb-4">
            <label className="text-black font-medium mb-1">Role</label>
            <div className="flex items-center gap-2">
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  style={
                    role === r
                      ? {
                          background: "orange",
                          color: "white",
                          border: "1px solid orange",
                        }
                      : {
                          background: "white",
                          color: "black",
                          border: "1px solid black",
                        }
                  }
                  className="cursor-pointer font-medium px-6 py-1 rounded-lg"
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="cursor-pointer hover:bg-orange-700 w-full bg-orange-500 p-2 rounded-lg text-white font-medium"
          >
            SignUp
          </button>

          {/* OR Divider */}
          <div className="flex py-5 items-center w-full">
            <div className="border w-full border-gray-400"></div>
            <p className="px-2">OR</p>
            <div className="border w-full border-gray-400"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-gray-300 border border-black hover:bg-gray-500 hover:text-white w-full p-2 rounded-lg"
          >
            <FcGoogle size={20} />
            <span>Signup with Google</span>
          </button>

          {/* Login Link */}
          <p
            className="cursor-pointer mt-5"
            onClick={() => router.push("/signin")}
          >
            Already have an account?{" "}
            <span className="text-blue-700 underline">SignIn</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
