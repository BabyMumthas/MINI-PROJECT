/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryList = ({ countries, handleShow }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => handleShow(country.name.common)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Area:</strong> {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" width="150" />
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setCountries(response.data));
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [query, countries]);

  const handleShow = (countryName) => {
    setQuery(countryName);
  };

  return (
    <div>
      <label>Find countries: </label>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length > 1 ? (
        <CountryList countries={filteredCountries} handleShow={handleShow} />
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <p>No matches</p>
      )}
    </div>
  );
};

export default App;
