import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Timer from './timer.component';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import '../App.css';

export default class EditTask extends Component {
    constructor(props) {
        super(props);
        this.onChangeTema = this.onChangeTema.bind(this);
        this.onChangePradziosData = this.onChangePradziosData.bind(this);
        this.onChangeSkirta = this.onChangeSkirta.bind(this);
        this.onChangeAtlieka = this.onChangeAtlieka.bind(this);
        this.onChangePabaigosData = this.onChangePabaigosData.bind(this);
        this.onChangeKomentaras = this.onChangeKomentaras.bind(this);
        this.onChangeKomentaruSarasas = this.onChangeKomentaruSarasas.bind(this);
        this.onChangeStatusas = this.onChangeStatusas.bind(this);

        this.onChangeLaikas = this.onChangeLaikas.bind(this);
        this.showtimer = this.showtimer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            subjektas: '',
            pradziosData: new Date(),
            skirta: '',
            atlieka: '',
            pabaigosData: new Date(),
            komentaras: '',
            komentaruSarasas: '',
            projektai: [],
            naudotojai: [],
            visibleAlert: false,
            statusas: "",

            laikas: new Date(),
            showTimer: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/tasks/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    tema: response.data.tema,
                    pradziosData: new Date(response.data.pradziosData),
                    skirta: response.data.skirta,
                    atlieka: response.data.atlieka,
                    pabaigosData: new Date(response.data.pabaigosData),
                    komentaras: response.data.komentaras,
                    komentaruSarasas: response.data.komentaruSarasas,
                    laikas: new Date(response.data.laikas),
                    statusas: response.data.statusas
                })
                console.log(response.data.laikas)
            })
            .catch(function (error) {
                console.log(error);
            })


        axios.get('http://localhost:5000/projects/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        projektai: response.data.map(projektas => [projektas._id, projektas.pavadinimas]),
                        pavadinimas: response.data[0].pavadinimas
                    })
                    //console.log(this.state.projektai)
                }
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        naudotojai: response.data.map(naudotojas => [naudotojas._id, naudotojas.username])
                    })
                    console.log(this.state.naudotojai)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeTema(e) {
        this.setState({ tema: e.target.value })
    }

    onChangePradziosData(pradziosData) {
        this.setState({ pradziosData: pradziosData })
    }

    onChangePabaigosData(pabaigosData) {
        this.setState({ pabaigosData: pabaigosData })
    }

    onChangeSkirta(e) {
        this.setState({ skirta: e.target.value })
    }

    onChangeAtlieka(e) {
        this.setState({ atlieka: e.target.value })
    }

    onChangeKomentaras(e) {
        this.setState({ komentaras: e.target.value })
    }

    onChangeKomentaruSarasas(e) {
        this.setState({ komentaruSarasas: e.target.value })
    }

    onChangeLaikas(e) {
        this.setState({ laikas: e.target.value })
    }

    onChangeStatusas(e) {
        this.setState({ statusas: e.target.value })
    }

    handleCallback = (childData) => {
        this.setState({ laikas: childData })
    }

    showtimer() {
        this.setState({
            showTimer: true
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const uzduotis = {
            tema: this.state.tema,
            pradziosData: this.state.pradziosData,
            skirta: this.state.skirta,
            atlieka: this.state.atlieka,
            pabaigosData: this.state.pabaigosData,
            komentaras: this.state.komentaras,
            komentaruSarasas: this.state.komentaruSarasas,
            laikas: this.state.laikas,
            statusas: this.state.statusas
        }
        //console.log(uzduotis);

        axios.post('http://localhost:5000/tasks/updatetask/' + this.props.match.params.id, uzduotis)
            .then(res => console.log(res.data));

        // window.location = '/main';//!!!
        this.setState({ visibleAlert: true })
        setTimeout(() => { this.setState({ visibleAlert: false }) }, 3000);
    }

    render() {
        return (
            <div>
                <Alert show={this.state.visibleAlert} variant="success" dismissible>Užduotis sėkmingai atnaujinta!</Alert>
                <h3>Redaguoti užduotį</h3>
                <form className='form-tab' onSubmit={this.onSubmit}>
                    <Row>
                        <Col>
                            <label>Tema: </label>
                            <input type="text" required className="form-control" value={this.state.tema}
                                onChange={this.onChangeTema} />
                        </Col>
                        <Col>
                            <label>Skirta: </label>
                            <select required className="form-control" value={this.state.projektas}
                                onChange={this.onChangeSkirta}>
                                {
                                    this.state.projektai.map(function ([_id, pavadinimas]) {
                                        return <option
                                            key={_id}
                                            value={_id}>{pavadinimas}
                                        </option>;
                                    })
                                }
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Pradžios data: </label>
                            <div>
                                <DatePicker className="form-control"
                                    selected={this.state.pradziosData}
                                    onChange={this.onChangePradziosData} />
                            </div>
                        </Col>
                        <Col>
                            <label>Pabaigos data: </label>
                            <div>
                                <DatePicker className="form-control"
                                    selected={this.state.pabaigosData}
                                    onChange={this.onChangePabaigosData} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Atlieka: </label>
                            <select required className="form-control" value={this.state.naudotojas}
                                onChange={this.onChangeAtlieka}>
                                {
                                    this.state.naudotojai.map(function ([_id, username]) {
                                        return <option
                                            key={_id}
                                            value={_id}>{username}
                                        </option>;
                                    })
                                }
                            </select>
                        </Col>
                        <Col>
                            <label>Statusas: </label>
                            <select required className="form-control" value={this.state.statusas} onChange={this.onChangeStatusas}>
                                <option value="Atvira">Atvira</option>
                                <option value="Atlikta">Atlikta</option>
                                <option value="Uždaryta">Uždaryta</option>
                            </select>
                        </Col>
                    </Row>

                    <div className="form-group">
                        <label>Komentaras: </label>
                        <textarea className="form-control" value={this.state.komentaras} onChange={this.onChangeKomentaras} />
                    </div>

                    {/* <div className="form-group">
                        <label>Komenarų įrašai: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.komentaruSarasas}
                            onChange={this.onChangeKomentaruSarasas}
                        />
                    </div> */}

                    {this.state.showTimer === true ? <Timer laikas2={this.state.laikas} parentCallback={this.handleCallback} /> :
                        <Button onClick={this.showtimer} >Išskleisti laikrodį</Button>}

                    {/* <div>{Date.parse(this.state.laikas)}</div> */}
                    {/* onLaikas1Changed={this.onChangeLaikas} */}

                    <div className="form-group">
                        <input type="submit" value="Išsaugoti" style={{ margin: "10px" }} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}