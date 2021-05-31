import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Alert, Row, Col } from 'react-bootstrap';

export default class CreateProducts extends Component {
  constructor(props) {
    super(props);
    this.onChangeAprasymas = this.onChangeAprasymas.bind(this);
    this.onChangePavadinimas = this.onChangePavadinimas.bind(this);
    this.onChangeProjektas = this.onChangeProjektas.bind(this);
    this.onChangeSuma = this.onChangeSuma.bind(this);
    this.onChangeKiekis = this.onChangeKiekis.bind(this);
    this.onChangeKaina = this.onChangeKaina.bind(this);
    this.onChangePlotasm2 = this.onChangePlotasm2.bind(this);
    this.onChangePajamos = this.onChangePajamos.bind(this);
    this.onChangeStatusas = this.onChangeStatusas.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      aprasymas: '',
      prodPavadinimas: '',
      suma: 0,
      kiekis: 0,
      kaina: 0,

      plotasm2: 0,
      pajamos: 0,
      statusas: 'Juodraštis',
      //---calc
      ebitda: 0,
      ebbitdaProc: 0,
      m2kaina: 0,
      //---calc
      projektai: [],
      toProject: [],
      visibleAlert: false
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
          console.log(this.state.projektai)
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangePavadinimas(e) {
    this.setState({ prodPavadinimas: e.target.value })
  }

  onChangeAprasymas(e) {
    this.setState({ aprasymas: e.target.value })
  }

  onChangeSuma(e) {
    this.setState({ suma: e.target.value })
  }

  onChangeKiekis(e) {
    this.setState({ kiekis: e.target.value })
  }

  onChangeKaina(e) {
    this.setState({ kaina: e.target.value })
  }

  onChangeProjektas(e) {
    this.setState({ projektas: e.target.value })
    //console.log(this.state.projektas)//paima tik is antro/ trecio karto kazkodel ir paima preajusi vizualiai bet iraso teisingai
  }

  onChangePlotasm2(e) {
    this.setState({
      plotasm2: e.target.value,
      m2kaina: this.state.plotasm2 / this.state.kiekis
    })
  }

  onChangePajamos(e) {
    this.setState({ pajamos: e.target.value })
  }

  onChangeStatusas(e) {
    this.setState({ statusas: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const produktas = {
      aprasymas: this.state.aprasymas,
      pavadinimas: this.state.prodPavadinimas,
      projektas: this.state.projektas,
      suma: this.state.suma,
      kiekis: this.state.kiekis,
      kaina: this.state.kaina,
      plotasm2: this.state.plotasm2,
      pajamos: this.state.pajamos,
      statusas: this.state.statusas
    }

    console.log(produktas);

    axios.post('http://localhost:5000/products/add', produktas)
      .then(async res => {
        console.log(res.data);

        try {
          const response = await axios.get('http://localhost:5000/products/sumProducts/' + this.state.projektas);
          if (response.data.length > 0) {
            //console.log(response.data._id);
            this.setState({
              toProject: response.data
            });

            const projektasApsk = {
              apskSuma: ((this.state.toProject[0].Pateikta[0] === undefined) ? 0 : this.state.toProject[0].Pateikta[0].sumSuma),
              apskBendrasPlotasm2: ((this.state.toProject[0].Pateikta[0] === undefined) ? 0 : this.state.toProject[0].Pateikta[0].sumBendrasPlotasm2),
              apskPajamos: ((this.state.toProject[0].Pateikta[0] === undefined) ? 0 : this.state.toProject[0].Pateikta[0].sumPajamos),
              apskEbitda: ((this.state.toProject[0].Pateikta[0] === undefined) ? 0 : this.state.toProject[0].Pateikta[0].sumEbitda),
              apskBendrasKiekis: ((this.state.toProject[0].Pateikta[0] === undefined) ? 0 : this.state.toProject[0].Pateikta[0].sumSuma),
              apskEbitdaProc: ((this.state.toProject[0].Pateikta[0] === undefined) ? 0 : this.state.toProject[0].Pateikta[0].sumSuma),

              laimetaSuma: ((this.state.toProject[0].Laimeta[0] === undefined) ? 0 : this.state.toProject[0].Laimeta[0].sumSuma),
              laimetaBendrasPlotasm2: ((this.state.toProject[0].Laimeta[0] === undefined) ? 0 : this.state.toProject[0].Laimeta[0].sumBendrasPlotasm2),
              laimetaPajamos: ((this.state.toProject[0].Laimeta[0] === undefined) ? 0 : this.state.toProject[0].Laimeta[0].sumPajamos),
              laimetaEbitda: ((this.state.toProject[0].Laimeta[0] === undefined) ? 0 : this.state.toProject[0].Laimeta[0].sumEbitda),
              laimetaBendrasKiekis: ((this.state.toProject[0].Laimeta[0] === undefined) ? 0 : this.state.toProject[0].Laimeta[0].sumBendrasKiekis),
              laimetaEbitdaProc: ((this.state.toProject[0].Laimeta[0] === undefined) ? 0 : this.state.toProject[0].Laimeta[0].sumEbitdaProc),

              pralaimetaSuma: ((this.state.toProject[0].Pralaimeta[0] === undefined) ? 0 : this.state.toProject[0].Pralaimeta[0].sumSuma),
              pralaimetaBendrasPlotasm2: ((this.state.toProject[0].Pralaimeta[0] === undefined) ? 0 : this.state.toProject[0].Pralaimeta[0].sumBendrasPlotasm2),
              pralaimetaPajamos: ((this.state.toProject[0].Pralaimeta[0] === undefined) ? 0 : this.state.toProject[0].Pralaimeta[0].sumPajamos),
              pralaimetaEbitda: ((this.state.toProject[0].Pralaimeta[0] === undefined) ? 0 : this.state.toProject[0].Pralaimeta[0].sumEbitda),
              pralaimetaBendrasKiekis: ((this.state.toProject[0].Pralaimeta[0] === undefined) ? 0 : this.state.toProject[0].Pralaimeta[0].sumBendrasKiekis),
              pralaimetaEbitdaProc: ((this.state.toProject[0].Pralaimeta[0] === undefined) ? 0 : this.state.toProject[0].Pralaimeta[0].sumEbitdaProc)
            };
            console.log(projektasApsk); //gauna gerai
            axios.post('http://localhost:5000/projects/updateest/' + this.state.projektas, projektasApsk)
              .then(res_1 => console.log(res_1.data));
          }
        } catch (error) {
          console.log(error);
        }
      });

    // window.location = '/main'; atkomentuoti
    this.setState({ visibleAlert: true })
    setTimeout(() => { this.setState({ visibleAlert: false }) }, 3000);
  }

  render() {
    return (
      <Modal {...this.props}>
        <Alert show={this.state.visibleAlert} variant="success" dismissible>Produktas sėkmingai sukurtas!</Alert>
        <Modal.Header closeButton onClick={this.props.onHide}>
          <Modal.Title>Pridėti produktą</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <label>Pavadinimas:</label>
          <input type="text" required className="form-control" value={this.state.ProdPavadinimas}
            onChange={this.onChangePavadinimas} />

          <label>Aprašymas: </label>
          <textarea className="form-control" value={this.state.aprasymas} onChange={this.onChangeAprasymas} />

          <label>Projektas: </label>
          <select required className="form-control" value={this.state.projektas}
            onChange={this.onChangeProjektas}>
            {
              this.state.projektai.map(function ([_id, pavadinimas]) {
                return <option
                  key={_id}
                  value={_id}>{pavadinimas}
                </option>;
              })
            }
          </select>
          <Row>
            <Col>
              <label>Parduotų prekių kaina:</label>
              <div class="input-group mb-3">
              <input type="text" required className="form-control" value={this.state.suma} onChange={this.onChangeSuma} />
                <div class="input-group-append">
                  <span class="input-group-text">€</span>
                </div>
              </div>
            </Col>
            <Col>
              <label>Plotas m<sup>2</sup>: </label>
              <div class="input-group mb-3">
              <input type="text" required className="form-control" value={this.state.plotasm2} onChange={this.onChangePlotasm2} />
                <div class="input-group-append">
                  <span class="input-group-text">m<sup>2</sup></span>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Pajamos:</label>
              <div class="input-group mb-3">
              <input type="text" required className="form-control" value={this.state.pajamos} onChange={this.onChangePajamos} />
                <div class="input-group-append">
                  <span class="input-group-text">€</span>
                </div>
              </div>
            </Col>
            <Col>
              <label>EBITDA:</label>
              <div class="input-group mb-3">
              <input type="text" className="form-control" value={this.state.pajamos - this.state.suma} disabled={true} />
                <div class="input-group-append">
                  <span class="input-group-text">€</span>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>EBTIDA %: </label>
              <div class="input-group mb-3">
              <input type="text" className="form-control" value={((this.state.pajamos - this.state.suma) / this.state.pajamos * 100)} disabled={true} />
                <div class="input-group-append">
                  <span class="input-group-text">%</span>
                </div>
              </div>
            </Col>
            <Col>
              <label>Kiekis: </label>
              <input type="text" required className="form-control" value={this.state.kiekis} onChange={this.onChangeKiekis} />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>m<sup>2</sup> kaina: </label>
              <div class="input-group mb-3">
              <input type="text" className="form-control" value={this.state.plotasm2 / this.state.kiekis} disabled={true} />
                <div class="input-group-append">
                  <span class="input-group-text">m<sup>2</sup></span>
                </div>
              </div>
            </Col>
            <Col>
              <label>Statusas: </label>
              <select required className="form-control" value={this.state.statusas}
                onChange={this.onChangeStatusas}>
                <option value="Juodraštis">Juodraštis</option>
                <option value="Pateiktas">Pateiktas</option>
                <option value="Laimėtas">Laimėtas</option>
                <option value="Pralaimėtas">Pralaimėtas</option>
                <option value="Atšauktas">Atšauktas</option>
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