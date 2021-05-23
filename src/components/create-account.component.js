import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Alert, Row, Col } from 'react-bootstrap';
import { Salys } from './countries.component';

console.log(Salys);
export default class CreateAccounts extends Component {
    constructor(props) {
        super(props);
        this.onChangePavadinimas = this.onChangePavadinimas.bind(this);
        this.onChangeSalis = this.onChangeSalis.bind(this);
        this.onChangeAdresas = this.onChangeAdresas.bind(this);
        this.onChangeTelefonoNr = this.onChangeTelefonoNr.bind(this);
        this.onChangeElPastas = this.onChangeElPastas.bind(this);
        this.onChangeKontaktinisAsmuo = this.onChangeKontaktinisAsmuo.bind(this);
        this.onChangeSvetaine = this.onChangeSvetaine.bind(this);
        this.onChangeLojalumas = this.onChangeLojalumas.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pavadinimas: '',
            salis: '',
            adresas: '',
            telefonoNr: '',
            elPastas: '',
            kontaktinisAsmuo: '',
            svetaine: '',
            lojalumas: 'Pasirinkti',
            visibleAlert: false
        }
    }

    onChangePavadinimas(e) {
        this.setState({ pavadinimas: e.target.value })
    }

    onChangeSalis(e) {
        this.setState({ salis: e.target.value })
    }

    onChangeAdresas(e) {
        this.setState({ adresas: e.target.value })
    }

    onChangeTelefonoNr(e) {
        this.setState({ telefonoNr: e.target.value })
    }

    onChangeElPastas(e) {
        this.setState({ elPastas: e.target.value })
    }

    onChangeKontaktinisAsmuo(e) {
        this.setState({ kontaktinisAsmuo: e.target.value })
    }

    onChangeSvetaine(e) {
        this.setState({ svetaine: e.target.value })
    }

    onChangeLojalumas(e) {
        this.setState({ lojalumas: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const imone = {
            pavadinimas: this.state.pavadinimas,
            salis: this.state.salis,
            adresas: this.state.adresas,
            telefonoNr: this.state.telefonoNr,
            elPastas: this.state.elPastas,
            kontaktinisAsmuo: this.state.kontaktinisAsmuo,
            svetaine: this.state.svetaine,
            lojalumas: this.state.lojalumas
        }

        console.log(imone);

        axios.post('http://localhost:5000/accounts/addacc', imone)
            .then(res => console.log(res.data));

        //setTimeout(window.location = '/main', 2000);//sitaip on save isimamas modalinis langas
        this.setState({ visibleAlert: true })
        setTimeout(() => { this.setState({ visibleAlert: false }) }, 3000);
    }

    render() {
        return (
            <Modal {...this.props}>
                <Alert show={this.state.visibleAlert} variant="success" dismissible>Įmonė sėkmingai sukurta!</Alert>
                <Modal.Header closeButton onClick={this.props.onHide}>
                    <Modal.Title>Pridėti įmonę</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <label>Pavadinimas: </label>
                    <input type="text" required className="form-control" value={this.state.pavadinimas}
                        onChange={this.onChangePavadinimas} />

                    <Row>
                        <Col>
                            <label>Šalis: </label>
                            <select required className="form-control" value={this.state.salis}
                                onChange={this.onChangeSalis}>
                                {
                                    Salys.map((salis, i) => {
                                        return <option key={i} value={salis}>{salis}</option>;
                                    })
                                }
                            </select>
                        </Col>
                        <Col>
                            <label>Telefono Numeris: </label>
                            <input type="text" required className="form-control" value={this.state.telefonoNr}
                                onChange={this.onChangeTelefonoNr} />
                        </Col>
                    </Row>
                    <label>Adresas: </label>
                    <input type="text" required className="form-control" value={this.state.adresas}
                        onChange={this.onChangeAdresas} />
                    <Row>
                        <Col>
                            <label>Elektroninis Paštas: </label>
                            <input type="text" required className="form-control" value={this.state.elPastas}
                                onChange={this.onChangeElPastas} />
                        </Col>
                        <Col>
                            <label>Kontaktinis Asmuo: </label>
                            <input type="text" required className="form-control" value={this.state.kontaktinisAsmuo}
                                onChange={this.onChangeKontaktinisAsmuo} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Svetainė: </label>
                            <input type="text" required className="form-control" value={this.state.svetaine}
                                onChange={this.onChangeSvetaine} />
                        </Col>
                        <Col>
                            <label>Lojalumas: </label>
                            <select required className="form-control"
                                value={this.state.lojalumas}
                                onChange={this.onChangeLojalumas}>
                                <option value="Pasirinkti">Pasirinkti</option>
                                <option value="Bronza">Bronza</option>
                                <option value="Sidabras">Sidabras</option>
                                <option value="Auksas">Auksas</option>
                            </select>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Atšaukti</Button>
                    <Button variant="primary" onClick={this.onSubmit}>Išsaugoti</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}