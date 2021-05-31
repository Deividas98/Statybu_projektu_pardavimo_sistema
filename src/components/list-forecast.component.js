import React, { Component } from 'react';
import axios from 'axios';

//ne atskiram faile nes mazas komponentas
const Forecast = props => (
  <tr>
    <td>{props.task.periodoPradzia}</td>
    <td>{props.task.periodoPabaiga}</td>
    <td>{props.task.isdalintaSuma}</td>
  </tr>
)

export default class ForecastsList extends Component {
  constructor(props) {
    super(props);

    this.state = { forecasts: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/forecasts/')
      .then(response => {
        this.setState({ forecasts: response.data })
        //console.log(this.state.products);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  forecastList() {
    return this.state.forecasts.map(currentforecast => {
      return <Forecast forecast={currentforecast} key={currentforecast._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Prognozės</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Periodo pradžia</th>
              <th>Periodo pabaiga</th>
              <th>Išdalinta suma</th>
            </tr>
          </thead>
          <tbody>
            {this.forecastList()}
          </tbody>
        </table>
      </div>
    )
  }
}