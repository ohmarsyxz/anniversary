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
import CountUp from "../common/CountUp";
import SplitText from "../common/SplitText";
import FadeContent from "../common/FadeContent";
import AnimatedContent from "../common/AnimatedContent";

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

    let yearDiff = target.getFullYear() - input.getFullYear();
    let monthDiff = target.getMonth() - input.getMonth();
    let totalMonths = yearDiff * 12 + monthDiff;

    const dayDifference = target.getDate() - input.getDate();

    if (dayDifference < 0) {
      totalMonths -= 1;
    }

    if (totalMonths > 0) {
      return totalMonths - 1;
    } else if (totalMonths < 0) {
      return Math.abs(totalMonths + 1);
    } else {
      return 0;
    }
  };

  const calculateDaysDifference = (inputDate) => {
    if (!inputDate) return null;

    const input = new Date(inputDate);
    const target = new Date("2024-09-29T00:00:00.000Z");

    let dayDiff = input.getDate() - target.getDate();

    if (dayDiff < 0) {
      const daysInPrevMonth = new Date(
        target.getFullYear(),
        target.getMonth(),
        0
      ).getDate();
      return daysInPrevMonth + dayDiff;
    }

    return dayDiff;
  };

  const monthDifference = calculateMonthsDifference(new Date().toISOString());
  const dayInMonthDiff = calculateDaysDifference(new Date().toISOString());

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
            <SplitText
              text="Happy"
              className="text-[8rem] font-medium text-center py-4 pacifico-font text-[#ff8484]"
              delay={150}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
            />
            <p className="text-4xl font-semibold max-[600px]:text-3xl max-[450px]:text-lg">
              Anniversary{" "}
              <span className="text-6xl max-[600px]:text-5xl max-[450px]:text-2xl">
                {
                  <CountUp
                    from={0}
                    to={monthDifference}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                }
              </span>{" "}
              months
              <span className="text-6xl max-[600px]:text-5xl max-[450px]:text-2xl">
                {" "}
                {
                  <CountUp
                    from={0}
                    to={dayInMonthDiff}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                }
              </span>{" "}
              days
            </p>
            <p className="text-xl max-[450px]:text-sm">
              {
                <CountUp
                  from={0}
                  to={timeDifference.days}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              }{" "}
              days,{" "}
              {
                <CountUp
                  from={0}
                  to={timeDifference.hours}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              }{" "}
              hours,{" "}
              {
                <CountUp
                  from={0}
                  to={timeDifference.minutes}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              }{" "}
              minutes,{" "}
              {
                <CountUp
                  from={0}
                  to={timeDifference.seconds}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              }{" "}
              seconds
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

      <AnimatedContent>
        <FadeContent duration={600} blur={true}>
          <div className="flex h-[100vh] max-[800px]:h-[50vh] w-[100%] flex-col justify-center items-center">
            <div className="w-full h-full rounded-lg postcard flex flex-col items-center py-[12rem] max-[800px]:py-[7.5rem]">
              <ReactTypingEffect
                text="สวัสดี นี่เราเอง เราชื่อโอมนะ 😎 นี่คุณคือขวัญสินะ 👸🏼 วันนี้ครบรอบกี่เดือนแล้วน้าาา 5 เดือนแล้ววนี่ เย่🥳🎉 ไวมากเลย จะครึ่งปีละ มีทุกข์มีสุขปนกันไป ก็ขอบคุณที่อยู่ด้วยกันมาเรื่อยๆจนถึงเดือนที่ 5 นะครับ ถึงแม้จะมีบางครั้งที่เราไม่เข้าใจกันบ้างทะเลาะกันบ้าง แต่โอมก็ยังรักขวัญเสมอนะ 😍 รักมากขึ้นทุกๆวันเลย ผ่านเรื่องทุกข์ไปด้วยกัน และมีความสุขด้วยกันตลอดทุกช่วงเวลาเลยน้า อยู่ด้วยกันไปนานๆเลยนะคะ 10 ปี 100 ปี 1000 ปี ไปเล้ยยยย มุมุค้าบ 💕 ily so much น้าา"
                speed={50}
                eraseSpeed={20}
                className="text-xl w-[400px] max-[480px]:text-sm text-wrap max-[800px]:w-[300px] max-[800px]:h-[90px] text-center"
              />
            </div>
          </div>
        </FadeContent>
      </AnimatedContent>

      <div className="flex flex-col justify-center items-center h-[100vh] py-8 clips">
        <AnimatedContent>
          <FadeContent duration={600} blur={true}>
            {/* <p className="pb-6">&lt; &lt; Drag &gt; &gt;</p> */}
            {/* <CardSlider /> */}
            {/* <RollingGallery pauseOnHover={true}/> */}
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={false}
              cardDimensions={{ width: 500, height: 500 }}
            />
          </FadeContent>
        </AnimatedContent>
      </div>
    </div>
  );
};

export default AnniversaryPage;
