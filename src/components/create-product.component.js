import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export default class CreateProducts extends Component {
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
      projektai: [],
      ProjectId: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/projects/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            //projektai: response.data.map(projektas => projektas.pavadinimas),
            projektai: response.data.map(projektas => [projektas._id, projektas.pavadinimas]),
            pavadinimas: response.data[0].pavadinimas//,
            //ProjectId: response.data.map(projektas => projektas._id)//isbandyti
          })
          console.log(this.state.projektai)
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
    console.log(this.state.projektas)//paima tik is antro/ trecio karto kazkodel ir paima preajusi vizualiai bet iraso teisingai
  }

  /*onChangeDate(date) {
    this.setState({
      date: date
    })
  }*/

  onSubmit = (e) => {
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

    axios.post('http://localhost:5000/products/add', produktas)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <Modal {...this.props}>
            <Modal.Header closeButton onClick={this.props.onHide}>
                <Modal.Title>Sukurti produktą</Modal.Title>
            </Modal.Header>
            <Modal.Body>
      <div className="form-group"> 
          <label>Pavadinimas: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.pavadinimas}
              onChange={this.onChangePavadinimas}
              />
        </div>
        <div className="form-group"> 
          <label>Aprasymas: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.aprasymas}
              onChange={this.onChangeAprasymas}
              />
        </div>
        <div className="form-group"> 
        <label>Projektas: </label>
          <select //ref="userInput"
              required
              className="form-control"
                value={this.state.projektas}
              onChange={this.onChangeProjektas}>
              {
                this.state.projektai.map(function([_id, pavadinimas]) {
                  return <option 
                    key={_id}
                    value={_id}>{pavadinimas}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Kaina: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.kaina}
              onChange={this.onChangeKaina}
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
       {/*} <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>*/}

      
        </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Atšaukti</Button>
                    <Button variant="primary" onClick={this.onSubmit}>Išsaugoti</Button>
                </Modal.Footer>
            </Modal>
    )
  }
}