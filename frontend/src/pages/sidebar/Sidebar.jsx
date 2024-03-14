import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import cloud from "../../assets/cloud.png";
import clear from "../../assets/clear.png";
import dizzle from "../../assets/drizzle.png";
import rain from "../../assets/rain.png";
import snow from "../../assets/snow.png";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import { baseUrl } from "../../config/baseUrl";
import { useSnackbar } from "notistack";
import { DataContext } from "../../context/Datacontext";
function Sidebar({ data }) {
  const [wicon, setWicon] = useState(null);
  const [isLocationSaved, setIsLocationSaved] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { token, isLoggedIn } = useContext(DataContext);
  const handleNotLoggedInClick = (e) => {
    e.preventDefault();
    enqueueSnackbar("Please log in to access this feature.", {
      variant: "warning",
    });
  };
  useEffect(() => {
    if (data) {
      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          setWicon(clear);
          break;
        case "02d":
        case "02n":
          setWicon(cloud);
          break;
        case "03d":
        case "03n":
          setWicon(dizzle);
          break;
        case "04d":
        case "04n":
          setWicon(cloud); // Use the same icon for both day and night broken clouds
          break;
        case "09d":
        case "09n":
          setWicon(rain);
          break;
        case "10d":
        case "10n":
          setWicon(rain); // Use the same icon for both day and night rain
          break;
        case "13d":
        case "13n":
          setWicon(snow);
          break;
        default:
          setWicon(cloud);
      }
    }
    setIsLocationSaved(false);
  }, [data]);

  const getCurrentDayAndTime = () => {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[now.getDay()];
    let hours = now.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${hours}:${minutes} ${ampm}`;

    return { day, currentTime };
  };
  const { day, currentTime } = getCurrentDayAndTime();
  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/save`,
        {
          location: data.name,
          latitude: data.coord.lat,
          longitude: data.coord.lon,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 201) {
        console.log("Saved successful:", response.data);
        enqueueSnackbar("Location saved successfully", { variant: "success" });
        setIsLocationSaved(true);
      } else {
        // Handle unexpected response status codes
        enqueueSnackbar("Unexpected error occurred.", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Server error.", { variant: "error" });
    }
  };

  return (
    <div className="sidebar-section">
      {data ? (
        <>
          <div className="weather-img">
            <img src={wicon} alt="" />
          </div>
          <div className="weather-degree">
            <div className="value">{Math.floor(data.main.temp)}°C</div>
            <div className="date">
              {day}, {currentTime}{" "}
            </div>
          </div>
          <div className="location">
            <span>
              <FaLocationDot />
            </span>
            <h3>{data.name}</h3>
          </div>
          <div className="logout-btn flex justify-center">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className={`focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-2 focus:ring-purple-300 font-medium rounded-lg text-basic px-5 py-2.5 me-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-700 w-60 mt-28 ${
                    isLocationSaved ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={handleSave}
                  disabled={isLocationSaved} // Disable the button if location is already saved
                >
                  save location
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={`focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-2 focus:ring-purple-300 font-medium rounded-lg text-basic px-5 py-2.5 me-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-700 w-60 mt-28 ${
                    isLocationSaved ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={handleNotLoggedInClick}
                >
                  save location
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="m-auto">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
