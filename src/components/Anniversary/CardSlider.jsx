import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const CardSlider = () => {
  const cards = [
    { id: 1, video: "/anniversary/videos/dreamworld.mp4", title: "Dreamworld" },
    { id: 2, video: "/anniversary/videos/dreamworld.mp4", title: "Adventure" },
    { id: 3, video: "/anniversary/videos/dreamworld.mp4", title: "Nature" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] py-8 overflow-x-hidden">
      <div className="relative w-[550px] h-[300px]">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          >
            <video
              width="550"
              height="300"
              autoPlay
              muted
              loop
              preload="auto"
              className="rounded-lg"
            >
              <source src={card.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-center mt-2 text-lg font-bold">{card.title}</p>
          </div>
        ))}

        {/* Left Arrow */}
        <div
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-blue-500 transition duration-200"
        >
          <FontAwesomeIcon icon={faChevronLeft} size="2x" />
        </div>

        {/* Right Arrow */}
        <div
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-blue-500 transition duration-200"
        >
          <FontAwesomeIcon icon={faChevronRight} size="2x" />
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
