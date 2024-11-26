import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import CardSlider from "./CardSlider";

const AnniversaryPage = () => {
  const [timeDifference, setTimeDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeDifference = () => {
    const targetDate = new Date("2024-09-29T00:00:00.000Z");
  
    const currentDate = new Date();
    currentDate.setUTCHours(currentDate.getUTCHours() + 7);
  
    const diffInMs = currentDate - targetDate;
  
    if (diffInMs <= 0) {
      setTimeDifference({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
  
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
  
    setTimeDifference({ days, hours, minutes, seconds });
  };
  

  const calculateDaysDifference = (inputDate) => {
    if (!inputDate) return null;

    const input = new Date(inputDate);
    const target = new Date("2024-09-29T00:00:00.000Z");

    const yearDifference = target.getFullYear() - input.getFullYear();
    const monthDifference =
      target.getMonth() - input.getMonth() + yearDifference * 12;

    const totalMonths = yearDifference * 12 + monthDifference;

    const dayDifference = target.getDate() - input.getDate();

    const daysInInputMonth = new Date(
      input.getFullYear(),
      input.getMonth() + 1,
      0
    ).getDate();

    const decimalMonths = -(totalMonths + dayDifference / daysInInputMonth);

    return decimalMonths.toFixed(2);
  };

  const monthDifference = calculateDaysDifference(new Date());

  useEffect(() => {
    calculateTimeDifference();
    const intervalId = setInterval(calculateTimeDifference, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-between items-center h-[100vh] py-8">
        <div></div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-4xl font-semibold">
              Anniversary <span className="text-6xl">{monthDifference}</span>{" "}
              months
            </p>
            <p className="text-xl">
              {timeDifference.days} days, {timeDifference.hours} hours,{" "}
              {timeDifference.minutes} minutes, {timeDifference.seconds} seconds
            </p>
          </div>

          <Link
            to="/anniversary"
            className="flex justify-center items-center gap-2 w-[100px] py-1 bg-white rounded-lg border"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </Link>
        </div>
        <div className="flex flex-col items-center text-[#9f9f9f] gap-2">
          <p>scroll down</p>
          <FontAwesomeIcon icon={faAngleDoubleDown} className="bounce" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-[100vh] py-8 mail">
        <CardSlider />
      </div>
    </div>
  );
};

export default AnniversaryPage;
