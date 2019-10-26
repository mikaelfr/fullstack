import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({country}) => {
    const [weather, setWeather] = useState({})
    const [query] = useState(country)

    /*useEffect(() => {
        const fetchData = () => {
            const result = axios.get(`http://api.weatherstack.com/current?access_key=cedb3b1a688da9104bcb576fdeae4c84&query=${query}`)
            setWeather(result)
        }

        fetchData()
      }, [query])
*/

      useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=cedb3b1a688da9104bcb576fdeae4c84&query=${query}`)
            .then(response => {
                setWeather(response.data)
            })
      }, [query])

      console.log('weather')
      console.log(weather)

    if (typeof weather.location === 'undefined') {
        return null
    }

    return (
        <div>
            <h3>Weather in {weather.location.name}</h3>
            <p><b>temperature:</b> {weather.current.temperature} Celsius</p>
            <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} />
            <p><b>wind:</b> {weather.current.wind_speed} kph  direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather