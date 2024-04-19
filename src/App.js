import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar.jsx'
import Forecast from './components/Forecast.jsx';
import Button from './components/Button.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';



const API_KEY = 'b0fb4fb0a8f44532b1a201548241804'; // Replace with your actual API key

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchQuery}`);
        console.log(response)
        setWeatherData(response.data);
      } catch (error) {
        setError('Error fetching weather data. Please try again.');
      }
    };

    fetchWeatherData();
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Navbar/>
      <Hero/>
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {/* {error && <div>{error}</div>} */}
      {weatherData && (
        <div>
          <WeatherCard weatherData={weatherData} />
          <Forecast location={weatherData.location} />
        </div>
      )}
      <Button/>
      <Footer/>
    </div>
  );
};

export default App;
