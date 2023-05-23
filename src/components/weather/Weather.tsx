import React, { useState } from "react";
import CityCard from "./CityCard";
import CitySearch from "./CitySearch";

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>("");

  const handleSearch = (city: string) => {
    // Perform the search or any other action based on the city value
    setCity(city);
    console.log("Searching for:", city);
  };

  return (
    <div>
      <CitySearch onSearch={handleSearch} />
      <CityCard city={city} />
    </div>
  );
};

export default WeatherApp;
