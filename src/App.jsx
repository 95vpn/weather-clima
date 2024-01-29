import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import DatosClima from './components/DatosClima';
const APIkey = '28e4936b8ca779b575f3fca63523d4fe';

function App() {

  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [textInput, setTextInput] = useState('');
  const [finder, setFinder] = useState();
  const [hasError, sethasError] = useState();


  const succes = position => {
    // console.log(position);
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    }
    setCoords(obj)
  }

  useEffect(() => {
    if (coords) {

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`
      axios.get(url)
        .then(res => {
          const obj = {
            celcius: (res.data.main.temp - 273.15).toFixed(2),
            fahrenheit: ((res.data.main.temp - 273.15) * (9 / 5) + 32).toFixed(2),
          }
          sethasError(false);
          setTemp(obj);
          setWeather(res.data)
        })
        .catch(err => {
          sethasError(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [coords])

  useEffect(() => {
    if (textInput) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${textInput}&appid=${APIkey}`
      axios.get(url)
        .then(res => {
          const obj = {
            celcius: (res.data.main.temp - 273.15).toFixed(2),
            fahrenheit: ((res.data.main.temp - 273.15) * (9 / 5) + 32).toFixed(2),
          }
          sethasError(false);
          setTemp(obj)
          setFinder(res.data)
        })
        .catch(err => {
          sethasError(true)
          console.log(err)
        })
    }
  }, [textInput]);
  console.log(finder)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes);
  }, []);

  console.log(coords)
  console.log(weather)

  return (
    <div className='app'>
      {
        isLoading ?
          <div><h2 className='loader'>|O|</h2>
          </div>

          :
          textInput ?
            <DatosClima
              weather={finder}
              temp={temp}
              setTextInput={setTextInput}
              hasError={hasError}
            />
            :
            <DatosClima
              weather={weather}
              temp={temp}
              setTextInput={setTextInput}
              hasError={hasError}
            />
      }
    </div>
  )
}

export default App;
