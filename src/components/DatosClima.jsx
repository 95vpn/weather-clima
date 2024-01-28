import React, { useRef, useState } from 'react'
import './styles/DatosClima.css'

const DatosClima = ({ weather, temp, setTextInput, hasError }) => {

  console.log(weather)

  const [isCelsius, setIsCelsius] = useState(true)

  const handleChange = () => {
    setIsCelsius(!isCelsius);
  }

  const city = useRef();

  const handleForm = event => {
    event.preventDefault();
    setTextInput(city.current.value.toLowerCase().trim())
  }

  return (
    <section className='container-weather'>
      <h1>Weather App</h1>
      <form className='form' onSubmit={handleForm}>
        <input type="text" ref={city} />
        <button>Search</button>
      </form>
      {
        hasError ?
          <>
            <h2>That city was not found</h2>
            <h3>Please, try again</h3>
          </>
          :
          <>
            <h2 className='city'>{weather?.name}, {weather?.sys.country}</h2>
            <article className='container-info'>
              <figure className='fig'>
                <img className='img' src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="weather icon"
                />
              </figure>
              <div>
                <h2 className='clouds'>{weather?.weather[0].description}</h2>
                <ul className='info'>
                  <li><span>Wind Speed: </span> <span>{weather?.wind.speed} m/s</span></li>
                  <li><span>Clouds: </span> <span>{weather?.clouds.all} %</span></li>
                  <li> <span>Presure: </span> <span>{weather?.main.pressure} hPa</span></li>
                  <li> <span>Humidity: </span> <span>{weather?.main.humidity} % </span></li>
                </ul>
              </div>
            </article>
            <div className='container-button'>
              <h3 className='temp'>{isCelsius ?
                temp?.celcius + '°C'
                :
                temp?.fahrenheit + '°F'
              } </h3>
              <button className='btn' onClick={handleChange}>
                Change to {isCelsius ? '°F' : '°C'}
              </button>
            </div>
          </>
      }
    </section >
  )
}

export default DatosClima