import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button } from 'react-bootstrap';

export default class CreateTasks extends Component {
    constructor(props) {
        super(props);
        this.onChangeSubjektas = this.onChangeSubjektas.bind(this);
        this.onChangePradziosData = this.onChangePradziosData.bind(this);
        this.onChangeSkirta = this.onChangeSkirta.bind(this);
        this.onChangeAtlieka = this.onChangeAtlieka.bind(this);
        this.onChangePabaigosData = this.onChangePabaigosData.bind(this);
        this.onChangeKomentaras = this.onChangeKomentaras.bind(this);
        this.onChangeKomentaruSarasas = this.onChangeKomentaruSarasas.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            subjektas: '',
            pradziosData: new Date(),
            skirta: '',
            atlieka: '',
            pabaigosData: new Date(),
            komentaras: '',
            komentaruSarasas: '',
            //date: new Date(), pataisyti
            projektai: [],
            ProjectId: '',
            naudotojai: []
        }
    }

    //su kitais objektais ta padaryti
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

        /*axios.get('http://localhost:5000/users/')//neranda tokio
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

    onChangeSubjektas(e) {
        this.setState({
            subjektas: e.target.value
        })
    }

    onChangePradziosData(pradziosData) {
        this.setState({
            pradziosData: pradziosData
        })
    }

    onChangePabaigosData(pabaigosData) {
        this.setState({
            pabaigosData: pabaigosData
        })
        console.log(this.state.pabaigosData)
    }

    onChangeSkirta(e) {
        this.setState({
            skirta: e.target.value
        })
    }

    onChangeAtlieka(e) {
        this.setState({
            atlieka: e.target.value
        })
    }

    onChangeKomentaras(e) {
        this.setState({
            komentaras: e.target.value
        })
    }

    onChangeKomentaruSarasas(e) {
        this.setState({
            komentaruSarasas: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const uzduotis = {
            subjektas: this.state.subjektas,
            pradziosData: this.state.pradziosData,
            skirta: this.state.skirta,
            atlieka: this.state.atlieka,
            pabaigosData: this.state.pabaigosData,
            komentaras: this.state.komentaras,
            komentaruSarasas: this.state.komentaruSarasas
        }

        console.log(uzduotis);

        axios.post('http://localhost:5000/tasks/addtask', uzduotis)
            .then(res => console.log(res.data));

            setTimeout(window.location = '/main', 2000);//sitaip on save isimamas modalinis langas
       // window.location = '/main';
       
    }

    render() {
        return (
            <Modal {...this.props}>
                <Modal.Header closeButton onClick={this.props.onHide}>
                    <Modal.Title>Sukurti užduotį</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="form-group">
                       <label>Subjektas: </label>
                       <input type="text"
                           required
                           className="form-control"
                           value={this.state.subjektas}
                           onChange={this.onChangeSubjektas}
                       />
                   </div>
                   <div className="form-group">
                       <label>Pradžios data: </label>
                       <div>
                           <DatePicker
                               selected={this.state.pradziosData}
                               onChange={this.onChangePradziosData}
                           />
                       </div>
                   </div>
                   <div className="form-group">
                       <label>Pabaigos data: </label>
                       <div>
                           <DatePicker
                               selected={this.state.pabaigosData}
                               onChange={this.onChangePabaigosData}
                           />
                       </div>
                   </div>
                   <div className="form-group">
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
                  {/*} <div className="form-group">
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
                   <div className="form-group">
                       <label>Komentaras: </label>
                       <input type="text"
                           required
                           className="form-control"
                           value={this.state.komentaras}
                           onChange={this.onChangeKomentaras}
                       />
                   </div>
                   <div className="form-group">
                       <label>Komenarų įrašai: </label>
                       <input type="text"
                           required
                           className="form-control"
                           value={this.state.komentaruSarasas}
                           onChange={this.onChangeKomentaruSarasas}
                       />
                   </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Atsaukti</Button>
                    <Button variant="primary" onClick={this.onSubmit}>Save</Button>
                </Modal.Footer>
            </Modal>

        )
    }
}
