import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Timer from './timer.component';

export default class EditTask extends Component {
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
            ProjectId: ''
        }
    }

    //su kitais objektais ta padaryti
    componentDidMount() {
        axios.get('http://localhost:5000/tasks/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          subjektas: response.data.subjektas,
          pradziosData: new Date(response.data.pradziosData),
          skirta: response.data.skirta,
          atlieka: response.data.atlieka,
          pabaigosData: new Date(response.data.pabaigosData),
          komentaras: response.data.komentaras,
          komentaruSarasas: response.data.komentaruSarasas
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

        axios.post('http://localhost:5000/tasks/updatetask/' + this.props.match.params.id, uzduotis)
            .then(res => console.log(res.data));

        window.location = '/main';//!!!
    }

    render() {
        return (
            <div>
                <h3>Sukurti Naują užduotį</h3>
                <form onSubmit={this.onSubmit}>
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
                    <Timer/>

                    <div className="form-group">
                        <input type="submit" value="Redaguojama užduotis" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}