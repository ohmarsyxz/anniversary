import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTypingEffect from "react-typing-effect";
import {
  faAngleDoubleDown,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import CardSlider from "./CardSlider";
import RollingGallery from "../common/RollingGallery";
import Stack from "../common/Stack";

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
    const hours = Math.floor(
      (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    setTimeDifference({ days, hours, minutes, seconds });
  };

  const calculateMonthsDifference = (inputDate) => {
    if (!inputDate) return null;

    const input = new Date(inputDate);
    const target = new Date("2024-09-29T00:00:00.000Z");

    let totalMonths =
      (target.getFullYear() - input.getFullYear()) * 12 +
      (target.getMonth() - input.getMonth());

    const dayDifference = target.getDate() - input.getDate();

    if (dayDifference < 0) {
      totalMonths -= 1;
    }

    const daysInInputMonth = new Date(
      input.getFullYear(),
      input.getMonth() + 1,
      0
    ).getDate();

    const decimalMonths = -(totalMonths + dayDifference / daysInInputMonth) - 1;

    return decimalMonths.toFixed(2);
  };

  const monthDifference = calculateMonthsDifference(new Date().toISOString());

  useEffect(() => {
    calculateTimeDifference();
    const intervalId = setInterval(calculateTimeDifference, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-between items-center h-[100vh] py-8 bg-[#f9f9f9]">
        <div></div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-4xl font-semibold max-[600px]:text-3xl max-[450px]:text-lg">
              Anniversary{" "}
              <span className="text-6xl max-[600px]:text-5xl max-[450px]:text-2xl">
                {monthDifference}
              </span>{" "}
              months
            </p>
            <p className="text-xl max-[450px]:text-sm">
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

      <div className="flex h-[100vh] max-[800px]:h-[50vh] w-[100%] flex-col justify-center items-center">
        <div className="w-full h-full rounded-lg postcard scale-up flex flex-col items-center py-[12rem] max-[800px]:py-[7.5rem]">
          <ReactTypingEffect
            text="สวัสดี นี่เราเอง เราชื่อโอมนะ 😎 นี่คุณคือขวัญสินะ 👸🏼 วันนี้ครบรอบกี่เดือนแล้วน้าาา 4เดือนแล้วว เย่🥳🎉 หลังจากเดือนที่ผ่านๆมา ก็มีทั้งสุขและไม่สุข เป็นปกติของชีวิตอ่ะเน้าะ โอมก็อยากให้ขวัญกับโอมอยู่ด้วยกันนานๆเลยน้าา คุยกันได้ทุกรื่องเหมือนเดิมเลย อิอิ😜 มีความสุขด้วยกันเยอะๆเลยน้าา😝 ไว้ไปเที่ยวด้วยกัน เชียงใหม่ๆ จองตัวไว้ละ และเดี๋ยวก็จะได้มาขอนแก่นละนี่ เย่ะๆ👏🏻 จะได้เจอละ คริๆ อีกไม่กี่เดือนๆ หุหุ🤭 และสุดท้ายรักไอ้หมามากๆนะคะ จุ๊บๆ😘 iloveu 3000💕"
            speed={50}
            eraseSpeed={20}
            className="text-xl w-[400px] max-[480px]:text-sm text-wrap max-[800px]:w-[300px] max-[800px]:h-[90px] text-center"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center h-[100vh] py-8 clips">
        {/* <p className="pb-6">&lt; &lt; Drag &gt; &gt;</p> */}
        {/* <CardSlider /> */}
        {/* <RollingGallery pauseOnHover={true}/> */}
        <Stack
          randomRotation={true}
          sensitivity={180}
          sendToBackOnClick={false}
          cardDimensions={{ width: 500, height: 500 }}
        />
      </div>
    </div>
  );
};

export default AnniversaryPage;
