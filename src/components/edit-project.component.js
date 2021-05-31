import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, Alert, ProgressBar, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = props => (
  <tr>
    <td>{props.product.pavadinimas}</td>
    <td>{props.product.aprasymas}</td>
    <td>{props.product.suma}</td>
    <td>{props.product.kiekis}</td>
    <td>{props.product.kaina}</td>
    <td>
      <Link to={"/edit/" + props.product._id}>Redaguoti</Link> | <Button variant="danger" onClick={() => { props.deleteProduct(props.product._id) }}>Ištrinti</Button>
    </td>
  </tr>
)

const Task = props => (
  <tr>
    <td>{props.task.subjektas}</td>
    <td>{props.task.pradziosData}</td>
    <td>{props.task.skirta}</td>
    <td>{props.task.pabaigosData}</td>
    <td>{props.task.komentaras}</td>
    <td>
      <Link to={"/edittask/" + props.task._id}>Redaguoti</Link> | <Button variant="danger" onClick={() => { props.deleteTask(props.task._id) }}>Ištrinti</Button>
    </td>
  </tr>
)

const Forecast = props => (
  <tr>
    <td>{props.forecast.periodoPradzia}</td>
    <td>{props.forecast.periodoPabaiga}</td>
    <td>{props.forecast.isdalintaSuma}</td>
  </tr>
)

