import React, { Component } from 'react';
import axios from 'axios';

export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeAprasymas = this.onChangeAprasymas.bind(this);
        this.onChangePavadinimas = this.onChangePavadinimas.bind(this);
        this.onChangeKontaktas = this.onChangeKontaktas.bind(this);
        this.onChangeProjektoSuma = this.onChangeProjektoSuma.bind(this);
        this.onChangeNuolaida = this.onChangeNuolaida.bind(this);
        this.onChangeBusena = this.onChangeBusena.bind(this);

        this.state = {
            aprasymas: '',
            pavadinimas: '',
            kontaktas: '',
            projektoSuma: 0,
            nuolaida: 0,
            busena: 'Pradėtas'
        }
    }

    onChangeAprasymas(e) {
        this.setState({
            aprasymas: e.target.value
        })
    }

    onChangePavadinimas(e) {
        this.setState({
            pavadinimas: e.target.value
        })
    }

    onChangeKontaktas(e) {
        this.setState({
            kontaktas: e.target.value
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
            pavadinimas: this.state.pavadinimas,
            kontaktas: this.state.kontaktas,
            projektoSuma: this.state.projektoSuma,
            nuolaida: this.state.nuolaida,
            busena: this.state.busena
        }

        console.log(projektas);

        axios.post('http://localhost:5000/projects/add', projektas)
            .then(res => console.log(res.data));

        this.setState({
            aprasymas: '',
            pavadinimas: '',
            kontaktas: '',
            projektoSuma: 0,
            nuolaida: 0,
            busena: 'Pradėtas'
        })
    }

    render() {
        return (
            <div>
                <h3>Create New Project</h3>
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
                        <label>Aprašymas: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.aprasymas}
                            onChange={this.onChangeAprasymas}
                        />
                    </div>
                    <div className="form-group">
                        <label>Kontaktas: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.kontaktas}
                            onChange={this.onChangeKontaktas}
                        />
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
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.busena}
                            onChange={this.onChangeBusena}>
                                <option value="Pradėtas">Pradėtas</option>
                                <option value="Vykdomas">Vykdomas</option>
                                <option value="Pabaigtas">Pabaigtas</option>
                            </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Project" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}