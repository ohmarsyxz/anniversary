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
        navigate(`/anniversary/page?date=${enteredDate}`);
        console.log("Saved Date:", enteredDate);
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
    <div className="flex flex-col h-[100vh] w-full items-center">
      <div>
        <h1 className="font-bold text-5xl p-4 bg-[#e89090] w-[100vw] text-white">
          Welcome to anniversary website
        </h1>
      </div>

      <div className="flex flex-col gap-6 h-full justify-center items-center">

        <ReactTypingEffect
          text="Enter ours anniversary date"
          speed={50}
          eraseSpeed={20}
          className="font-medium text-4xl"
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="date"
            name="anniversaryDate"
            className="px-2 border rounded-md w-[250px]"
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
