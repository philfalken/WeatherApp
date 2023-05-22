import React, { useState, useEffect } from "react";
import fetchWeatherData, { WeatherData } from "../../service/WeatherAPI";

declare interface CityCardProps {
  city: string;
}

// pass props to CityCard
// const CityCard: React.FC<CityCardProps> = (props) => {
const CityCard: React.FC<CityCardProps> = (props) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchWeatherData(props.city)
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>No weather data available.</div>;
  }

  return (
    <div>
      <h1>Weather Information</h1>
      <p>City: {weatherData.city}</p>
      <p>Temperature: {weatherData.temperature}°C</p>
      <p>Description: {weatherData.description}</p>
    </div>
  );
};

export default CityCard;