export default class EditProject extends Component {
  constructor(props) {
    super(props);
    this.onChangePavadinimas = this.onChangePavadinimas.bind(this);
    this.onChangeAprasymas = this.onChangeAprasymas.bind(this);
    this.onChangeImone = this.onChangeImone.bind(this);
    this.onChangeBusena = this.onChangeBusena.bind(this);
    this.onChangePradziosData = this.onChangePradziosData.bind(this);
    this.onChangePabaigosData = this.onChangePabaigosData.bind(this);
    this.closeProject = this.closeProject.bind(this);
    this.reopenProject = this.reopenProject.bind(this);
    this.onChangeStatusas = this.onChangeStatusas.bind(this);
    this.onChangeResursuKiekis = this.onChangeResursuKiekis.bind(this);
    this.onLockProject = this.onLockProject.bind(this);
    this.onChangePelnasSuNuol = this.onChangePelnasSuNuol.bind(this);

    //this.onChangeGrynPelnasSuNuol = this.onChangeGrynPelnasSuNuol.bind(this);
    //this.onChangeNuolaidaProc = this.onChangeNuolaidaProc.bind(this);
    //this.onChangeGrynPelnasProc = this.onChangeGrynPelnasProc.bind(this);
    //this.onChangeGrynasisPelnas = this.onChangeGrynasisPelnas.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      //nauja
      nuolaidaProc: 0,
      grynasisPelnasProc: 0,
      grynasisPelnas: 0,
      visibleAlert: false,

      projPavadinimas: '',
      aprasymas: '',
      busena: '',
      grynasisPelnasSuNuolaida: 0,
      lojalumas: '',
      pradziosData: new Date(),
      pabaigosData: new Date(),
      projektai: [],
      ProjectId: '',
      tasks: [],
      products: [],
      forecasts: [],
      imones: [],
      closeProject: false,
      statusas: "",
      resursuKiekis: 0, previousResursuKiekis: 0, resKiekis: 0, reikalingasResursuKiekis: 0,
      lockProject: false,
      taskCount: 0,

      apskSuma: 0,
      apskBendrasPlotasm2: 0,
      apskPajamos: 0,
      apskEbitda: 0,
      apskBendrasKiekis: 0,
      apskEbitdaProc: 0,

      laimetaSuma: 0,
      laimetaBendrasPlotasm2: 0,
      laimetaPajamos: 0,
      laimetaEbitda: 0,
      laimetaBendrasKiekis: 0,
      laimetaEbitdaProc: 0,

      pralaimetaSuma: 0,
      pralaimetaBendrasPlotasm2: 0,
      pralaimetaPajamos: 0,
      pralaimetaEbitda: 0,
      pralaimetaBendrasKiekis: 0,
      pralaimetaEbitdaProc: 0,
    }
  }

  //su kitais objektais ta padaryti
  componentDidMount() {
    let nuolaidaNum = 0;
    axios.get('http://localhost:5000/projects/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          projPavadinimas: response.data.pavadinimas,
          aprasymas: response.data.aprasymas,
          imone: response.data.imone,
          busena: response.data.busena,
          statusas: response.data.statusas,
          resursuKiekis: response.data.resursuKiekis,
          previousResursuKiekis: response.data.resursuKiekis,
          reikalingasResursuKiekis: Number(response.data.laimetaBendrasKiekis) / 100,
          pradziosData: new Date(response.data.pradziosData),
          pabaigosData: new Date(response.data.pabaigosData),

          grynasisPelnasSuNuolaida: Number(response.data.grynasisPelnasSuNuolaida),
          nuolaidaProc: Number(response.data.nuolaidaProc),
          grynasisPelnasProc: (Number(response.data.laimetaPajamos) - Number(response.data.laimetaSuma)) / Number(response.data.laimetaPajamos) * 100,
          grynasisPelnas: Number(response.data.laimetaPajamos) - Number(response.data.laimetaSuma),

          apskSuma: response.data.apskSuma,
          apskBendrasPlotasm2: response.data.apskBendrasPlotasm2,
          apskPajamos: response.data.apskPajamos,
          apskEbitda: response.data.apskEbitda,
          apskBendrasKiekis: response.data.apskBendrasKiekis,
          apskEbitdaProc: response.data.apskEbitdaProc,

          laimetaSuma: response.data.laimetaSuma,
          laimetaBendrasPlotasm2: response.data.laimetaBendrasPlotasm2,
          laimetaPajamos: response.data.laimetaPajamos,
          laimetaEbitda: response.data.laimetaEbitda,
          laimetaBendrasKiekis: response.data.laimetaBendrasKiekis,
          laimetaEbitdaProc: response.data.laimetaEbitdaProc,

          pralaimetaSuma: response.data.pralaimetaSuma,
          pralaimetaBendrasPlotasm2: response.data.pralaimetaBendrasPlotasm2,
          pralaimetaPajamos: response.data.pralaimetaPajamos,
          pralaimetaEbitda: response.data.pralaimetaEbitda,
          pralaimetaBendrasKiekis: response.data.pralaimetaBendrasKiekis,
          pralaimetaEbitdaProc: response.data.pralaimetaEbitdaProc,

        });
        return axios.get('http://localhost:5000/accounts/accLoyalty/' + this.state.imone)
          .then(response => {
            if (response.data.lojalumas === 'Bronza') { nuolaidaNum = 0.01 }
            else if (response.data.lojalumas === 'Sidabras') { nuolaidaNum = 0.02 }
            else if (response.data.lojalumas === 'Auksas') { nuolaidaNum = 0.03 }
            this.setState({
              lojalumas: response.data.lojalumas,
              grynasisPelnasSuNuolaida: (this.state.grynasisPelnas - (this.state.grynasisPelnas * nuolaidaNum))
            })
            console.log(response.data.lojalumas + " " + this.state.grynasisPelnasSuNuolaida)  //gauna
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/resources/')
      .then(response => {
        this.setState({ resKiekis: response.data.kiekis })
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:5000/accounts/')//neranda tokio
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

    axios.get('http://localhost:5000/products/projprod/' + this.props.match.params.id)
      .then(response => {
        this.setState({ products: response.data })
        //console.log(this.state.products);
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:5000/tasks/projtask/' + this.props.match.params.id)
      .then(response => {
        this.setState({ tasks: response.data })
        //console.log(this.state.products);
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:5000/forecasts/projfore/' + this.props.match.params.id)
      .then(response => {
        this.setState({ forecasts: response.data })
        //console.log(this.state.products);
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:5000/tasks/sumtasks/' + this.props.match.params.id)
      .then(response => {
        this.setState({ taskCount: response.data })
        console.log("taskai: " + this.state.taskCount);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangePavadinimas(e) {
    this.setState({ projPavadinimas: e.target.value })
  }

  onChangeAprasymas(e) {
    this.setState({ aprasymas: e.target.value })
  }

  onChangeImone(e) {
    this.setState({ imone: e.target.value })
  }

  onChangeBusena(e) {
    this.setState({ busena: e.target.value })
  }

  onChangePradziosData(pradziosData) {
    this.setState({ pradziosData: pradziosData })
  }

  onChangePabaigosData(pabaigosData) {
    this.setState({ pabaigosData: pabaigosData })
  }

  onChangeStatusas(e) {
    this.setState({ statusas: e.target.value })
  }

  onChangeResursuKiekis(e) {
    this.setState({ resursuKiekis: e.target.value })
  }

  onChangePelnasSuNuol(e) {
    this.setState({ resursuKiekis: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();

    //resursu skaiciavimas
    if (this.state.resursuKiekis > this.state.resKiekis) {
      alert("Nepakanka resursų projektui!");
      //this.setState({resursuKiekis: this.state})
      return
    }
    else if (this.state.resursuKiekis <= this.state.resKiekis) {
      if (this.state.previousResursuKiekis < this.state.resursuKiekis) {
        const resursas = { kiekis: Number(this.state.resKiekis) - Number(this.state.resursuKiekis) + Number(this.state.previousResursuKiekis) }
        console.log("resrez: " + this.state.resKiekis + "  " + this.state.resursuKiekis + " " + this.state.previousResursuKiekis);
        console.log(resursas);
        axios.post('http://localhost:5000/resources/minusres', resursas)
          .then(res => console.log(res.data));
      }
      else if (this.state.previousResursuKiekis > this.state.resursuKiekis) {
        const resursas = { kiekis: Number(this.state.resKiekis) - Number(this.state.resursuKiekis) + Number(this.state.previousResursuKiekis) }
        console.log("resrez2");
        console.log(resursas);
        axios.post('http://localhost:5000/resources/plusres', resursas)
          .then(res => console.log(res.data));
      }
      else if (this.state.statusas !== "Atviras") {
        const resursas = { kiekis: Number(this.state.resKiekis) + Number(this.state.resursuKiekis) }
        axios.post('http://localhost:5000/resources/plusres', resursas)
          .then(res => console.log(res.data));

      }
    }

    //resusrsu skaiciavimas
    axios.delete('http://localhost:5000/forecasts/dltfore/' + this.props.match.params.id)
      .then(response => { console.log(response.data) });

    const projektas = {
      pavadinimas: this.state.projPavadinimas,
      aprasymas: this.state.aprasymas,
      imone: this.state.imone,
      busena: this.state.busena,
      pradziosData: this.state.pradziosData,
      pabaigosData: this.state.pabaigosData,
      statusas: this.state.statusas,
      resursuKiekis: this.state.resursuKiekis,
      grynasisPelnasSuNuolaida: this.state.grynasisPelnasSuNuolaida,

      //nuolaidaProc: Number(response.data.nuolaidaProc), nznar reikia
      grynasisPelnasProc: (Number(this.state.laimetaPajamos) - Number(this.state.laimetaSuma)) / Number(this.state.laimetaPajamos) * 100,
      grynasisPelnas: Number(this.state.laimetaPajamos) - Number(this.state.laimetaSuma),
    }
    console.log(projektas);

    // add forecast request
    var lastDay = new Date(this.state.pradziosData.getFullYear(), this.state.pradziosData.getMonth() + 1, 0);
    let number_of_months = this.state.pabaigosData.getMonth() - this.state.pradziosData.getMonth() + (12 * (this.state.pabaigosData.getFullYear() - this.state.pradziosData.getFullYear()));
    var addedMonth = number_of_months + 1;
    //console.log("men " + (number_of_months) + " add: " + addedMonth);
    let isdalintosPajamos = this.state.apskPajamos / addedMonth;
    for (let i = 0; i <= number_of_months; i++) {
      if (i === 0) {
        console.log("PrognozeF: PRD: " + this.state.pradziosData + " PBD: " + lastDay + " isdalinta: " + isdalintosPajamos);
        const prognoze1 = {
          projektas: this.props.match.params.id,
          periodoPradzia: this.state.pradziosData,
          periodoPabaiga: lastDay,
          isdalintaSuma: isdalintosPajamos
        }

        const createForecast1 = async () => {
          try {
            const resp = await axios.post('http://localhost:5000/forecasts/addfore', prognoze1);
            console.log(resp.data);
          } catch (err) {
            console.error(err);
          }
        };
        createForecast1();
      }
      else if (i === (number_of_months)) {
        console.log("PrognozeL: PRD: " + new Date(this.state.pabaigosData.getFullYear(), this.state.pabaigosData.getMonth(), 1) + " PBD: " + this.state.pabaigosData + " isdalinta: " + isdalintosPajamos);
        const prognoze2 = {
          projektas: this.props.match.params.id,
          periodoPradzia: new Date(this.state.pabaigosData.getFullYear(), this.state.pabaigosData.getMonth(), 1),
          periodoPabaiga: this.state.pabaigosData,
          isdalintaSuma: isdalintosPajamos
        }

        const createForecast2 = async () => {
          try {
            const resp = await axios.post('http://localhost:5000/forecasts/addfore', prognoze2);
            console.log(resp.data);
          } catch (err) {
            console.error(err);
          }
        };
        createForecast2();
      }
      else {
        console.log(i + " Prognoze: PRD: " + new Date(this.state.pradziosData.getFullYear(), this.state.pradziosData.getMonth() + i, 1) + " PBD: " + new Date(this.state.pradziosData.getFullYear(), this.state.pradziosData.getMonth() + i + 1, 0) + " isdalinta: " + isdalintosPajamos);
        const prognoze3 = {
          projektas: this.props.match.params.id,
          periodoPradzia: new Date(this.state.pradziosData.getFullYear(), this.state.pradziosData.getMonth() + i, 1),
          periodoPabaiga: new Date(this.state.pradziosData.getFullYear(), this.state.pradziosData.getMonth() + i + 1, 0),
          isdalintaSuma: isdalintosPajamos
        }

        const createForecast3 = async () => {
          try {
            const resp = await axios.post('http://localhost:5000/forecasts/addfore', prognoze3);
            console.log(resp.data);
          } catch (err) {
            console.error(err);
          }
        };
        createForecast3();
      }
    }

    axios.post('http://localhost:5000/projects/updateprj/' + this.props.match.params.id, projektas)
      .then(res => console.log(res.data));

    // window.location = '/main';//!!!
    this.setState({ visibleAlert: true })
    setTimeout(() => { this.setState({ visibleAlert: false }) }, 3000);
  }

  closeProject() {
    //papildyti salygomis:
    //1. kai produktu statusai nera tinkami
    //2. kai yra atidarytu uzduociu 
    if (this.state.reikalingasResursuKiekis > this.state.resursuKiekis) {
      alert("Negalima uždaryti projekto, kai nepakanka išteklių.");
    } else if (this.state.taskCount > 0) {
      alert("Negalima uždaryti projekto, kai ne visos užduotys atliktos.");
    } else
      this.setState({ closeProject: true })
  }

  reopenProject() {
    this.setState({ lockProject: false, statusas: "Atviras" })
  }

  onLockProject() {
    this.setState({ lockProject: true, closeProject: false })
    const projektas = {
      pavadinimas: this.state.projPavadinimas,
      aprasymas: this.state.aprasymas,
      imone: this.state.imone,
      busena: this.state.busena,
      pradziosData: this.state.pradziosData,
      pabaigosData: this.state.pabaigosData,
      statusas: this.state.statusas,
      resursuKiekis: 0,//this.state.resursuKiekis,
      grynasisPelnasSuNuolaida: this.state.grynasisPelnasSuNuolaida,

      //nuolaidaProc: Number(response.data.nuolaidaProc), nznar reikia
      grynasisPelnasProc: (Number(this.state.laimetaPajamos) - Number(this.state.laimetaSuma)) / Number(this.state.laimetaPajamos) * 100,
      grynasisPelnas: Number(this.state.laimetaPajamos) - Number(this.state.laimetaSuma),
    }
    console.log(projektas);
    axios.post('http://localhost:5000/projects/updateprj/' + this.props.match.params.id, projektas)
      .then(res => console.log(res.data));

      const resursas = { kiekis: Number(this.state.resKiekis) + Number(this.state.resursuKiekis) }
        console.log("resrez2");
        console.log(resursas);
        axios.post('http://localhost:5000/resources/plusres', resursas)
          .then(res => console.log(res.data));
  }

  productList() {
    //console.log(this.state.products.projektas);
    return this.state.products.map(currentproduct => {
      return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id} />;
    })
  }

  taskList() {
    //console.log(this.state.tasks.projektas);
    return this.state.tasks.map(currenttask => {
      return <Task task={currenttask} deleteTask={this.deleteTask} key={currenttask._id} />;
    })
  }

  forecastList() {
    return this.state.forecasts.map(currentforecast => {
      return <Forecast forecast={currentforecast} key={currentforecast._id} />;
    })
  }

  render() {
    if (this.state.pradziosData > this.state.pabaigosData) window.alert("Pradžios data negali būti vėlesnė negu pabaigos")
    return (
      <div>
        {/* <div>{this.state.grynasisPelnasSuNuolaida}</div> */}
        <Alert show={this.state.visibleAlert} variant="success" dismissible>Projektas sėkmingai atnaujintas!</Alert>
        <Modal show={this.state.closeProject} >
          <Modal.Header closeButton>
            <Modal.Title>Uždaryti projektą</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>Pasirinkite projekto statusą: </label>
              <select className="form-control"
                value={this.state.statusas} onChange={this.onChangeStatusas}>
                <option value="Laimėtas">Laimėtas</option>
                <option value="Pralaimėtas">Pralaimėtas</option>
                <option value="Atšauktas">Atšauktas</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => this.setState({ closeProject: false })}>Atšaukti</Button>
            <Button variant="primary" onClick={this.onLockProject}>Patvirtinti</Button>
          </Modal.Footer>
        </Modal>

        <span style={{ right: "40%", fontSize: "200%" }}>Redaguoti projektą</span>
        <fieldset disabled={this.state.lockProject}>
          <form className='form-tab' onSubmit={this.onSubmit}>
            <Row>
              <Col>
                <label>Pavadinimas: </label>
                <input type="text" required className="form-control" value={this.state.projPavadinimas} onChange={this.onChangePavadinimas} />
              </Col>
              <Col>
                <label>Grynasis pelnas:</label>
                <div class="input-group mb-3">
                  <input type="text" className="form-control" value={this.state.grynasisPelnas} disabled={true} />
                  <div class="input-group-append"><span class="input-group-text">€</span></div>
                </div>
              </Col>
              <Col>
              <div data-toggle="tooltip" title="Reikalingas 1 keltuvas 100-ui produktų">
                <label>Reikalingas resursų kiekis:</label>
                <input type="text" required className="form-control" value={this.state.reikalingasResursuKiekis} disabled={true} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Įmonė: </label>
                <select ref="userInput"
                  required
                  className="form-control"
                  value={this.state.imone}
                  onChange={this.onChangeImone}>
                  {
                    this.state.imones.map(function ([_id, imone]) {
                      return <option
                        key={_id}
                        value={_id}>{imone}
                      </option>;
                    })
                  }
                </select>
              </Col>
              <Col>
                <label>Grynasis Pelnas, %:</label>
                <div class="input-group mb-3">
                  <input type="text" className="form-control" value={this.state.grynasisPelnasProc} disabled={true} />
                  <div class="input-group-append">
                    <span class="input-group-text">%</span>
                  </div>
                </div>
              </Col>
              <Col>
                <label>Priskirtas resursų kiekis: </label>
                <input type="text" required className="form-control" value={this.state.resursuKiekis} onChange={this.onChangeResursuKiekis} />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Būsena: </label>
                <select
                  required
                  className="form-control"
                  value={this.state.busena}
                  onChange={this.onChangeBusena}>
                  <option value="Pradėtas">Pradėtas</option>
                  <option value="Vykdomas">Vykdomas</option>
                  <option value="Pabaigtas">Pabaigtas</option>
                </select>
              </Col>
              <Col>
              <div data-toggle="tooltip" title="nuolaida, %: Bronza: 0.01; Sidabras: 0.02; Auksas: 0.03">
                <label>Grynasis pelnas su nuolaida: </label>
                <div class="input-group mb-3">
                  <input type="text" required className="form-control" value={this.state.grynasisPelnasSuNuolaida} disabled={true} />
                  <div class="input-group-append">
                    <span class="input-group-text">€</span>
                  </div>
                </div>
                </div>
              </Col>
              <Col>
                <label>Atvirų užduočių skaičius:</label>
                <input type="text" required className="form-control" value={this.state.taskCount} disabled={true} />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Numatoma pradžios data: </label>
                <div>
                  <DatePicker className="form-control"
                    selected={this.state.pradziosData}
                    onChange={this.onChangePradziosData} />
                </div>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <label>Numatoma pabaigos data: </label>
                <div>
                  <DatePicker className="form-control"
                    selected={this.state.pabaigosData}
                    onChange={this.onChangePabaigosData} />
                </div>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>

            <div>
              <label>Aprašymas: </label>
              <textarea className="form-control" value={this.state.aprasymas} onChange={this.onChangeAprasymas} />
            </div>

            <input style={{ margin: "10px" }} type="submit" value="Išsaugoti" className="btn btn-primary" />
            {this.state.lockProject === false ?
              <Button variant="warning" style={{ float: "right", margin: "10px" }} onClick={this.closeProject}>Užbaigti projektą</Button> :
              <Button variant="warning" style={{ float: "right", margin: "10px" }} onClick={this.reopenProject}>Atidaryti projektą</Button>}
          </form>
        </fieldset>

        {/* Tabs */}
        <div style={{ margin: "50px" }}>
          <Tabs defaultActiveKey="informacija" id="project-tabs">
            <Tab eventKey="informacija" title="Informacija">
              {/* detail komponentas */}
              <div className='form-tab'>
                <Row>
                  <Col>
                    <label>Apskaičiuota suma: </label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.apskSuma} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">€</span></div>
                    </div>
                  </Col>
                  <Col>
                    <label>Laimėta suma: </label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.laimetaSuma} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">€</span></div>
                    </div>
                  </Col>
                  <Col>
                    <label>Pralaimėta suma: </label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.pralaimetaSuma} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">€</span></div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Apskaičiuota bendras plotas m<sup>2</sup>:</label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.apskBendrasPlotasm2} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">m<sup>2</sup></span></div>
                    </div>
                  </Col>
                  <Col>
                    <label>Laimėta bendras plotas m<sup>2</sup>:</label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.laimetaBendrasPlotasm2} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">m<sup>2</sup></span></div>
                    </div>
                  </Col>
                  <Col>
                    <label>Pralaimėta bendras plotas m<sup>2</sup>:</label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.pralaimetaBendrasPlotasm2} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">m<sup>2</sup></span></div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Apskaičiuota pajamos:</label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.apskPajamos} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">€</span></div>
                    </div>
                  </Col>
                  <Col>
                    <label>Laimėta pajamos:</label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.laimetaPajamos} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">€</span></div>
                    </div>
                  </Col>
                  <Col>
                    <label>Pralaimėta pajamos:</label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.pralaimetaPajamos} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">€</span></div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Apskaičiuota EBITDA: </label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.apskEbitda} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">€</span></div>
                    </div>
                  </Col>
                  <Col>
                    <label>Laimėta EBITDA: </label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.laimetaEbitda} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">€</span></div>
                    </div>
                  </Col>
                  <Col>
                    <label>Pralaimėta EBITDA: </label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.pralaimetaEbitda} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">€</span></div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Apskaičiuota EBITDA, %: </label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.apskEbitdaProc} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">%</span></div>
                    </div>
                  </Col>
                  <Col>
                    <label>Laimėta EBITDA, %: </label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.laimetaEbitdaProc} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">%</span></div>
                    </div>
                  </Col>
                  <Col>
                    <label>Pralaimėta EBITDA, %: </label>
                    <div class="input-group mb-3">
                      <input type="text" className="form-control" value={this.state.pralaimetaEbitdaProc} disabled={true} />
                      <div class="input-group-append"><span class="input-group-text">%</span></div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Apskaičiuota bendras kiekis: </label>
                    <input type="text" className="form-control" value={this.state.apskBendrasKiekis} disabled={true} />
                  </Col>
                  <Col>
                    <label>Laimėta bendras kiekis: </label>
                    <input type="text" className="form-control" value={this.state.laimetaBendrasKiekis} disabled={true} />
                  </Col>
                  <Col>
                    <label>Pralaimėta bendras kiekis: </label>
                    <input type="text" className="form-control" value={this.state.pralaimetaBendrasKiekis} disabled={true} />
                  </Col>
                </Row>
              </div>
            </Tab>
            <Tab eventKey="produktai" title="Produktai">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Pavadinimas</th>
                    <th>Aprasymas</th>
                    <th>Suma</th>
                    <th>Kiekis</th>
                    <th>Kaina</th>
                  </tr>
                </thead>
                <tbody>
                  {this.productList()}
                </tbody>
              </table>
            </Tab>
            <Tab eventKey="uzduotys" title="Užduotys">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Subjektas</th>
                    <th>Pradžios Data</th>
                    <th>Skirta</th>
                    <th>Pabaigos Data</th>
                    <th>Komentaras</th>

                  </tr>
                </thead>
                <tbody>
                  {this.taskList()}
                </tbody>
              </table>
            </Tab>
            <Tab eventKey="prognozes" title="Prognozės">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Periodo pradžia</th>
                    <th>Periodo pabaiga</th>
                    <th>Išdalinta suma</th>
                  </tr>
                </thead>
                <tbody>
                  {this.forecastList()}
                </tbody>
              </table>
            </Tab>
          </Tabs>
        </div>

      </div>
    )
  }
}