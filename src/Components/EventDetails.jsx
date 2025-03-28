import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Context from "./Context/Context";
import { BiCalendar, BiMap, BiRun } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const EventDetails = () => {
  const event = useLoaderData();
  const { theme } = useContext(Context);

  const marathonStartDate = new Date(event.marathonStartDate);

  const calculateTimeLeft = () => {
    const now = new Date();
    const timeDiff = marathonStartDate - now;
    return timeDiff > 0 ? timeDiff : 0;
  };

  return (
    <div className="mt-24 min-h-screen w-full">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
        <div
          className={`max-w-4xl w-full shadow-lg rounded-2xl overflow-hidden ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <img
            src={event.marathonImage}
            alt={event.marathonTitle}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 space-y-4">
            <h2 className="text-3xl font-bold text-center">
              {event.marathonTitle}
            </h2>
            <p className="text-lg text-gray-500 text-center italic">
              {event.description}
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center items-center mt-6">
              <div className="relative">
                <CountdownCircleTimer
                  isPlaying
                  duration={calculateTimeLeft() / 1000}
                  colors="#f7b731"
                  trailColor="#d6d6d6"
                  strokeWidth={12}
                  size={180}
                >
                  {({ remainingTime }) => {
                    const days = Math.floor(remainingTime / 86400);
                    const hours = Math.floor((remainingTime % 86400) / 3600);
                    const minutes = Math.floor((remainingTime % 3600) / 60);
                    const seconds = remainingTime % 60;

                    return (
                      <div className="text-center text-base font-semibold">
                        <div className="text-emerald-500">
                          {`${days}day ${hours}h ${minutes}m ${seconds}s`}
                        </div>
                        <div className="text-gray-500 mt-2">Until Marathon</div>
                      </div>
                    );
                  }}
                </CountdownCircleTimer>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
              <p className="flex items-center gap-2">
                <BiMap className="text-emerald-500" />{" "}
                <span className="font-semibold">{event.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <BiCalendar className="text-blue-500" /> Marathon Start:{" "}
                <span className="font-semibold">{event.marathonStartDate}</span>
              </p>
              <p className="flex items-center gap-2">
                <BiCalendar className="text-yellow-500" /> Registration:{" "}
                <span className="font-semibold">
                  {event.startRegistrationDate} - {event.endRegistrationDate}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <BiRun className="text-red-500" /> Distance:{" "}
                <span className="font-semibold">{event.runningDistance}</span>
              </p>
            </div>

            <p className="flex items-center gap-2 text-lg">
              <MdOutlineDescription className="text-indigo-500" />{" "}
              {event.description}
            </p>
            <p className="flex items-center gap-2 text-lg">
              <IoCheckmarkDone className="text-green-500" /> Registered:{" "}
              {event.totalRegistrationCount}
            </p>
            <Link state={{ event }} to={"/marathonApply"}>
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition-all">
                Register Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
