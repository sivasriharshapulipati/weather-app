import React, { useState } from 'react';
import axios from 'axios';
import { TiWeatherCloudy } from 'react-icons/ti';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const API_KEY = 'b9ecde66ce04183b1bff04ef30a97eea';

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}`
      );

      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError('Error fetching weather data. Please try again.');
    }
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold mb-4">
        Weather App <TiWeatherCloudy className="inline-block text-blue-500" />
      </h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter a location"
          value={location}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 ml-2 focus:outline-none hover:bg-blue-600"
        >
          Get Weather
        </button>
      </form>

      {weatherData && (
        <div className="border border-gray-300 rounded-md shadow-lg p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Weather in {weatherData.name}
          </h2>
          <p className="mb-2">
            Temperature: {weatherData.main.temp} {isCelsius ? '°C' : '°F'}
          </p>
          <p className="mb-2">Description: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <button
            className="bg-blue-500 text-white rounded-md py-2 px-4 mt-4 focus:outline-none hover:bg-blue-600"
            onClick={toggleTemperatureUnit}
          >
            Toggle Unit
          </button>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Weather;
