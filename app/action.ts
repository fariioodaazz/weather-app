"use server";

import { WeatherData } from "../types/weather";

export async function getWeatherData(city: string): Promise<{ data?: WeatherData; error?: string }> {
  try {
    if (!city.trim()) {
      return { error: "City name cannot be empty" };
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OpenWeatherAPIkey}`
    );

    if (!res.ok) {
      if (res.status === 404) {
        return { error: "City not found. Please check the name and try again." };
      }

      const { message } = await res.json().catch(() => ({ message: "Unknown error occurred" }));
      return { error: message };
    }

    const data = await res.json();
    return { data };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { error: "Network error or invalid API key" };
  }
}
