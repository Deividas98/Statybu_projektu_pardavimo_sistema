import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

export default class UpdateAgreement extends Component {
    constructor(props) {
        super(props);
        this.onChangePavadinimas = this.onChangePavadinimas.bind(this);
        this.onChangeImone = this.onChangeImone.bind(this);
        this.onChangeProjektas = this.onChangeProjektas.bind(this);
        this.onChangeSutartiesNumeris = this.onChangeSutartiesNumeris.bind(this);
        this.onChangeTipas = this.onChangeTipas.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            agrPavadinimas: '',
            sutartiesNumeris: '',
            tipas: '',
            projektai: [],
            imones: [],
            visibleAlert: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/agreements/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    agrPavadinimas: response.data.pavadinimas,
                    imone: response.data.imone,
                    sutartiesNumeris: response.data.sutartiesNumeris,
                    projektas: response.data.projektas,
                    tipas: response.data.tipas
                })
            })
            .catch(function (error) {
                console.log(error);
            })


        axios.get('http://localhost:5000/projects/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        projektai: response.data.map(projektas => [projektas._id, projektas.pavadinimas])
                        //pavadinimas: response.data[0].pavadinimas
                    })
                    // console.log(this.state.projektai)
                }
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/accounts/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        imones: response.data.map(imone => [imone._id, imone.pavadinimas])
                        //pavadinimas: response.data[0].pavadinimas
                    })
                    //  console.log(this.state.imones)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangePavadinimas(e) {
        this.setState({ agrPavadinimas: e.target.value })
    }

    onChangeImone(e) {
        this.setState({ imone: e.target.value })
    }

    onChangeProjektas(e) {
        this.setState({ projektas: e.target.value })
    }

    onChangeSutartiesNumeris(e) {
        this.setState({ sutartiesNumeris: e.target.value })
    }

    onChangeTipas(e) {
        this.setState({ tipas: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const sutartis = {
            pavadinimas: this.state.agrPavadinimas,
            imone: this.state.imone,
            projektas: this.state.projektas,
            sutartiesNumeris: this.state.sutartiesNumeris,
            tipas: this.state.tipas
        }

        console.log(sutartis);

        axios.post('http://localhost:5000/agreements/updateagr/' + this.props.match.params.id, sutartis)
            .then(res => console.log(res.data));

        // window.location = '/';

        this.setState({ visibleAlert: true })
        setTimeout(() => { this.setState({ visibleAlert: false }) }, 3000);
    }

    render() {
        return (
            <div>
                <Alert show={this.state.visibleAlert} variant="success" dismissible>Sutartis sėkmingai atnaujinta!</Alert>
                <h3>Redaguoti sutartį</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Pavadinimas: </label>
                        <input type="text" required className="form-control" value={this.state.agrPavadinimas} onChange={this.onChangePavadinimas}
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
                                this.state.imones.map(function ([_id, pavadinimas]) {
                                    return <option
                                        key={_id}
                                        value={_id}>{pavadinimas}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Projektas: </label>
                        <select //ref="userInput"
                            required
                            className="form-control"
                            value={this.state.projektas}
                            onChange={this.onChangeProjektas}>
                            {
                                this.state.projektai.map(function ([_id, pavadinimas]) {
                                    return <option
                                        key={_id}
                                        value={_id}>{pavadinimas}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Sutarties numeris: </label>
                        <input type="text" required className="form-control" value={this.state.sutartiesNumeris} onChange={this.onChangeSutartiesNumeris}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tipas: </label>
                        <input type="text" required className="form-control" value={this.state.tipas} onChange={this.onChangeTipas}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Atnaujinti sutartį" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}