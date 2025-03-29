import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { LuFileInput } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { Link, useLoaderData } from "react-router-dom";

const MoreMarathon = () => {
  const [events, setEvents] = useState([]);
  const [eventsPerPage, setEventsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("newest");
  const { count } = useLoaderData();

  // Calculate total number of pages
  const numberOfPages = Math.ceil(count / eventsPerPage);
  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < numberOfPages) setCurrentPage(currentPage + 1);
  };

  const handleItemNumberChange = (e) => {
    const value = parseInt(e.target.value);
    setEventsPerPage(value);
    setCurrentPage(1);
  };
  const handleOrderChange = (e) => {
    const value = e.target.value;
    setOrder(value);
  };
  useEffect(() => {
    axios
      .get(
        `https://assignment-11-backend-three.vercel.app/marathonEvents?page=${currentPage}&size=${eventsPerPage}&sortOrder=${order}`
      )
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage, eventsPerPage, order]);

  return (
    <div className="min-h-screen w-full mt-24">
      <div className="max-w-7xl mx-auto overflow-hidden">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-bold">READY?</p>
          <p className="text-4xl font-bold font-Heebo uppercase">
            Let's get started with your next marathon!
          </p>
        </div>

        {/* Add a marathon event */}
        <div className="bg-emerald-300/50 border flex items-center justify-between p-4 rounded-2xl mt-4">
          <p className="text-xl font-semibold">Are you an organizer?</p>
          <Link to={"/addMarathonEvent"}>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-semibold transition-all">
              Add a Marathon Event
            </button>
          </Link>
        </div>
        <p className="my-3 text-center">Otherwise... Let's run along</p>

        {/* Marathon Events List */}
        <div className="flex justify-end items-center">
          <select
            onChange={handleOrderChange}
            defaultValue="newest"
            className="select"
          >
            <option value={"newest"}>Newest</option>
            <option value={"oldest"}>Oldest</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 p-6">
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
                    {event.startRegistrationDate} - {event.endRegistrationDate}
                  </span>
                </p>

                <Link to={`/event/${event._id}`}>
                  <button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-semibold transition-all">
                    Show More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col justify-center items-center">
          <p>Current Page: {currentPage}</p>
          <div className="flex items-center justify-center gap-2.5 my-6">
            <button
              onClick={handlePrevious}
              className="btn btn-primary btn-outline text-xl"
              disabled={currentPage === 1}
            >
              <GrFormPrevious />
            </button>
            <div className="join">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`join-item btn ${
                    currentPage === page ? "btn-active" : ""
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="btn btn-primary btn-outline text-xl"
              disabled={currentPage === numberOfPages}
            >
              <GrFormNext />
            </button>
            <select
              className="select ml-3"
              onChange={handleItemNumberChange}
              value={eventsPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreMarathon;
