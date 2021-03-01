import React, { useState, useEffect } from 'react'
import axios from 'axios'
require('dotenv').config()

const SampleComponent = (props) => {
  const style = {width: "12%"}

  if (props.inputValue === '') {
    return null
  }

  if (props.filterValue.length > 10) {
    return(
      <p><b>There are too many matches, please specify with another filter!</b></p>
    )
  }

  if (props.filterValue.length <= 10 && props.filterValue.length > 1) {
    return(
      <ul>
        {props.filterValue.map(result =>
          <li key={result.name}>{result.name} <button value={result.name} onClick={props.buttonValue}>show info</button> </li>
        )}
      </ul>
    )
  }

  if (props.filterValue.length < 1) {
    return(
      <p><b>There is no country under this name, please specify with another filter!</b></p>
    )
  }

  if (props.filterValue.length = 1) {
      return(
      <div>

        <div>
          {props.filterValue.map(b =>
            <div>
              <h1>{b.name}</h1>
              <p>Capital: {b.capital}</p>
              <p>Population: {b.population}</p>
            </div>
          )}
        </div>

        <div>
          <h1>Languages</h1>
            <ul>
              {props.filterValue.map(b => b.languages.map(c =>
                <li key={c.nativeName}>
                  <p>{c.name}</p>
                </li>
              ))}
            </ul>
        </div>

        <div>
          {props.filterValue.map(b =>
            <img key={b.nativeName} style={style} src={b.flag} />
          )}
        </div>

        <div>
          <h1>Weather in {props.capitalValue}</h1>
          <p><b>Temperature:</b> {props.temperatureValue} Celcius</p>
          <img src={props.imageValue} />
          <p><b>Windspeed (mph):</b> {props.windValue} and direction is {props.directionValue}</p>
        </div>

      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const [capital, setCapital] = useState([])

  const [temperature, setTemperature] = useState([])
  const [image, setImage] = useState('')
  const [wind, setWind] = useState([])
  const [direction, setDirection] = useState('')

  const results = countries.filter(result => result.name.toLowerCase().includes(filterCountry.toLowerCase()))
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('http://localhost:3001/countriesDB')
      .then(response => {
        setCountries(response.data)
        setCapital(response.data.filter(result => result.name.toLowerCase().includes(filterCountry.toLowerCase())).map(result => result.capital))
      })
  }, [filterCountry])

    useEffect(() => {
      if(capital.length = 1) {
      axios
        .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}`)
        .then(response => {
          setTemperature(response.data.current.temp_c)
          setImage(response.data.current.condition.icon)
          setWind(response.data.current.wind_mph)
          setDirection(response.data.current.wind_dir)
        })
      }
    }, [capital])

  const handleFilterCountryChange = (event) => {
    console.log(event.target.value)
    setFilterCountry(event.target.value)
  }

  const buttonClick = (event) => {
    console.log(event.target.value)
    setFilterCountry(event.target.value)
  }

  return(
    <div>

      <div>
        <p>Search for a country: <input value={filterCountry} onChange={handleFilterCountryChange} placeholder="what country?" /></p>
      </div>

      <div>
      <SampleComponent inputValue={filterCountry} filterValue={results} capitalValue={capital} temperatureValue={temperature} imageValue={image} windValue={wind} directionValue={direction} buttonValue={buttonClick} />
      </div>

    </div>
  )



}
export default App
