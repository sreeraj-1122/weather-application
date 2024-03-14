import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import cloud from "../../assets/cloud.png";
import clear from "../../assets/clear.png";
import dizzle from "../../assets/drizzle.png";
import rain from "../../assets/rain.png";
import snow from "../../assets/snow.png";
import { IoNotifications } from "react-icons/io5";

function Home({ data }) {
  const API_KEY = `1b0a3c742be81f9e7fe61db579a3eec5`;
  const [weather, setWeather] = useState(null);
  const [pollution, setPollution] = useState(null);
  const [wicon, setWicon] = useState(null);

  useEffect(() => {
    if (data) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=Metric&appid=${API_KEY}`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error("Error fetching air quality data:", error);
        });
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&units=Metric&appid=${API_KEY}`
        )
        .then((res) => {
          console.log(res.data);
          setPollution(res.data);
        });
    }
  }, [data, API_KEY]);

  const updateHumidityStatus = (humidity) => {
    if (humidity <= 30) {
      return "Low";
    } else if (humidity <= 60) {
      return "Moderate";
    } else {
      return "High";
    }
  };
  const updateVisibiltyStatus = (visibility) => {
    if (visibility <= 0.03) {
      return "Dense Fog";
    } else if (visibility <= 0.16) {
      return "Moderate Fog";
    } else if (visibility <= 0.35) {
      return "Light Fog";
    } else if (visibility <= 1.13) {
      return "Very Light Fog";
    } else if (visibility <= 2.16) {
      return "Light Mist";
    } else if (visibility <= 5.4) {
      return "Very Light Mist";
    } else if (visibility <= 10.8) {
      return "Clear Air";
    } else {
      return "Very Clear Air";
    }
  };
  const updateAirQualityStatus = (airquality) => {
    if (airquality <= 50) {
      return "Good👌";
    } else if (airquality <= 100) {
      return "Moderate😐";
    } else if (airquality <= 150) {
      return "Unhealthy for Sensitive Groups😷";
    } else if (airquality <= 200) {
      return "Unhealthy😷";
    } else if (airquality <= 250) {
      return "Very Unhealthy😨";
    } else {
      return "Hazardous😱";
    }
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Format time as hh:mm
  };
  const formatWindStatus = (windSpeed) => {
    if (windSpeed < 1) {
      return "Calm"; // If wind speed is less than 1 m/s
    } else if (windSpeed < 4) {
      return "Light Breeze"; // If wind speed is between 1 and 4 m/s
    } else if (windSpeed < 8) {
      return "Moderate Breeze"; // If wind speed is between 4 and 8 m/s
    } else if (windSpeed < 14) {
      return "Strong Breeze"; // If wind speed is between 8 and 14 m/s
    } else {
      return "High Wind"; // If wind speed is greater than or equal to 14 m/s
    }
  };
  if (!weather) {
    return (
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
    );
  }
  // Filter weather data to include only the next 7 days
  const next7DaysWeather = weather.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();

    // Check if the accumulator array already contains 7 unique days of the week
    if (
      acc.length < 7 &&
      !acc.find(
        (entry) =>
          entry.dayOfWeek === dayOfWeek && entry.dayOfMonth === dayOfMonth
      )
    ) {
      acc.push({
        dayOfWeek: dayOfWeek,
        dayOfMonth: dayOfMonth,
        dayName: date.toLocaleDateString("en-US", {
          weekday: "long",
        }),
        weatherDetails: item,
      });
    }
    return acc;
  }, []);

  // Function to get the appropriate weather icon based on the weather condition
  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        return clear;
      case "02d":
      case "02n":
        return cloud;
      case "03d":
      case "03n":
        return dizzle;
      case "04d":
      case "04n":
        return cloud;
      case "09d":
      case "09n":
        return rain;
      case "10d":
      case "10n":
        return rain; // Use the same icon for both day and night rain
      case "13d":
      case "13n":
        return snow;
      default:
        return cloud;
    }
  };
  return (
    <div className="home-section">
      <div className="this-week">
        
        <h3>This week</h3>

        <div className="week-section">
          {next7DaysWeather.map((day, index) => (
            <div className="week-card shadow-md" key={index}>
              <div className="day-name">{day.dayName}</div>
              <div className="weather-details">
                <img
                  src={getWeatherIcon(day.weatherDetails.weather[0].icon)}
                  alt=""
                />
                <div className="day-value">
                  {day.weatherDetails.main.temp}°C
                </div>
                {/* Display other weather details here */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="today-highlight">
        <h3>Today's Highlights</h3>
        <div className="highlights-section ">
          <div className="highlights-card shadow-md">
            <h4>Wind Status</h4>
            <div className="today-value">{data ? data.wind.speed : ""} m/s</div>
            <div className="unit">
              {formatWindStatus(data ? data.wind.speed : "")}
            </div>
          </div>

          <div className="highlights-card shadow-md">
            <h4>Humidity</h4>
            <div className="today-value">{data ? data.main.humidity : ""}%</div>
            <div className="unit">
              {data ? updateHumidityStatus(data ? data.main.humidity : "") : ""}
            </div>
          </div>
          <div className="highlights-card shadow-md">
            <h4>Sunrise & Sunset</h4>
            <div className="today-value">
              {formatTime(data ? data.sys.sunrise : "")}{" "}
            </div>
            <div className="unit">
              {formatTime(data ? data.sys.sunset : "")}
            </div>
          </div>
          <div className="highlights-card mb-2 shadow-md">
            <h4>Visibility</h4>
            <div className="today-value">
              {data ? (data.visibility / 1000).toFixed(0) : ""} Km
            </div>
            <div className="unit">
              {data
                ? updateVisibiltyStatus((data.visibility / 1000).toFixed(0))
                : ""}
            </div>
          </div>
          <div className="highlights-card mb-2 shadow-md">
            <h4>Air Quality</h4>
            <div className="today-value">
              {pollution ? pollution.list[0].main.aqi : ""}
            </div>
            <div className="unit">
              {" "}
              {pollution
                ? updateAirQualityStatus(pollution.list[0].main.aqi)
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
