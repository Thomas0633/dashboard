import React, { Component } from 'react';
import './Weather.scss';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [''],
      iconWeather: '',
    };
  }

  componentDidMount() {
    fetch('http://api.openweathermap.org/data/2.5/weather?id=6640252&appid=10e040c6a81e1e73a288b99a5ebe0f5a&units=metric')
      .then(res => res.json())
      .then(data => {
        let iconWeather = '';
        switch (data.weather[0].description) {
          case 'clear sky':
            iconWeather = 'http://openweathermap.org/img/w/01d.png';
            break;
          case 'few clouds':
            iconWeather = 'http://openweathermap.org/img/w/02d.png';
            break;
          case 'scattered clouds':
            iconWeather = 'http://openweathermap.org/img/w/03d.png';
            break;
          case 'broken clouds':
            iconWeather = 'http://openweathermap.org/img/w/04d.png';
            break;
          case 'shower rain':
            iconWeather = 'http://openweathermap.org/img/w/09d.png';
            break;
          case 'rain':
            iconWeather = 'http://openweathermap.org/img/w/10d.png';
            break;
          case 'thunderstorm':
            iconWeather = 'http://openweathermap.org/img/w/11d.png';
            break;
          case 'snow':
            iconWeather = 'http://openweathermap.org/img/w/13d.png';
            break;
          case 'mist':
            iconWeather = 'http://openweathermap.org/img/w/50d.png';
            break;
          default:
            iconWeather = '';
            break;
        }
        this.setState({
          weather: data,
          iconWeather,
        });
      });
  }

  render() {
    const { weather, iconWeather } = this.state;
    if (weather.keys !== undefined) {
      return (
        <div className='Weather'>
          <i className="fas fa-circle-notch fa-spin" />
        </div>
      )
    } else {
      return (
        <div className='Weather'>
          <h2>{weather.name}</h2>
          <p className='para-weather'>
            <img src={iconWeather} className='img-fluid img-icon-weather' alt='Icon weather' />
            {weather.main.temp}&deg;
          </p>
        </div>
      )
    }
  }
}

export default Weather;
