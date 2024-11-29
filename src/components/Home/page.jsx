import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactTypingEffect from "react-typing-effect";
import "../../App.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enteredDate = formData.get("anniversaryDate");

    if (enteredDate) {
      if (enteredDate === "2024-09-29") {
        navigate(`/anniversary/page`);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Invalid Date",
          text: "The date you entered is wrong. Please try again!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No Date Selected",
        text: "Please select a date before submitting.",
      });
    }
  };

  return (
    <div className="flex flex-col h-[100vh] w-full items-center justify-center bg-[#ffcdcd]">
      <div className="flex flex-col gap-6 h-[50%] max-[800px]:h-[30%] w-[60%] justify-center items-center border border-black bg-white sway sketchy">
        <ReactTypingEffect
          text="Enter ours anniversary date"
          speed={50}
          eraseSpeed={20}
          className="font-medium text-4xl max-[800px]:text-sm max-[480px]:text-sm text-wrap w-full max-[800px]:w-[200px] max-[800px]:h-[90px] text-center"
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="date"
            name="anniversaryDate"
            className="px-2 border rounded-md w-[250px] max-[840px]:w-[200px] max-[480px]:w-[150px]"
          />
          <button
            type="submit"
            className="bg-[#e89090] rounded-md py-1 text-white font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
