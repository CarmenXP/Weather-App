
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Loading from './Loading'

const CardWeather = ({lon, lat}) => {
  

    
    const[weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [isCelsius, setIsCelsius] = useState(true)
    const [isloading, setIsloading] = useState(true)

    useEffect(() => {
      if(lat){
        const APIkey= "401aae2db04c381a99c839adf2512993"
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`

        axios.get(URL)
            .then(res => {
              setWeather(res.data)
              const temp = {
                celsius: `${Math.round(res.data.main.temp -273.15)} °C` ,
                farenheit: `${Math.round((res.data.main.temp -273.15) * 9/5 + 32)} °F`
              }
              setTemperature(temp)
              setIsloading(false)
            })
            .catch(err => console.log(err))
      }
    }, [lat, lon])

    console.log(weather)

    const handleClick = () => setIsCelsius (!isCelsius)

    if(isloading){
      return <Loading/>
    }else{
      return (
        <div className='background'>
          <div className="content">
            <h1>Weather App</h1>
            <h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
            <div className='icon'>
              <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png `} alt="icon" />
              <div>
                <h3>&#34;{weather?.weather[0].description}&#34;</h3>
                <ul>
                  <li><span><i className='bx bx-wind'></i>Wind Speed </span>{weather?.wind.speed} m/s</li>
                  <li><span><i className='bx bxs-cloud'></i>Clouds </span>{weather?.clouds.all} %</li>
                  <li><span><i className='bx bxs-thermometer'></i>Pressure </span>{weather?.main.pressure} hPa</li>
                </ul> 
              </div>
            </div>
            <h2>{isCelsius ? temperature?.celsius : temperature?.farenheit}</h2>
            <button onClick={handleClick}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button>

          </div>
        </div>
      )

    }
    

}

export default CardWeather