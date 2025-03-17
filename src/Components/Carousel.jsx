import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";
import { IoArrowDown } from "react-icons/io5";

const slides = [
  {
    id: 1,
    image: "/Images/Hero1.jpg",
    title: "Run to chase Dreams",
    description: "Join our annual marathon event and make a difference!",
  },
  {
    id: 2,
    image: "/Images/Hero2.jpg",
    title: "Embrace the Moment",
    description: "Discover new experiences and create memorable moments.",
  },
  {
    id: 3,
    image: "/Images/Hero3.jpg",
    title: "Live your Life to the fullest",
    description: "Stay connected with the world and make a difference.",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const slideRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      slideRef.current,
      { autoAlpha: 0, scale: 1.1 },
      { autoAlpha: 1, scale: 1, duration: 2, ease: "power3.out" }
    )
      .to(slideRef.current, { scale: 1.05, duration: 4, ease: "linear" }, "-=1")
  }, [currentIndex]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* slider container */}
      <div
        ref={slideRef}
        style={{
          backgroundImage: `url(${slides[currentIndex].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900"
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 w-full h-full bg-black opacity-50" />
        {/* Slide content */}
        <div
          className="relative text-center text-white px-6 lg:px-16"
        >
          <h1 className="text-4xl font-Heebo font-bold text-white">
            {slides[currentIndex].title}
          </h1>
          <p className="text-lg font-light text-white">
            {slides[currentIndex].description}
          </p>
          {/* Button */}
          <button className="text-center flex flex-col mx-auto mt-[20%] border-1 border-white rounded-[100%] px-6 py-10 hover:border-emerald-300 hover:text-emerald-400 duration-300 cursor-pointer items-center justify-center">
            Learn More <br /> <IoArrowDown />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
