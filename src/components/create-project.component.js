import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Alert, ProgressBar } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeAprasymas = this.onChangeAprasymas.bind(this);
        this.onChangePavadinimas = this.onChangePavadinimas.bind(this);
        this.onChangeImone = this.onChangeImone.bind(this);
        //this.onChangeProjektoSuma = this.onChangeProjektoSuma.bind(this);
        //this.onChangeNuolaida = this.onChangeNuolaida.bind(this);
        this.onChangeBusena = this.onChangeBusena.bind(this);
        this.onChangePradziosData = this.onChangePradziosData.bind(this);
        this.onChangePabaigosData = this.onChangePabaigosData.bind(this);

        this.state = {
            aprasymas: '',
            prjPavadinimas: '',
            imone: '',
            //projektoSuma: 0,
            //nuolaida: 0,
            busena: 'Pradėtas',
            imones: [],
            pavadinimas: '',
            visibleAlert: false,
            pradziosData: new Date(),
            pabaigosData: new Date()
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/accounts/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              imones: response.data.map(imone => [imone._id, imone.pavadinimas]),
              pavadinimas: response.data[0].pavadinimas
            })
            console.log(this.state.imones)
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    onChangeAprasymas(e) {
        this.setState({aprasymas: e.target.value})
    }

    onChangePavadinimas(e) {
        this.setState({prjPavadinimas: e.target.value})
    }

    onChangeImone(e) {
        this.setState({imone: e.target.value})
    }

    // onChangeProjektoSuma(e) {
    //     this.setState({projektoSuma: e.target.value})
    // }

    // onChangeNuolaida(e) {
    //     this.setState({nuolaida: e.target.value})
    // }

    onChangeBusena(e) {
        this.setState({busena: e.target.value})
    }

    onChangePradziosData(pradziosData) {
        this.setState({ pradziosData: pradziosData })
    }

    onChangePabaigosData(pabaigosData) {
        this.setState({ pabaigosData: pabaigosData })
    }

    onSubmit(e) {
        e.preventDefault();

        const projektas = {
            aprasymas: this.state.aprasymas,
            pavadinimas: this.state.prjPavadinimas,
            imone: this.state.imone,
            //projektoSuma: this.state.projektoSuma,
            //nuolaida: this.state.nuolaida,
            busena: this.state.busena,
            pradziosData: this.state.pradziosData,
            pabaigosData: this.state.pabaigosData
        }

        console.log(projektas);

        axios.post('http://localhost:5000/projects/add', projektas)
            .then(res => console.log(res.data));

        // this.setState({//KAM TAI????
        //     aprasymas: '',
        //     prjPavadinimas: '',
        //     imone: '',
        //     projektoSuma: 0,
        //     nuolaida: 0,
        //     busena: 'Pradėtas'
        // })

        this.setState({ visibleAlert: true })
        setTimeout(() => { this.setState({ visibleAlert: false }) }, 3000);
    }

    render() {
                //DAR PEKEISTI BUSENAS!!!!
                let progress = 0;
                if(this.state.busena === "Pradėtas") progress = 33
                else if(this.state.busena === "Vykdomas") progress = 67
                else if(this.state.busena === "Pabaigtas") progress = 100
        return (
            <Modal {...this.props}>
            <Alert show={this.state.visibleAlert} variant="success" dismissible>Projektas sėkmingai sukurtas!</Alert>
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
                    {/* <div className="form-group">
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
                    </div> */}
                    <div className="form-group">
                        <label>Pradžios data: </label>
                        <div>
                            <DatePicker
                                selected={this.state.pradziosData}
                                onChange={this.onChangePradziosData} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Pabaigos data: </label>
                        <div>
                            <DatePicker
                                selected={this.state.pabaigosData}
                                onChange={this.onChangePabaigosData} />
                        </div>
                    </div>
                    {/* <ProgressBar striped now={now} label={`${now}%`}/> */}
                    <div className="form-group">
                        <label>Būsena: </label>
                        <ProgressBar striped now={progress} label={this.state.busena}/>
                        <br></br>
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