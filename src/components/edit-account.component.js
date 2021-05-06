import React, { Component } from 'react';
import axios from 'axios';
import {Button, Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Salys } from './countries.component';


const Agreement = props => (
    <tr>
      <td>{props.agreement.pavadinimas}</td>
      <td>{props.agreement.sutartiesNumeris}</td>
      <td>{props.agreement.tipas}</td>
      <td>
        <Link to={"/editagr/"+props.agreement._id}>Redaguoti</Link> | <Button onClick={() => { props.deleteAgreement(props.agreement._id) }}>Ištrinti</Button>
      </td>
    </tr>
  )

  const Project = props => (
    <tr>
      <td>{props.project.pavadinimas}</td>
      <td>{props.project.aprasymas}</td>
      <td>{props.project.projektoSuma}</td>
      <td>{props.project.nuolaida}</td>
      <td>{props.project.busena}</td>
  
      <td>
        <Link to={"/editprj/"+props.project._id}>Redaguoti</Link> | <Button onClick={() => { props.deleteProject(props.project._id) }}>Ištrinti</Button>
      </td>
    </tr>
  )

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
            lojalumas: '',
            projektai: [],
            ProjectId: '',
            agreements: [],
            projects: [],
            visibleAlert: false
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
                    svetaine: response.data.svetaine,
                    lojalumas: response.data.lojalumas
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

            axios.get('http://localhost:5000/agreements/accagr/' + this.props.match.params.id)
            .then(response => {
              this.setState({ agreements: response.data })
              //console.log(this.state.products);
            })
            .catch((error) => {
              console.log(error);
            })

            axios.get('http://localhost:5000/projects/projagr/' + this.props.match.params.id)
      .then(response => {
        this.setState({ projects: response.data })
        //console.log(this.state.products);
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

    onChangeLojalumas(e) {
        this.setState({
            lojalumas: e.target.value
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
            svetaine: this.state.svetaine,
            lojalumas: this.state.lojalumas
        }

        console.log(imone);

        axios.post('http://localhost:5000/accounts/updateacc/' + this.props.match.params.id, imone)
            .then(res => console.log(res.data));

       // window.location = '/';
       this.setState({ visibleAlert: true })
        setTimeout(() => { this.setState({ visibleAlert: false }) }, 3000);
    }

    agreementList() {
        //console.log(this.state.agreements.projektas);//projektas???
        return this.state.agreements.map(currentagreement => {
          return <Agreement agreement={currentagreement} deleteAgreement={this.deleteAgreement} key={currentagreement._id}/>;
        })
      }

      projectList() {
        //console.log(this.state.projects.projektas);
        return this.state.projects.map(currentproject => {
          return <Project project={currentproject} deleteProject={this.deleteProject} key={currentproject._id}/>;
        })
      }

    render() {
        return (
            <div>
                <Alert show={this.state.visibleAlert} variant="success" dismissible>Įmonė sėkmingai atnaujinta!</Alert>
                <h3>Atnaujinti įmonę</h3>
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
                        <select required className="form-control"
                            value={this.state.salis}
                            onChange={this.onChangeSalis}>
                            {
                                Salys.map((salis, i) => {
                                    return <option key={i} value={salis}>{salis}</option>;
                                })
                            }
                        </select>
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
                    <div className="form-group">
                        <label>Lojalumas: </label>
                        <select //ref="userInput"
                            required
                            className="form-control"
                            value={this.state.lojalumas}
                            onChange={this.onChangeLojalumas}>
                            <option value="Pasirinkti">Pasirinkti</option>
                            <option value="Bronza">Bronza</option>
                            <option value="Sidabras">Sidabras</option>
                            <option value="Auksas">Auksas</option>
                        </select>
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
                <p></p>
                <p></p>
                <h3>Susijusios sutartys</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Pavadinimas</th>
              <th>Sutarties numeris</th>
              <th>Tipas</th>
            </tr>
          </thead>
          <tbody>
            { this.agreementList() }
          </tbody>
        </table>
        <p></p>
        <p></p>
        <h3>Susiję projektai</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Pavadinimas</th>
              <th>Aprašymas</th>
              <th>Projekto suma</th>
              <th>Nuolaida</th>
              <th>Būsena</th>
            </tr>
          </thead>
          <tbody>
            { this.projectList() }
          </tbody>
        </table>
            </div>
        )
    }
}