export interface WeatherData {
  name: string;
  sys: { country: string };
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    main: string;
    icon: string;
  }>;
}