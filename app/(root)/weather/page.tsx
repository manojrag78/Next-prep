"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  SunIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";
import { useDebounce } from "@/app/hooks/useDebounce";

interface ForecastDay {
  date: string;
  temp_max: number;
  temp_min: number;
  precipitation: number;
}

interface CurrentInfo {
  temperature: number;
  localTime: string;
}

const WeatherApp = () => {
  const [location, setLocation] = useState("Bengaluru");
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [currentInfo, setCurrentInfo] = useState<CurrentInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedLocation = useDebounce(location, 300);

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      // Step 1: Get latitude & longitude using Nominatim
      const geoRes = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: { q: city, format: "json", limit: 1 },
        }
      );

      if (!geoRes.data.length) {
        throw new Error("City not found");
      }

      const { lat, lon } = geoRes.data[0];

      // Step 2: Get forecast and current weather from Open-Meteo
      const weatherRes = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: lat,
            longitude: lon,
            daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
            current_weather: true,
            timezone: "auto",
          },
        }
      );

      const daily = weatherRes.data.daily;
      const days: ForecastDay[] = daily.time.map((date: string, i: number) => ({
        date,
        temp_max: daily.temperature_2m_max[i],
        temp_min: daily.temperature_2m_min[i],
        precipitation: daily.precipitation_sum[i],
      }));

      setForecast(days);

      const now = weatherRes.data.current_weather;
      setCurrentInfo({
        temperature: now.temperature,
        localTime: new Date(now.time).toLocaleString("en-US", {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
          day: "numeric",
          month: "short",
          timeZone: weatherRes.data.timezone,
        }),
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("City not found or data unavailable.");
      setForecast([]);
      setCurrentInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(debouncedLocation);
  }, [debouncedLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (location.trim()) 
  };

  const getIcon = (precip: number) => {
    if (precip > 5) return <CloudIcon className="h-8 w-8 text-blue-400" />;
    if (precip > 0) return <CloudIcon className="h-8 w-8 text-gray-300" />;
    return <SunIcon className="h-8 w-8 text-yellow-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 p-4 md:p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6"
        >
          <h1 className="text-3xl font-bold mb-6">7-Day Weather Forecast</h1>

          <form onSubmit={handleSubmit} className="flex mb-6">
            <div className="relative flex-grow">
              <MagnifyingGlassIcon className="absolute h-5 w-5 left-3 top-3 text-white" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city"
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              type="submit"
              className="ml-2 px-4 cursor-pointer py-2 bg-white/20 hover:bg-white/30 rounded-lg transition duration-200"
            >
              Search
            </button>
          </form>

          {loading && (
            <div className="flex justify-center py-10">
              <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full" />
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-100 text-red-800 rounded mb-4">
              {error}
            </div>
          )}

          {currentInfo && !error && (
            <div className="text-center mb-6">
              <p className="text-xl font-semibold">{location}</p>
              <p className="text-white/80">{currentInfo.localTime}</p>
              <p className="text-5xl font-bold mt-2">
                {Math.round(currentInfo.temperature)}°C
              </p>
            </div>
          )}

          {forecast.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {forecast.map((day) => (
                <div
                  key={day.date}
                  className="bg-white/10 p-4 rounded-lg text-center flex flex-col items-center"
                >
                  <p className="text-sm font-semibold mb-1">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  {getIcon(day.precipitation)}
                  <p className="text-lg mt-2">
                    {Math.round(day.temp_max)}° / {Math.round(day.temp_min)}°
                  </p>
                  <p className="text-sm text-white/70">
                    💧 {day.precipitation.toFixed(1)} mm
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
        <p className="text-center mt-6 text-white/60 text-sm">
          Powered by Open-Meteo & Nominatim
        </p>
      </div>
    </div>
  );
};

export default WeatherApp;
