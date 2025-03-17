import React from "react";
import errorAnimation from "../../public/Lottie/Error animation.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="w-[30%]">
        <Lottie animationData={errorAnimation}></Lottie>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-Heebo text-center"><span className="text-emerald-400">Oops!</span> Something went wrong.</h1>
        <p className="text-center">Please try again later.</p>
        <Link to={"/"}>
          <p className="text-center hover:underline text-emerald-500 hover:text-emerald-600">
            Back to Home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
