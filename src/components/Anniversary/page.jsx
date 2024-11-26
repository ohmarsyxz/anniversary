import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AnniversaryPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get("date");

  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-4">
      <p>Hello {date}</p>
      <Link
        to="/anniversary"
        className="flex justify-center items-center gap-2 w-[100px] py-1 bg-white"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </Link>
    </div>
  );
};

export default AnniversaryPage;
