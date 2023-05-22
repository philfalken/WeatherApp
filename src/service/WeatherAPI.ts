export interface WeatherData {
  temperature: number;
  description: string;
  feelsLike: number;
  humidity: number;
  icon: string;
  city: string;
}

// https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=0cbb27f322ac1594bcc0a7d616ff654b
const WEATHER_API_KEY = "0cbb27f322ac1594bcc0a7d616ff654b";

async function fetchWeatherData(city: string): Promise<WeatherData> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
  );
  const data = await response.json();
  if (response.ok) {
    const temperature: number = data.main.temp;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const city = data.name;
    return { temperature, description, feelsLike, humidity, icon, city };
  } else {
    throw new Error(data.message);
  }
}

export default fetchWeatherData;
