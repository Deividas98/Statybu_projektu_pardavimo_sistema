import React, { Component } from 'react';
import axios from 'axios';
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

export default class EditAccount extends Component {
    constructor(props) {
        super(props);
        this.onChangePavadinimas = this.onChangePavadinimas.bind(this);
        this.onChangeSalis = this.onChangeSalis.bind(this);
        this.onChangeAdresas = this.onChangeAdresas.bind(this);
        this.onChangeTelefonoNr = this.onChangeTelefonoNr.bind(this);
        this.onChangeElPastas = this.onChangeElPastas.bind(this);
        this.onChangeKontaktinisAsmuo = this.onChangeKontaktinisAsmuo.bind(this);
        this.onChangeSvetaine = this.onChangeSvetaine.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pavadinimas: '',
            salis: new Date(),
            adresas: '',
            telefonoNr: '',
            elPastas: new Date(),
            kontaktinisAsmuo: '',
            svetaine: '',
            //date: new Date(), pataisyti
            projektai: [],
            ProjectId: ''
        }
    }

    //su kitais objektais ta padaryti
    componentDidMount() {
        axios.get('http://localhost:5000/accounts/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    pavadinimas: response.data.pavadinimas,
                    salis: response.data.salis,
                    adresas: response.data.adresas,
                    telefonoNr: response.data.telefonoNr,
                    elPastas: response.data.elPastas,
                    kontaktinisAsmuo: response.data.kontaktinisAsmuo,
                    svetaine: response.data.svetaine
                    //date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })


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

        axios.get('http://localhost:5000/users/')//neranda tokio
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
            })
    }

    onChangePavadinimas(e) {
        this.setState({
            pavadinimas: e.target.value
        })
    }

    onChangeSalis(e) {
        this.setState({
            salis: e.target.value
        })
    }

    onChangeAdresas(e) {
        this.setState({
            adresas: e.target.value
        })
    }

    onChangeTelefonoNr(e) {
        this.setState({
            telefonoNr: e.target.value
        })
    }

    onChangeElPastas(e) {
        this.setState({
            elPastas: e.target.value
        })
    }

    onChangeKontaktinisAsmuo(e) {
        this.setState({
            kontaktinisAsmuo: e.target.value
        })
    }

    onChangeSvetaine(e) {
        this.setState({
            svetaine: e.target.value
        })
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
            svetaine: this.state.svetaine
        }

        console.log(imone);

        axios.post('http://localhost:5000/accounts/updateacc/' + this.props.match.params.id, imone)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Sukurti Naują užduotį</h3>
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
                        <label>Šalis: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.salis}
                            onChange={this.onChangeSalis}
                        />
                    </div>
                    <div className="form-group">
                        <label>Adresas: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.adresas}
                            onChange={this.onChangeAdresas}
                        />
                    </div>
                    <div className="form-group">
                        <label>Telefono Numeris: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.telefonoNr}
                            onChange={this.onChangeTelefonoNr}
                        />
                    </div>
                    <div className="form-group">
                        <label>Elektroninis Paštas: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.elPastas}
                            onChange={this.onChangeElPastas}
                        />
                    </div>
                    <div className="form-group">
                        <label>Kontaktinis Asmuo: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.kontaktinisAsmuo}
                            onChange={this.onChangeKontaktinisAsmuo}
                        />
                    </div>
                    <div className="form-group">
                        <label>Svetainė: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.svetaine}
                            onChange={this.onChangeSvetaine}
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

                    <div className="form-group">
                        <input type="submit" value="Atnaujinta įmonė" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}