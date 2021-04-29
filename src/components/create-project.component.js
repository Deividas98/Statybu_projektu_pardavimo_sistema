import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeAprasymas = this.onChangeAprasymas.bind(this);
        this.onChangePavadinimas = this.onChangePavadinimas.bind(this);
        this.onChangeImone = this.onChangeImone.bind(this);
        this.onChangeProjektoSuma = this.onChangeProjektoSuma.bind(this);
        this.onChangeNuolaida = this.onChangeNuolaida.bind(this);
        this.onChangeBusena = this.onChangeBusena.bind(this);

        this.state = {
            aprasymas: '',
            prjPavadinimas: '',
            imone: '',
            projektoSuma: 0,
            nuolaida: 0,
            busena: 'Pradėtas',
            imones: [],
            pavadinimas: ''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/accounts/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              //projektai: response.data.map(projektas => projektas.pavadinimas),
              imones: response.data.map(imone => [imone._id, imone.pavadinimas]),
              pavadinimas: response.data[0].pavadinimas//,
              //ProjectId: response.data.map(projektas => projektas._id)//isbandyti
            })
            console.log(this.state.imones)
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    onChangeAprasymas(e) {
        this.setState({
            aprasymas: e.target.value
        })
    }

    onChangePavadinimas(e) {
        this.setState({
            prjPavadinimas: e.target.value
        })
    }

    onChangeImone(e) {
        this.setState({
            imone: e.target.value
        })
    }

    onChangeProjektoSuma(e) {
        this.setState({
            projektoSuma: e.target.value
        })
    }

    onChangeNuolaida(e) {
        this.setState({
            nuolaida: e.target.value
        })
    }

    onChangeBusena(e) {
        this.setState({
            busena: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const projektas = {
            aprasymas: this.state.aprasymas,
            pavadinimas: this.state.prjPavadinimas,
            imone: this.state.imone,
            projektoSuma: this.state.projektoSuma,
            nuolaida: this.state.nuolaida,
            busena: this.state.busena
        }

        console.log(projektas);

        axios.post('http://localhost:5000/projects/add', projektas)
            .then(res => console.log(res.data));

        this.setState({
            aprasymas: '',
            prjPavadinimas: '',
            imone: '',
            projektoSuma: 0,
            nuolaida: 0,
            busena: 'Pradėtas'
        })
    }

    render() {
        return (
            <Modal {...this.props}>
            <Modal.Header closeButton onClick={this.props.onHide}>
                <Modal.Title>Sukurti projektą</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div className="form-group">
                        <label>Pavadinimas: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.prjPavadinimas}
                            onChange={this.onChangePavadinimas}
                        />
                    </div>
                    <div className="form-group">
                        <label>Aprašymas: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.aprasymas}
                            onChange={this.onChangeAprasymas}
                        />
                    </div>
                    <div className="form-group"> 
        <label>Įmonė: </label>
          <select //ref="userInput"
              required
              className="form-control"
                value={this.state.imone}
              onChange={this.onChangeImone}>
              {
                this.state.imones.map(function([_id, pavadinimas]) {
                  return <option 
                    key={_id}
                    value={_id}>{pavadinimas}
                    </option>;
                })
              }
          </select>
        </div>
                    <div className="form-group">
                        <label>Projekto suma: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.projektoSuma}
                            onChange={this.onChangeProjektoSuma}
                        />
                    </div>
                    <div className="form-group">
                        <label>Nuolaida: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.nuolaida}
                            onChange={this.onChangeNuolaida}
                        />
                    </div>
                    <div className="form-group">
                        <label>Būsena: </label>
                        <select //ref="userInput"
                            required
                            className="form-control"
                            value={this.state.busena}
                            onChange={this.onChangeBusena}>
                                <option value="Pradėtas">Pradėtas</option>
                                <option value="Vykdomas">Vykdomas</option>
                                <option value="Pabaigtas">Pabaigtas</option>
                            </select>
                    </div>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Atšaukti</Button>
                    <Button variant="primary" onClick={this.onSubmit}>Išsaugoti</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}