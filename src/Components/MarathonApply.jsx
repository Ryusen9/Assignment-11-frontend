import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Context from "./Context/Context";
import axios from "axios";
import Swal from "sweetalert2";
import gsap from "gsap";

const MarathonApply = () => {
  const { user } = useContext(Context);
  const { state } = useLocation();
  const navigate = useNavigate();
  const event = state?.event;

  const [age, setAge] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const formRef = useRef();

  useEffect(() => {
    gsap.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const applicationData = {
      applicantName: user.displayName,
      applicantEmail: user.email,
      age,
      emergencyContact,
      appliedAt: new Date(),
      marathonId: event._id,
      marathonTitle: event.marathonTitle,
      marathonStartDate: event.marathonStartDate,
      location: event.location,
    };

    axios
      .post(`http://localhost:5000/userApplications`, applicationData)
      .then(() => {
        Swal.fire(
          "Application Successful",
          `You have applied for ${event.marathonTitle}`,
          "success"
        );
        navigate("/");
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };

  if (!user || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-24">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center mt-24">
      <div
        ref={formRef}
        className="shadow-2xl rounded-2xl p-10 w-full max-w-lg bg-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-600">
          Apply for {event.marathonTitle}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="text"
            value={event.location}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Your Age"
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            placeholder="Emergency Contact"
            required
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold tracking-wide transition-all"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarathonApply;
