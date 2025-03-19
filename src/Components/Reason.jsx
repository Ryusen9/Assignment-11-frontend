import React, { useContext } from "react";
import Context from "./Context/Context";

const container = [
  {
    id: 1,
    title: "Quick and Easy",
    description:
      "Our team of experienced professionals will help you create a customized runway plan that suits your budget and space requirements.",
  },
  {
    id: 2,
    title: "Customized Solutions",
    description:
      "We offer a wide range of runway planning services, including ride planning, route planning, and design consultation.",
  },
  {
    id: 3,
    title: "Expertise and Confidence",
    description:
      "Our team of experts will provide you with the best possible runway planning solutions, ensuring you achieve your goals.",
  },
  {
    id: 4,
    title: "Affordable and Sustainable",
    description:
      "Run With Us prioritizes sustainability and cost-effectiveness, making it an attractive option for businesses and individuals looking to save money on runway planning services.",
  },
];

const Reason = () => {
  const { theme } = useContext(Context);
  return (
    <div className="flex items-center justify-center mb-10 px-4">
      <div className="p-4 max-w-7xl w-full">
        {/* Header */}
        <div className="flex flex-col text-center gap-2">
          <p className="text-sm uppercase tracking-wide">Welcome</p>
          <p className="text-2xl lg:text-4xl font-bold uppercase">
            Why Run With Us?
          </p>
        </div>

        {/* Grid Layout */}
        <div className="my-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            {container
              .filter((item) => item.id % 2 !== 0)
              .map((content) => (
                <div
                  key={content.id}
                  className={`text-left p-4 rounded-2xl ${
                    theme === "dark" ? "bg-slate-700" : "bg-slate-300"
                  }`}
                >
                  <p className="text-lg font-semibold">{content.title}</p>
                  <p className="text-sm text-gray-400">{content.description}</p>
                </div>
              ))}
          </div>

          {/* Video Center */}
          <div className="max-w-xl mx-auto w-full rounded-full overflow-hidden">
            <video
              src="/Video/4612365-hd_1920_1080_24fps.mp4"
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            ></video>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-6">
            {container
              .filter((item) => item.id % 2 === 0)
              .map((content) => (
                <div key={content.id} className={`text-right lg:text-right p-4 rounded-2xl ${
                    theme === "dark" ? "bg-slate-700" : "bg-slate-300"
                  }`}>
                  <p className="text-lg font-semibold">{content.title}</p>
                  <p className="text-sm text-gray-400">{content.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reason;
