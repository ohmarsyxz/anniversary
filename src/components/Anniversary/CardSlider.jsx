import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const CardSlider = () => {
  const cards = [
    { id: 1, video: "/anniversary/videos/pattaya.mp4", title: "Pattaya" },
    { id: 2, video: "/anniversary/videos/dreamworld.mp4", title: "Dreamworld" },
    {
      id: 3,
      video: "/anniversary/videos/1annClip.mp4",
      title: "1 Anniversary",
    },
    {
      id: 4,
      image: "/anniversary/images/1ann.png",
      title: "1 Anniversary card",
    },
    {
      id: 5,
      image: "/anniversary/images/2ann_card.png",
      title: "2 Anniversary card",
    },
    {
      id: 6,
      video: "/anniversary/videos/2annClip.mp4",
      title: "2 Anniversary",
    },
    {
      id: 7,
      video: "/anniversary/videos/2ann_long.mp4",
      title: "2 Anniversary Cutie",
    },
    {
      id: 8,
      video: "/anniversary/videos/3annClip.mp4",
      title: "3 Anniversary",
    },
    {
      id: 9,
      video: "/anniversary/videos/3ann-kwan.mp4",
      title: "3 Anniversary By Kwan",
    },
    {
      id: 10,
      video: "/anniversary/videos/4annClip.mp4",
      title: "4 Anniversary By Ohm",
    },

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
    <div className="flex flex-col justify-center items-center h-[100vh] py-8 overflow-x-hidden fade-in">
      <div className="relative w-[600px] max-[800px]:w-[450px] max-[600px]:w-[350px] h-[350px] overflow-hidden">
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
            <p className="text-center mt-2 text-lg font-bold text-black">
              {card.title}
            </p>
            {card.video ? (
              <video
                autoPlay
                muted
                loop
                preload="auto"
                className="w-full h-full object-contain rounded-lg"
              >
                <source src={card.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={card.image}
                alt={card.title}
                className="rounded-lg w-full h-full object-contain"
              />
            )}
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
