'use client';
import {Input} from "../components/ui/input";
import {Button} from "../components/ui/button";
import {Card} from "../components/ui/card";
import {Search, Thermometer,Droplets,Wind} from "lucide-react";
import {getWeatherData} from "./action";
import { useState } from "react";
import { WeatherData } from "../types/weather";
import { CardContent } from "@/components/ui/card";

function SubmitButton() {
  return (
    <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2">
      <Search className="h-4 w-4" />
    </Button>
  );
}


export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const handleSearch = async (formData : FormData) => {
    setError("");

    const city = formData.get("city") as string;
    const { data , error:weatherError} = await getWeatherData(city);
    if (weatherError) {
      setError(weatherError);
      setWeather(null);
    }

    if (data) {
      setWeather(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <form action={handleSearch} className="flex items-center space-x-2">
          <Input 
            name="city"
            type="text"
            placeholder="Enter city name"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <SubmitButton /> 
        </form>
        {error && (
          <div className="text-red-500 text-center mt-4 bg-red-500/20 p-2 rounded-md">
            {error}
          </div>
        )}
        {weather && (
          <div>
            <Card className="bg-white/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold">{weather.name}</h2>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      width ={64}
                      height={64}
                    />
                    <div className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</div>
                    </div>
                    <div className="text-gray-500 mt-1 capitalize" >{weather.weather[0].description}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <Thermometer className="h-6 w-6 mx-auto text-orange-500 mb-2" />
                    <div className="mt-2 text-sm text-gray-500">Feels Like</div>
                    <div className="font-semibold">{Math.round(weather.main.feels_like)}°C</div>
                  </div>
                  <div className="text-center">
                    <Droplets className="h-6 w-6 mx-auto text-blue-500 mb-2" />
                    <div className="mt-2 text-sm text-gray-500">Humidity</div>
                    <div className="font-semibold">{Math.round(weather.main.humidity)}%</div>
                  </div>
                  <div className="text-center">
                    <Wind className="h-6 w-6 mx-auto text-teal-500 mb-2" />
                    <div className="mt-2 text-sm text-gray-500">Wind</div>
                    <div className="font-semibold">{Math.round(weather.wind.speed)} m/s</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
