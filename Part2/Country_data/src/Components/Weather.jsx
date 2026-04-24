import axios from 'axios'
import { useEffect, useState } from 'react'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if (!country || !country.latlng) return

        const lat = country.latlng[0]
        const lon = country.latlng[1]

        axios
            .get(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code`
            )
            .then(response => {
                setWeather(response.data.current)
            })
    }, [country])

    if (!weather) {
        return <p>Loading weather...</p>
    }

    return (
        <div>
            <h3>Weather in {country.capital?.[0]}</h3>

            <p>
                <strong>Temperature:</strong> {weather.temperature_2m} °C
            </p>

            <p>
                <strong>Wind:</strong> {weather.wind_speed_10m} km/h
            </p>
        </div>
    )
}

export default Weather