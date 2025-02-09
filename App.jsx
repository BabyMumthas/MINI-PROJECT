import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Get API key from env

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  // Fetch countries data
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => setCountries(response.data));
  }, []);

  // Fetch weather when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      const capital = selectedCountry.capital?.[0];
      if (capital) {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}`)
          .then(response => setWeather(response.data));
      }
    }
  }, [selectedCountry]);

  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Find countries"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {selectedCountry ? (
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <p><strong>Capital:</strong> {selectedCountry.capital?.[0]}</p>
          <p><strong>Area:</strong> {selectedCountry.area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(selectedCountry.languages || {}).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.png} alt="Flag" width="150" />

          {weather && (
            <div>
              <h2>Weather in {selectedCountry.capital?.[0]}</h2>
              <p><strong>Temperature:</strong> {weather.current.temp_c}°C</p>
              <img src={weather.current.condition.icon} alt="Weather icon" />
              <p><strong>Wind:</strong> {weather.current.wind_kph} kph</p>
            </div>
          )}

          <button onClick={() => setSelectedCountry(null)}>Back</button>
        </div>
      ) : (
        <ul>
          {filteredCountries.slice(0, 10).map(country => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => setSelectedCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
