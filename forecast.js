import React, { useState, useEffect } from "react";

const Forecast = (props) => {
  const { position, city } = props;

  const [weatherData, setWeatherData] = useState(null);
  const [searchCityData, setSearchCityData] = useState(null);

  // Fetch weather data by coordinates
  const fetchWeather = async (position) => {
    const { latitude, longitude } = position;

    const apiKey = '8d0c6fdb9127e77ccbbb36cdce2c3ebb'; // Replace with your actual API key

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.log('Problem in API response');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch weather data by city name
  const fetchCityWeather = async (city) => {
    const apiKey = '8d0c6fdb9127e77ccbbb36cdce2c3ebb'; // Replace with your actual API key

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (response.ok) {
        const data = await response.json();
        setSearchCityData(data);
      } else {
        console.log('Problem in API response');
        alert('write valid city')
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  // Use useEffect to fetch data when position or city changes
  useEffect(() => {
    if (position.latitude && position.longitude) {
      fetchWeather(position);
    }
  }, [position]);

  useEffect(() => {
    if (city) {
      fetchCityWeather(city);
    }
  }, [city]);

  return (
    <div className=" flex-col mx-auto backdrop-blur-sm bg-white/30  max-w-[1100px] h-[400px] border-2  my-auto  md:flex-row sm:min-w-[500px] ">
      {searchCityData ? (
        <div className="flex-row items-center bg-slate-300 min-w-[900px] lg:flex-row ">
          <h1 className="text-center text-xl mx-auto ">Weather in {searchCityData.name}</h1>
          <div className="grid grid-flow-row-2 gap-4 p-4 m-3 grid-cols-3 justify-between  items-stretch my-auto  md:grid-row-4 sm:min-w-[700px] sm:grid-cols-2 md:grid-cols-2 
          ">
          <p><strong>Temperature:</strong> {searchCityData.main.temp.toFixed(2)} °C</p>
          <p><strong>Feels Like:</strong> {searchCityData.main.feels_like.toFixed(2)} °C</p>
          <p><strong>Weather:</strong> {searchCityData.weather[0].description}</p>
          <p><strong>Humidity:</strong> {searchCityData.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {searchCityData.wind.speed} m/s</p>
          </div>
        </div>
      ) : weatherData ? (
        <div className="flex-col backdrop-blur-md bg-white/30 min-w-[400px] max-w-[1150px] min-h-[380px]  ">
          <h1  className="text-center text-xl mx-auto ">Weather in <strong>{weatherData.name}</strong></h1>
          <div className="grid grid-flow-row-2 gap-4 p-4 m-3 grid-cols-3 justify-between  items-stretch my-auto
          ">
          <p className=""><strong>Temperature </strong>{weatherData.main.temp.toFixed(2)} °C</p>
          <p className=""><strong>Like:</strong> {weatherData.main.feels_like.toFixed(2)} °C</p>
          <p><strong>Weather </strong>Weather {weatherData.weather[0].description}</p>
          <p><strong>Humidity</strong>:{weatherData.main.humidity}%</p>
          <p><strong>Wind Speed</strong>: {weatherData.wind.speed} m/s</p>
          </div>
          
        </div>
      ) : (
        <p>Loading the data...</p>
      )}
    </div>
  );
};

export default Forecast;