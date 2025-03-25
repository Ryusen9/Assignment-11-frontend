import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { LuFileInput } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const MarathonEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/marathonEvents?limit=${6}`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load events. Please try again later.");
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div>
          <p className="text-center font-Heebo text-sm font-bold my-4">
            EXPLORE
          </p>
          <p className="uppercase text-center font-semibold font-Heebo text-4xl mb-4">
            ongoing marathon events
          </p>
        </div>
        {/* Event List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 p-3.5">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white cursor-pointer shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105 w-full sm:w-96"
            >
              <div className="relative">
                <img
                  src={event.marathonImage || "/placeholder-image.jpg"}
                  alt={event.marathonTitle || "Marathon Event"}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h2 className="text-white font-bold text-lg sm:text-xl px-4 text-center">
                    {event.marathonTitle}
                  </h2>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <BiLocationPlus className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold">{event.location}</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <SlCalender className="w-4 h-4 text-gray-500" />
                    Marathon Start:{" "}
                    <span className="font-semibold">
                      {event.marathonStartDate}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <LuFileInput className="w-4 h-4 text-gray-500" />
                    Registration:{" "}
                    <span className="font-semibold">
                      {event.startRegistrationDate} -{" "}
                      {event.endRegistrationDate}
                    </span>
                  </p>
                </div>

                <button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-semibold transition-all">
                  Show More
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* See details page */}
        <div className="flex mt-7 items-center justify-center">
          <Link to={"/moreEvents"}>
            <button className="btn btn-outline btn-primary">See Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarathonEvents;
