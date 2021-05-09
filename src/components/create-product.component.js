import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Alert } from 'react-bootstrap';

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
    this.setState({prodPavadinimas: e.target.value})
  }

  onChangeAprasymas(e) {
    this.setState({aprasymas: e.target.value})
  }

  onChangeSuma(e) {
    this.setState({suma: e.target.value})
  }

  onChangeKiekis(e) {
    this.setState({kiekis: e.target.value})
  }

  onChangeKaina(e) {
    this.setState({kaina: e.target.value})
  }

  onChangeProjektas(e) {this.setState({projektas: e.target.value})
    //console.log(this.state.projektas)//paima tik is antro/ trecio karto kazkodel ir paima preajusi vizualiai bet iraso teisingai
  }

  onChangePlotasm2(e) {
    this.setState({
      plotasm2: e.target.value,
      m2kaina: this.state.plotasm2 / this.state.kiekis
    })
  }

  onChangePajamos(e) {
    this.setState({ pajamos: e.target.value})
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
      .then(async res => {console.log(res.data);
      
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
                <Modal.Title>Sukurti produktą</Modal.Title>
            </Modal.Header>
            <Modal.Body>
      <div className="form-group"> 
          <label>Pavadinimas: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.prodPavadinimas}
              onChange={this.onChangePavadinimas}
              />
        </div>
        <div className="form-group"> 
          <label>Aprašymas: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.aprasymas}
              onChange={this.onChangeAprasymas}
              />
        </div>
        <div className="form-group"> 
        <label>Projektas: </label>
          <select //ref="userInput"
              required
              className="form-control"
                value={this.state.projektas}
              onChange={this.onChangeProjektas}>
              {
                this.state.projektai.map(function([_id, pavadinimas]) {
                  return <option 
                    key={_id}
                    value={_id}>{pavadinimas}
                    </option>;
                })
              }
          </select>
        </div>
        {/* <div className="form-group"> 
          <label>Kaina: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.kaina}
              onChange={this.onChangeKaina}
              />
        </div> */}
        <div className="form-group"> 
          <label>Parduotų prekių kaina:</label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.suma}
              onChange={this.onChangeSuma}
              />
        </div>
        <div className="form-group"> 
          <label>Plotas m2: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.plotasm2}
              onChange={this.onChangePlotasm2}
              />
        </div>
        <div className="form-group"> 
          <label>Pajamos: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.pajamos}
              onChange={this.onChangePajamos}
              />
        </div>
        <div className="form-group"> 
          <label>EBITDA: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.pajamos - this.state.suma}
              disabled = {true}
              />
        </div>
        <div className="form-group"> 
          <label>EBTIDA %: </label>
          <input  type="text"
              required
              className="form-control"
              value={((this.state.pajamos - this.state.suma) / this.state.pajamos * 100)}
              disabled = {true}
              />
        </div>
        <div className="form-group"> 
          <label>Kiekis: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.kiekis}
              onChange={this.onChangeKiekis}
              />
        </div>
        <div className="form-group"> 
          <label>m2 kaina: </label>
          <input  type="text"
              required
              className="form-control"
            value={this.state.plotasm2 / this.state.kiekis}
              disabled = {true}
              />
        </div>
        <div className="form-group"> 
        <label>Statusas: </label>
          <select //ref="userInput"
              required
              className="form-control"
                value={this.state.statusas}
              onChange={this.onChangeStatusas}>
              <option value="Juodraštis">Juodraštis</option>
              <option value="Pateiktas">Pateiktas</option>
              <option value="Laimėtas">Laimėtas</option>
              <option value="Pralaimėtas">Pralaimėtas</option>
              <option value="Atšauktas">Atšauktas</option>                   
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