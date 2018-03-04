import React from 'react';
import './App.css';
import { connect } from 'react-redux';

import Plot from './Plot';
import {
  changeLocation,
  fetchData,
  setSelectedDate,
  setSelectedTemp
} from './actions';

class App extends React.Component {
  fetchData = (evt) => {
    evt.preventDefault();
    var location = encodeURIComponent(this.props.location);

    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=d231efc52bef00d653e1d966b0840736&units=metric';
    var url = urlPrefix + location + urlSuffix;

    this.props.dispatch(fetchData(url));
  };

  onPlotClick = (data) => {
    if (data.points) {
      var number = data.points[0].pointNumber;
      this.props.dispatch(setSelectedDate(this.props.dates[number]));
      this.props.dispatch(setSelectedTemp(this.props.temps[number]))
    }
  };

  changeLocation = (evt) => {
    this.props.dispatch(changeLocation(evt.target.value));
  };

  render() {
    var currentTemp = 'not loaded yet';
    if (this.props.data.list) {
      currentTemp = this.props.data.list[0].main.temp;
    }
    return (
      <div>
        <h1>Weather Forecast</h1>
        <h2>Using OpenWeatherMap API and Plotly Library</h2>
        <form onSubmit={this.fetchData}>
          <label>Show me the weather of
            <input
              type="text"
			  ref={input => this.city = input}
              value={this.props.location}
              onChange={this.changeLocation}
			  required
            />
          </label> in
		<select
		  ref={select => this.Metric = select}
		  name="Metric"
		  onChange={this.fetchData}>
		  <option value="Celsius">Celsius</option>
		  <option value="Fahrenheit">Fahrenheit</option>
		  <option value="Kelvin">Kelvin</option>
		</select>
        </form>
        {/*
          Render the current temperature and the forecast if we have data
          otherwise return null
        */}
        {(this.props.data.list) ? (
                 <div className = "wrapper">
                   {/* Render the current temperature if no specific date is selected */}
                   {(this.props.selected.temp) ? (
                     							<div>
								{(this.Metric.value === "Celsius")?(
									<div>
										<p className="weather-text">Predicted Temperature on <span className = "highlight">{this.props.selected.date}: {(this.props.selected.temp).toPrecision(4)}°C</span></p>
										<h2 className="weather-text">Forecast for {this.props.location}</h2>
									   <Plot
										 xData={this.props.dates}
										 yData={this.props.temps}
										 onPlotClick={this.onPlotClick}
										 type="scatter"
									   />
									</div>)
									:null}
								{(this.Metric.value === "Fahrenheit")?(
									<div>
										<p className="weather-text">Predicted Temperature on <span className = "highlight">{this.props.selected.date}: {(this.props.selected.temp * 1.8 + 32).toPrecision(4)}°F</span></p>
										<h2 className="weather-text">Forecast for {this.props.location}</h2>
									   <Plot
										 xData={this.props.dates}
										 yData={this.props.tempsf}
										 onPlotClick={this.onPlotClick}
										 type="scatter"
									   />
									</div>):null}
								{(this.Metric.value === "Kelvin")?(
									<div>
										<p className="weather-text">Predicted Temperature on <span className = "highlight">{this.props.selected.date}: {(this.props.selected.temp + 273.15).toPrecision(5)}K</span></p>
										<h2 className="weather-text">Forecast for {this.props.location}</h2>
									   <Plot
										 xData={this.props.dates}
										 yData={this.props.tempsk}
										 onPlotClick={this.onPlotClick}
										 type="scatter"
									   />
									</div>):null}
							</div>
                   ) : (
							<div>
								{(this.Metric.value === "Celsius")?(
									<div>
										<p className="weather-text">Current Temperature of {this.props.location}: <span className = "highlight">{currentTemp.toPrecision(4)}°C</span></p>
										<h2 className="weather-text">Forecast for {this.props.location}</h2>
									   <Plot
										 xData={this.props.dates}
										 yData={this.props.temps}
										 onPlotClick={this.onPlotClick}
										 type="scatter"
									   />
									</div>)
									:null}
								{(this.Metric.value === "Fahrenheit")?(
									<div>
										<p className="weather-text">Current Temperature of {this.props.location}: <span className = "highlight">{(currentTemp * 1.8 + 32).toPrecision(4)}°F</span></p>
										<h2 className="weather-text">Forecast for {this.props.location}</h2>
									   <Plot
										 xData={this.props.dates}
										 yData={this.props.tempsf}
										 onPlotClick={this.onPlotClick}
										 type="scatter"
									   />
									</div>):null}
								{(this.Metric.value === "Kelvin")?(
									<div>
										<p className="weather-text">Current Temperature of {this.props.location}: <span className = "highlight">{(currentTemp + 273.15).toPrecision(5)}K</span></p>
										<h2 className="weather-text">Forecast for {this.props.location}</h2>
									   <Plot
										 xData={this.props.dates}
										 yData={this.props.tempsk}
										 onPlotClick={this.onPlotClick}
										 type="scatter"
									   />
									</div>):null}
							</div>
                   )}
                 </div>
               ) : null}
      </div>
    );
  }
}

// Since we want to have the entire state anyway, we can simply return it as is!
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
