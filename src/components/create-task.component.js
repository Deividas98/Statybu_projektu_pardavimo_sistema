import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button, Alert, Row, Col } from 'react-bootstrap';

export default class CreateTasks extends Component {
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
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            tema: '',
            pradziosData: new Date(),
            skirta: '',
            atlieka: '',
            pabaigosData: new Date(),
            komentaras: '',
            komentaruSarasas: '',
            projektai: [],
            naudotojai: [],
            visibleAlert: false,
            statusas: ""
        }
    }

    componentDidMount() {
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

    onChangeStatusas(e) {
        this.setState({ statusas: e.target.value })
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
            statusas: this.state.statusas
        }

        console.log(uzduotis);

        axios.post('http://localhost:5000/tasks/addtask', uzduotis)
            .then(res => console.log(res.data));

        // setTimeout(window.location = '/main', 2000);//sitaip on save isimamas modalinis langas
        // window.location = '/main';
        this.setState({ visibleAlert: true })
        setTimeout(() => { this.setState({ visibleAlert: false }) }, 3000);
    }

    render() {
        return (
            <Modal {...this.props}>
                <Alert show={this.state.visibleAlert} variant="success" dismissible>Sutartis sėkmingai sukurta!</Alert>
                <Modal.Header closeButton onClick={this.props.onHide}>
                    <Modal.Title>Pridėti užduotį</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Tema: </label>
                    <input type="text" required className="form-control" value={this.state.tema} onChange={this.onChangeTema} />
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
                                <DatePicker className="form-control" selected={this.state.pabaigosData}
                                    onChange={this.onChangePabaigosData} />
                            </div>
                        </Col>
                    </Row>
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

                    <label>Atlieka: </label>
                    <select required className="form-control" value={this.state.naudotojas} onChange={this.onChangeAtlieka}>
                        {
                            this.state.naudotojai.map(function ([_id, username]) {
                                return <option
                                    key={_id}
                                    value={_id}>{username}
                                </option>;
                            })
                        }
                    </select>

                    <label>Komentaras: </label>
                    <textarea className="form-control" value={this.state.komentaras} onChange={this.onChangeKomentaras} />

                    <label>Statusas: </label>
                    <select required className="form-control" value={this.state.statusas} onChange={this.onChangeStatusas}>
                        <option value="Atvira">Atvira</option>
                        <option value="Atlikta">Atlikta</option>
                        <option value="Uždaryta">Uždaryta</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Atšaukti</Button>
                    <Button variant="primary" onClick={this.onSubmit}>Išsaugoti</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
