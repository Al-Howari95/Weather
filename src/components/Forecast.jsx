import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faSun } from '@fortawesome/free-solid-svg-icons';

const API_KEY = 'b0fb4fb0a8f44532b1a201548241804'; // Replace with your actual API key

const Forecast = ({ location }) => {
    const [forecastData, setForecastData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showForecast, setShowForecast] = useState(false);

    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location.name}&days=3`);
                setForecastData(response.data);
            } catch (error) {
                console.error('Error fetching forecast data:', error);
            }
        };

        fetchForecastData();
    }, [location]);

    const selectDate = (date) => {
        setSelectedDate(date);
    };

    const toggleForecast = () => {
        setShowForecast(!showForecast);
    };

    return (
        <div className="mt-4 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-center text-blue-600 mb-8 mt-12">3-Day Forecast for {location.name}</h2>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8" onClick={toggleForecast}>
                {showForecast ? "Hide Forecast" : "Show Forecast"}
            </button>
            {showForecast && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {forecastData ? (
                        forecastData.forecast.forecastday.map((day, index) => (
                            <div key={day.date} className="max-w-sm mx-auto bg-blue-100 rounded-md overflow-hidden shadow-md mb-12" onClick={() => selectDate(day.date)}>
                                <button className="text-lg font-semibold focus:outline-none mb-2">
                                    {day.date}
                                </button>
                                {selectedDate === day.date && (
                                    <div className="space-y-2">
                                        <p className="text-lg">Weather: <FontAwesomeIcon icon={faSun} /> {day.day.condition.text}</p>
                                        <p className="text-lg">Max Temp: <FontAwesomeIcon icon={faThermometerHalf} /> {day.day.maxtemp_c}°C</p>
                                        <p className="text-lg">Min Temp: <FontAwesomeIcon icon={faThermometerHalf} /> {day.day.mintemp_c}°C</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Loading forecast data...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Forecast;
