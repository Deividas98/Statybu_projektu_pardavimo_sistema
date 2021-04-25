import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button } from 'react-bootstrap';

export default class CreateAgreements extends Component {
    constructor(props) {
        super(props);
        this.onChangePavadinimas = this.onChangePavadinimas.bind(this);
        this.onChangeImone = this.onChangeImone.bind(this);
        this.onChangeSutartiesNumeris = this.onChangeSutartiesNumeris.bind(this);
        this.onChangeTipas = this.onChangeTipas.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pavadinimas: '',
            imone: '',
            sutartiesNumeris: '',
            tipas: '',
            //date: new Date(), pataisyti
            projektai: [],
            ProjectId: ''
        }
    }

    //su kitais objektais ta padaryti
    componentDidMount() {
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

        axios.get('http://localhost:5000/accounts/')//neranda tokio
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

    onChangePavadinimas(e) {
        this.setState({
            pavadinimas: e.target.value
        })
    }

    onChangeImone(e) {
        this.setState({
            imone: e.target.value
        })
    }

    onChangeSutartiesNumeris(e) {
        this.setState({
            sutartiesNumeris: e.target.value
        })
    }

    onChangeTipas(e) {
        this.setState({
            tipas: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const sutartis = {
            pavadinimas: this.state.pavadinimas,
            imone: this.state.imone,
            sutartiesNumeris: this.state.sutartiesNumeris,
            tipas: this.state.tipas
        }

        console.log(sutartis);

        axios.post('http://localhost:5000/agreements/addagr', sutartis)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <Modal {...this.props}>
            <Modal.Header closeButton onClick={this.props.onHide}>
                <Modal.Title>Pridėti įmonę</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div className="form-group">
                        <label>Pavadinimas: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.pavadinimas}
                            onChange={this.onChangePavadinimas}
                        />
                    </div>
                   {/* <div className="form-group">
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
                        </div>*/}
                    <div className="form-group">
                        <label>Sutarties numeris: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.sutartiesNumeris}
                            onChange={this.onChangeSutartiesNumeris}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tipas: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.tipas}
                            onChange={this.onChangeTipas}
                        />
                    </div>

                   {/*} <div className="form-group">
                        <label>Skirta: </label>
                        <select //ref="userInput"
                            required
                            className="form-control"
                            value={this.state.projektas}
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
                    </div>
                    <div className="form-group">
                        <label>Atlieka: </label>
                        <select //ref="userInput"
                            required
                            className="form-control"
                            value={this.state.naudotojas}
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