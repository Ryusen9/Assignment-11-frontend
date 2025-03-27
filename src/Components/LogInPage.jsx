import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import LogInAnimation from "../../public/Lottie/Login.json";
import Context from "./Context/Context";
import { BiUser } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { GrGithub, GrGoogle } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LogInPage = () => {
  const { theme, loginUser, logInWithGoogle, logInWithGithub } =
    useContext(Context);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then((res) => {
        if (res.user) {
          Swal.fire(
            "Logged in successfully!",
            "You are now logged in!",
            "success"
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Invalid email or password!",
          });
        }
        form.reset();
      })
      .then(() => navigate("/"));
  };
  const handleGoogleLogin = () => {
    logInWithGoogle().then((res) => {
      if (res.user) {
        Swal.fire(
          "Logged in successfully!",
          "You are now logged in with Google!",
          "success"
        ).then(() => navigate("/"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while logging in with Google.",
        });
      }
    });
  };
  const handleGithubLogin = () => {
    logInWithGithub().then((res) => {
      if (res.user) {
        Swal.fire(
          "Logged in successfully!",
          "You are now logged in with GitHub!",
          "success"
        ).then(() => navigate("/"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while logging in with GitHub.",
        });
      }
    });
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {/* Form Content */}
      <div className="flex flex-col lg:flex-row p-3 gap-6 items-center justify-center">
        <div>
          <Lottie animationData={LogInAnimation}></Lottie>
        </div>
        <form
          onSubmit={handleLogin}
          action="handleLogin"
          className={`${
            theme === "dark" ? "bg-slate-700" : "bg-slate-50"
          } p-8 rounded-2xl shadow-lg`}
        >
          <div className="my-4 flex items-center justify-center gap-3 text-center">
            <BiUser className="text-5xl" />
            <p className="font-Heebo font-bold text-3xl">Log In</p>
          </div>
          <div className="max-w-3xl flex gap-4 flex-col items-center justify-center">
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
            <div className="relative">
              <div className="flex flex-col justify-center w-72">
                <label className="flex gap-1 items-center" htmlFor="password">
                  <MdOutlineLock /> Password
                </label>
                <input
                  type={showPassword ? "password" : "text"}
                  id="password"
                  name="password"
                  className="p-3 mt-0.5 rounded-2xl border-2 border-slate-400 focus:border-slate-600"
                  required
                />
              </div>
              <div
                onClick={handleShowPassword}
                className="absolute right-6 top-1/2 translate-1.5"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`${
                theme === "dark"
                  ? "text-white bg-emerald-500 hover:bg-emerald-700"
                  : "text-emerald-500 bg-white hover:text-emerald-700"
              } w-full py-3 my-3 rounded-2xl font-semibold`}
            >
              Log In
            </button>
          </div>
          <div className="divider"></div>
          {/* Social login */}
          <div>
            <p className="text-xs">You can also login with</p>
            <div className="text-center flex gap-3.5 items-center justify-center my-2">
              <button
                onClick={handleGoogleLogin}
                className="btn btn-circle btn-outline btn-primary text-2xl"
              >
                <GrGoogle />
              </button>
              <button
                onClick={handleGithubLogin}
                className="btn btn-circle btn-outline btn-primary text-2xl"
              >
                <GrGithub />
              </button>
            </div>
          </div>
          <p>
            Don't have an account?{" "}
            <Link to={"/register"}>
              <span className="text-emerald-500 cursor-pointer hover:underline font-semibold">
                Register
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
