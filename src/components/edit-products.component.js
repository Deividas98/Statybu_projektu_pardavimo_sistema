import React, { Component } from 'react';
import axios from 'axios';
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

export default class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeAprasymas = this.onChangeAprasymas.bind(this);
    this.onChangePavadinimas = this.onChangePavadinimas.bind(this);
    this.onChangeProjektas = this.onChangeProjektas.bind(this);
    this.onChangeSuma = this.onChangeSuma.bind(this);
    this.onChangeKiekis = this.onChangeKiekis.bind(this);
    this.onChangeKaina = this.onChangeKaina.bind(this);
    this.onChangePlotasm2 = this.onChangePlotasm2.bind(this);
    this.onChangePajamos = this.onChangePajamos.bind(this);
    this.onChangeStatusas = this.onChangeStatusas.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      aprasymas: '',
      pavadinimas: '',
      suma: 0,
      kiekis: 0,
      kaina: 0,
      //date: new Date(),
      plotasm2: 0,
      pajamos: 0,
      statusas: '',
      //---calc
      ebitda: 0,
      ebbitdaProc: 0,
      m2kaina: 0,
      projektai: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/products/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          pavadinimas: response.data.pavadinimas,
          aprasymas: response.data.aprasymas,
          suma: response.data.suma,
          kiekis: response.data.kiekis,
          kaina: response.data.kaina,
          projektas: response.data.projektas
          //date: new Date(response.data.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/projects/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            projektai: response.data.map(projektas => projektas.pavadinimas),//projekto pavadinimas
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangePavadinimas(e) {
    this.setState({
      pavadinimas: e.target.value
    })
  }

  onChangeAprasymas(e) {
    this.setState({
      aprasymas: e.target.value
    })
  }

  onChangeSuma(e) {
    this.setState({
      suma: e.target.value
    })
  }

  onChangeKiekis(e) {
    this.setState({
      kiekis: e.target.value
    })
  }

  onChangeKaina(e) {
    this.setState({
      kaina: e.target.value
    })
  }

  onChangeProjektas(e) {
    this.setState({
      projektas: e.target.value
    })
  }

  onChangePlotasm2(e) {
    this.setState({
      plotasm2: e.target.value,
      m2kaina: this.state.plotasm2 / this.state.kiekis
    })
  }

  onChangePajamos(e) {
    this.setState({
      pajamos: e.target.value
    })
  }

  onChangeStatusas(e) {
    this.setState({
      statusas: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const produktas = {
      aprasymas: this.state.aprasymas,
      pavadinimas: this.state.pavadinimas,
      projektas: this.state.projektas,
      suma: 100,//this.state.suma,
      kiekis: this.state.kiekis,
      kaina: this.state.kaina,
      plotasm2: this.state.plotasm2,
      pajamos: this.state.pajamos,
      statusas: this.state.statusas
    }

    console.log(produktas);

    axios.post('http://localhost:5000/products/update/' + this.props.match.params.id, produktas)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Redaguoti produktą</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Pavadinimas: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.pavadinimas}
              onChange={this.onChangePavadinimas}
            />
          </div>
          <div className="form-group">
            <label>Aprasymas: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.aprasymas}
              onChange={this.onChangeAprasymas}
            />
          </div>
          <div className="form-group">
            <label>Projektas: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.projektas}
              onChange={this.onChangeProjektas}>
              {
                this.state.projektai.map(function (projektas) {
                  return <option
                    key={projektas}
                    value={projektas}>{projektas}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Kaina: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.kaina}
              onChange={this.onChangeKaina}
            />
          </div>
          <div className="form-group">
            <label>Kiekis: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.kiekis}
              onChange={this.onChangeKiekis}
            />
          </div>
          <div className="form-group"> 
          <label>Suma: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.suma}
              onChange={this.onChangeSuma}
              />
        </div>
        <div className="form-group"> 
          <label>Plotas m2: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.plotasm2}
              onChange={this.onChangePlotasm2}
              />
        </div>
        <div className="form-group"> 
          <label>Pajamos: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.pajamos}
              onChange={this.onChangePajamos}
              />
        </div>
        <div className="form-group"> 
          <label>EBITDA: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.pajamos - this.state.suma}
              disabled = {true}
              />
        </div>
        <div className="form-group"> 
          <label>EBTIDA %: </label>
          <input  type="text"
              required
              className="form-control"
              value={((this.state.pajamos - this.state.suma) / this.state.pajamos * 100)}
              disabled = {true}
              />
        </div>
        <div className="form-group"> 
          <label>Kiekis: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.kiekis}
              onChange={this.onChangeKiekis}
              />
        </div>
        <div className="form-group"> 
          <label>m2 kaina: </label>
          <input  type="text"
              required
              className="form-control"
            value={this.state.plotasm2 / this.state.kiekis}
              disabled = {true}
              />
        </div>
        <div className="form-group"> 
        <label>Statusas: </label>
          <select //ref="userInput"
              required
              className="form-control"
                value={this.state.statusas}
              onChange={this.onChangeStatusas}>
              <option value="Juodraštis">Juodraštis</option>
              <option value="Pateiktas">Pateiktas</option>
              <option value="Laimėtas">Laimėtas</option>
              <option value="Pralaimėtas">Pralaimėtas</option>
              <option value="Atšauktas">Atšauktas</option>                   
          </select>
        </div>
          <div className="form-group">
            <input type="submit" value="Redaguoti" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}