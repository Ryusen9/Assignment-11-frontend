import React, { useContext, useState } from "react";
import Context from "./Context/Context";
import { BiLocationPlus } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";

const AddMarathon = () => {
  const { theme } = useContext(Context);
  const [totalRunningDistance, setTotalRunningDistance] = useState("25k");
  const handleRunningDistance = (e) => {
    setTotalRunningDistance(e.target.value);
  };
  const handleMarathonFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const marathonTitle = form.title.value;
    const location = form.location.value;
    const marathonStartDate = form.eventStartDate.value;
    const startRegistrationDate = form.regStartDate.value;
    const endRegistrationDate = form.regEndDate.value;
    const runningDistance = totalRunningDistance;
    const description = form.description.value;
    const marathonImage = form.marathonImage.value;
    const createdAt = new Date().toLocaleDateString("en-CA");
    const totalRegistrationCount = 0;
    const marathonData = {
      marathonTitle,
      location,
      marathonStartDate,
      startRegistrationDate,
      endRegistrationDate,
      runningDistance,
      description,
      marathonImage,
      createdAt,
      totalRegistrationCount,
    };
    console.log(marathonData);
    axios
      .post("http://localhost:5000/marathonEvents", marathonData)
      .then(() => {
        Swal.fire(
          "Marathon Created",
          "Your marathon has been created successfully!",
          "success"
        );
      });
  };
  return (
    <div className="min-h-screen w-full mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-bold">CREATE</p>
          <p className="text-4xl font-bold font-Heebo uppercase">
            Your next marathon!
          </p>
        </div>
        {/* Form */}
        <form
          onSubmit={handleMarathonFormSubmit}
          action="marathon-creation"
          className={`p-4 my-4 flex items-center justify-center flex-col ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-400"
          } rounded-2xl`}
        >
          <div>
            <p className="text-center text-wrap font-Heebo font-semibold text-lg mb-8">
              Fill this to enter your event!
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col justify-center w-full col-span-3 md:col-span-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="input w-full"
                required
              />
            </div>
            <div className="md:col-start-3 text-xs md:text-base flex flex-col justify-center w-full">
              <label htmlFor="eventStart">Event Start Date</label>
              <input type="date" name="eventStartDate" className="input" />
            </div>
            <div className="flex flex-col text-xs md:text-base justify-center w-full">
              <label htmlFor="registration-start">
                Registration Start Date
              </label>
              <input type="date" name="regStartDate" className="input" />
            </div>
            <div className="flex md:col-start-3 text-xs md:text-base flex-col justify-center w-full">
              <label htmlFor="registration-start">Registration End Date</label>
              <input type="date" name="regEndDate" className="input" />
            </div>
            <div className="flex col-span-3 md:col-span-2 flex-col justify-center w-full">
              <label htmlFor="location" className="flex gap-1 items-center">
                <BiLocationPlus /> Location:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="input w-full"
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Running Distance</legend>
                <select
                  onChange={handleRunningDistance}
                  defaultValue="Pick a browser"
                  className="select"
                >
                  <option value={"25k"}>25k</option>
                  <option value={"10k"}>10k</option>
                  <option value={"3k"}>3k</option>
                </select>
              </fieldset>
            </div>
            <div className="flex flex-col md:col-span-3 col-span-2 justify-center w-full">
              <label htmlFor="marathon-image">Marathon Image:</label>
              <input
                type="text"
                placeholder="Enter URL"
                id="marathon-image"
                name="marathonImage"
                className="input w-full"
              />
            </div>
            <div className="flex col-span-3 flex-col justify-center w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Description</legend>
                <textarea
                  id="description"
                  name="description"
                  className="textarea h-24 w-full"
                  placeholder="Event information"
                ></textarea>
                <div className="fieldset-label">
                  Enter necessary details regarding the event
                </div>
              </fieldset>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button type="submit" className="btn">
              Create Marathon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMarathon;
