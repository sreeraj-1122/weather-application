import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./weather.css";
import axios from "axios";
import { DataContext } from "../../context/Datacontext";
import { useSnackbar } from "notistack";
import { baseUrl } from "../../config/baseUrl";

function Saveweather() {
  const { token, userId } = useContext(DataContext);
  const { enqueueSnackbar } = useSnackbar();
  const [weather, setWeather] = useState([]);
  const [data, setData] = useState([]);
  const API_KEY = `1b0a3c742be81f9e7fe61db579a3eec5`;
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/save/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        setData(response.data);
      } else {
        // Handle unexpected response status codes
        enqueueSnackbar("Unexpected error occurred.", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Server error.", { variant: "error" });
    }
  };
  useEffect(() => {
    if (data.length > 0) {
      getWeatherdata();
    }
  }, [data]);

  const getWeatherdata = async () => {
    const weatherData = [];
    // Fetch weather data for each location in data array
    for (const val of data) {
      const finalApi = `https://api.openweathermap.org/data/2.5/weather?lat=${val.latitude}&lon=${val.longitude}&units=Metric&appid=${API_KEY}`;
      try {
        const response = await axios.get(finalApi);
        weatherData.push(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    // Update weather state with the array of weather data
    setWeather(weatherData);
  };
  const handleDelete = async (name) => {
    try {
      const response = await axios.delete(`${baseUrl}/delete/${name}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        const updatedWeather = weather.filter(
          (location) => location.name !== name
        );
        setWeather(updatedWeather);
        enqueueSnackbar("Location removed successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Failed to remove location", { variant: "error" });
      }
    } catch (error) {
      console.error("Error deleting location:", error);
      enqueueSnackbar("Server error.", { variant: "error" });
    }
  };
  
  return (
    <div className="main-section">
      <Navbar />
      <h1 className="text-5xl text-center my-6 font-bold  text-sky-800">
        Saved Items
      </h1>
      {
        data.length>0?(
          <>
          <div className="weather-section">
        {weather.map((location, index) => (
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 save-cards">
            <div className="flex justify-center">
              <img
                className="rounded-t-lg "
                src={`http://openweathermap.org/img/w/${location.weather[0].icon}.png`}
                alt=""
              />
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center dark:text-white">
                {location.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-5xl text-center">
                {location.main.temp} °C
              </p>
              <div className="flex justify-center w-full">
                <button
                  type="button"
                  className="focus:outline-none  text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-basic px-7 py-2.5  mt-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 w-79 "
                  onClick={() => handleDelete(location.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))} 
      </div>
          </>
        ):(<>
          <h1 className="text-center mt-44 text-5xl font-bold text-green-800">No data</h1>
        </>)
      }

      

    </div>
  );
}

export default Saveweather;
