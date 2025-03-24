import React, { useContext, useState } from "react";
import registerAnimation from "../../public/Lottie/Register animation.json";
import Lottie from "lottie-react";
import Context from "./Context/Context";
import { FaEye, FaEyeSlash, FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineEmail, MdOutlineLock, MdOutlineImage } from "react-icons/md";
import { BiUser } from "react-icons/bi";

const Register = () => {
  const { theme } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must have at least 1 uppercase, 1 special character, and be at least 6 characters."
      );
    } else {
      setPasswordError("");
    }

    setError(newPassword === confirmPassword ? "" : "Passwords do not match!");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError(password === e.target.value ? "" : "Passwords do not match!");
  };
  const { createUser } = useContext(Context);
  const handleCreateUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.confirmPassword.value;
    const photoUrl = form.photoUrl.value;
    const user = {
      name,
      email,
      password,
      photoUrl,
    };
    console.log(user);
    createUser(email, password)
    .then((data) => {
      console.log(data)
    })
  };
  return (
    <div className="min-h-screen mt-8 w-full flex items-center justify-center">
      <div className="flex flex-col lg:flex-row p-3 gap-6 items-center justify-center">
        <Lottie animationData={registerAnimation} />
      </div>
      <form
        onSubmit={handleCreateUser}
        action="register"
        className={`${
          theme === "dark" ? "bg-slate-700" : "bg-slate-50"
        } p-8 rounded-2xl shadow-lg`}
      >
        <div className="my-4 flex items-center justify-center gap-3 text-center">
          <FaRegCircleUser className="text-5xl" />
          <p className="font-Heebo font-bold text-3xl">Register</p>
        </div>
        <div className="max-w-3xl flex gap-4 flex-col items-center justify-center">
          {/* Name Field */}
          <div className="flex flex-col justify-center w-72">
            <label className="flex gap-1 items-center" htmlFor="name">
              <BiUser /> Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="p-3 mt-0.5 rounded-2xl border-2 border-slate-400 focus:border-slate-600"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col justify-center w-72">
            <label className="flex gap-1 items-center" htmlFor="email">
              <MdOutlineEmail /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-3 mt-0.5 rounded-2xl border-2 border-slate-400 focus:border-slate-600"
              required
            />
          </div>

          {/* Photo URL Field */}
          <div className="flex flex-col justify-center w-72">
            <label className="flex gap-1 items-center" htmlFor="photo-url">
              <MdOutlineImage /> Photo URL
            </label>
            <input
              type="url"
              id="photo-url"
              name="photoUrl"
              className="p-3 mt-0.5 rounded-2xl border-2 border-slate-400 focus:border-slate-600"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Enter image URL"
            />
          </div>

          {/* Password Field */}
          <div className="relative w-72">
            <label className="flex gap-1 items-center" htmlFor="password">
              <MdOutlineLock /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="p-3 mt-0.5 pr-10 w-full rounded-2xl border-2 border-slate-400 focus:border-slate-600"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="relative w-72">
            <label
              className="flex gap-1 items-center"
              htmlFor="confirm-password"
            >
              <MdOutlineLock /> Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirmPassword"
                className="p-3 mt-0.5 pr-10 w-full rounded-2xl border-2 border-slate-400 focus:border-slate-600"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="btn btn-primary text-white text-xl font-bold rounded-2xl w-40"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
