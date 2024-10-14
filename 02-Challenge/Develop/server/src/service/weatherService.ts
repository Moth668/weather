import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
  country: string;
  state: string;
  cityName: string; 
}

// TODO: Define a class for the Weather object
class WeatherObject {
  cityName: string;
  date: string;
  icon: string;
  description: string;
  temperature: string;
  humidity: string;
  windSpeed: string;

  constructor(cityName: string, date: string, icon: string, description: string, temperature: string, humidity: string, windSpeed: string) {
    this.cityName = cityName;
    this.icon = icon;
    this.description = description;
    this.date = date;
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private APIkey: string;
  cityName: string;

  constructor(cityName: string) {
    this.baseURL = process.env.API_BASE_URL || '';
    this.APIkey = process.env.API_KEY || '';
    this.cityName = cityName;
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(
        `${this.baseURL}geo/1.0/direct?q=${query}&limit=5&appid=${this.APIkey}`
      );
      const locationData = await response.json();
      return locationData[0];
    }
    catch (err) {
      console.log('Error:', err);
      return err;
    }
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates[]) {
    const coordinatesArray: Coordinates[] = locationData.map((coordinate) => {
      const locationData: Coordinates = {
        cityName: coordinate.cityName,
        lat: coordinate.lat,
        lon: coordinate.lon,
        country: coordinate.country,
        state: coordinate.state,
      };
      return locationData;
    });
    return coordinatesArray;
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(address: string): string {
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    const query = `?address=${encodeURIComponent(address)}&key=${this.APIkey}`;
    return `${baseUrl}${query}`;
  }

     // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(latitude: number, longitude: number): string {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const query = `?lat=${latitude}&lon=${longitude}&appid=${this.APIkey}`;
  return `${baseUrl}${query}`;
}

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(address: string): Promise < { latitude: number, longitude: number } > {
  const geocodeUrl = this.buildGeocodeQuery(address);
  const response = await fetch(geocodeUrl);
  const data = await response.json();

  if(data.status !== 'OK') {
  throw new Error('Failed to fetch location data');
}

const location = data.results[0].geometry.location;
return {
  latitude: location.lat,
  longitude: location.lng
};
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(latitude: number, longitude: number): Promise < any > {


  const weatherUrl = this.buildWeatherQuery(latitude, longitude);
  const response = await fetch(weatherUrl);
  const data = await response.json();

  if(response.status !== 200) {
  throw new Error('Failed to fetch weather data');
}

return data;
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(weatherData: any): { temperature: number, humidity: number, description: string } {

  const temperature = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const description = weatherData.weather[0].description;

  return {
    temperature,
    humidity,
    description
  };
}
  // TODO: Complete buildForecastArray method
  private buildForecastArray(forecastData: any): Array < { date: string, temperature: number, description: string } > {
  return forecastData.list.map((item: any) => {
    return {
      date: item.dt_txt,
      temperature: item.main.temp,
      description: item.weather[0].description
    };
  });
}

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<{ temperature: number, humidity: number, description: string }> {
      try {
          const { latitude, longitude } = await this.fetchAndDestructureLocationData(city);
          const weatherData = await this.fetchWeatherData(latitude, longitude);
          const currentWeather = this.parseCurrentWeather(weatherData);
          return currentWeather;
      } catch (error) {
          if (error instanceof Error) {
              throw new Error(`Failed to get weather for city: ${error.message}`);
          } else {
              throw new Error('Failed to get weather for city: Unknown error');
          }
      }
  }
}
export default WeatherService;
