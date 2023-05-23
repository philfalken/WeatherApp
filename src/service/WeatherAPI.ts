export interface WeatherData {
  temperatureFahrenheit: number;
  description: string;
  feelsLike: number;
  humidity: number;
  icon: string;
  city: string;
  windSpeed: number;
}

// https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=0cbb27f322ac1594bcc0a7d616ff654b
const WEATHER_API_KEY = "0cbb27f322ac1594bcc0a7d616ff654b";

// 4.12 m/s = 10 mph

async function fetchWeatherData(city: string): Promise<WeatherData> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
  );
  const data = await response.json();
  if (response.ok) {
    const temperatureKelvin: number = data.main.temp;

    // convert from kelvin to fahrenheit, 1 decimal place

    const temperatureFahrenheit: number =
      (temperatureKelvin - 273.15) * 1.8 + 32;

    // round to 1 decimal place
    const roundedTemperatureFahrenheit: number =
      Math.round(temperatureFahrenheit * 10) / 10;

    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    const windSpeed = data.wind.speed;

    // wind speed is in meter/s, convert to mph, 1 decimal place
    const windSpeedMph = Math.round(windSpeed * 2.237 * 10) / 10;

    const city = data.name;
    return {
      temperatureFahrenheit: roundedTemperatureFahrenheit,
      description,
      feelsLike,
      humidity,
      icon: iconUrl,
      city,
      windSpeed: windSpeedMph,
    };
  } else {
    throw new Error(data.message);
  }
}

export default fetchWeatherData;
