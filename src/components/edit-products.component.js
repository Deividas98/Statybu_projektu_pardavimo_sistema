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
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      aprasymas: '',
      pavadinimas: '',
      suma: 0,
      kiekis: 0,
      kaina: 0,
      //date: new Date(),
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

  onSubmit(e) {
    e.preventDefault();

    const produktas = {
      aprasymas: this.state.aprasymas,
      pavadinimas: this.state.pavadinimas,
      projektas: this.state.projektas,
      suma: 100,//this.state.suma,
      kiekis: this.state.kiekis,
      kaina: this.state.kaina
    }

    console.log(produktas);

    axios.post('http://localhost:5000/products/update/' + this.props.match.params.id, produktas)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
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
          {/*} <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>*/}

          <div className="form-group">
            <input type="submit" value="Edit Produktas Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}