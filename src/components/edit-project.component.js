import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditProject extends Component {
    constructor(props) {
        super(props);
        this.onChangePavadinimas = this.onChangePavadinimas.bind(this);
        this.onChangeAprasymas = this.onChangeAprasymas.bind(this);
        this.onChangeImone = this.onChangeImone.bind(this);
        this.onChangeProjektoSuma = this.onChangeProjektoSuma.bind(this);
        this.onChangeNuolaida = this.onChangeNuolaida.bind(this);
        this.onChangeBusena = this.onChangeBusena.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pavadinimas: '',
            aprasymas: '',
            imone: '',
            projektoSuma: '',
            nuolaida: '',
            busena: '',
            //date: new Date(), pataisyti
            projektai: [],
            ProjectId: ''
        }
    }

    //su kitais objektais ta padaryti
    componentDidMount() {
        axios.get('http://localhost:5000/projects/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          pavadinimas: response.data.pavadinimas,
          aprasymas: response.data.aprasymas,
          imone: response.data.imone,
          projektoSuma: response.data.projektoSuma,
          nuolaida: new Date(response.data.nuolaida),
          busena: response.data.busena,
          //date: new Date(response.data.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      })


        /*axios.get('http://localhost:5000/projects/')
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
            })*/

       /* axios.get('http://localhost:5000/users/')//neranda tokio
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        //projektai: response.data.map(projektas => projektas.pavadinimas),
                        naudotojai: response.data.map(naudotojas => [naudotojas._id, naudotojas.username]),
                        username: response.data[0].username//,
                        //ProjectId: response.data.map(projektas => projektas._id)//isbandyti
                    })
                    console.log(this.state.naudotojai)
                }
            })
            .catch((error) => {
                console.log(error);
            })*/
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

    onChangeImone(e) {
        this.setState({
            imone: e.target.value
        })
    }

    onChangeProjektoSuma(e) {
        this.setState({
            suma: e.target.value
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

    onSubmit = (e) => {
        e.preventDefault();

        const projektas = {
            pavadinimas: this.state.pavadinimas,
            aprasymas: this.state.aprasymas,
            imone: this.state.imone,
            projektoSuma: this.state.projektoSuma,
            nuolaida: this.state.nuolaida,
            busena: this.state.busena
        }

        console.log(projektas);

        axios.post('http://localhost:5000/projects/updateprj/' + this.props.match.params.id, projektas)
            .then(res => console.log(res.data));

        window.location = '/main';//!!!
    }

    render() {
        return (
            <div>
                <h3>Atnaujinti projektą</h3>
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
                    <div className="form-group">
                        <input type="submit" value="Redaguojama užduotis" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}