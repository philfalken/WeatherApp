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
    if (props.city) {
      fetchWeatherData(props.city)
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
          setError("");
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [props.city]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return (
      <div className="vh-100" style={{ backgroundColor: "#4B515D" }}></div>
    );
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#4B515D" }}>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div
              className="card"
              style={{ color: "#4B515D", borderRadius: 35 }}
            >
              <div className="card-body p-4">
                <div className="d-flex">
                  <h4 className="flex-grow-1">{weatherData.city}</h4>
                </div>
                <div className="d-flex flex-column text-center mt-3 mb-4">
                  <h6
                    className="display-4 mb-0 font-weight-bold"
                    style={{ color: "#1C2331" }}
                  >
                    {" "}
                    {weatherData.temperatureFahrenheit}°F{" "}
                  </h6>
                  <span style={{ color: "#868B94" }}>
                    {weatherData.description}
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                    <div>
                      <i
                        className="fas fa-wind fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1"> {weatherData.windSpeed} mph</span>
                    </div>
                    <div>
                      <i
                        className="fas fa-tint fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1">
                        {" "}
                        Humidity: {weatherData.humidity}%{" "}
                      </span>
                    </div>
                  </div>
                  <div>
                    {weatherData.icon && (
                      <img src={weatherData.icon} alt="Weather Icon" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityCard;
