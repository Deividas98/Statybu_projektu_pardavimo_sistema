import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = props => (
  <tr>
    <td>{props.product.pavadinimas}</td>
    <td>{props.product.aprasymas}</td>
    <td>{props.product.suma}</td>
    <td>{props.product.kiekis}</td>
    <td>{props.product.kaina}</td>
    <td>
      <Link to={"/edit/" + props.product._id}>edit</Link> | <Button onClick={() => { props.deleteProduct(props.product._id) }}>delete</Button>
      {/* <a href="#" onClick={() => { props.deleteProduct(props.product._id) }}>delete</a> */}
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
      <Link to={"/edittask/" + props.task._id}>Redaguoti</Link> | <Button onClick={() => { props.deleteTask(props.task._id) }}>Ištrinti</Button>
      {/* <a href="#" onClick={() => { props.deleteTask(props.task._id) }}>Ištrinti</a> */}

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
    this.onChangeProjektoSuma = this.onChangeProjektoSuma.bind(this);
    this.onChangeNuolaida = this.onChangeNuolaida.bind(this);
    this.onChangeBusena = this.onChangeBusena.bind(this);
    this.onChangePradziosData = this.onChangePradziosData.bind(this);
    this.onChangePabaigosData = this.onChangePabaigosData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      projPavadinimas: '',
      aprasymas: '',
      // imone: '',
      projektoSuma: '',
      nuolaida: '',
      busena: '',
      grynasisPelnasSuNuolaida: 0,
      lojalumas: '',
      pradziosData: new Date(),
      pabaigosData: new Date(),
      //date: new Date(), pataisyti
      projektai: [],
      ProjectId: '',
      tasks: [],
      products: [],
      forecasts: [],
      imones: [],

      mokesciai: 0,

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
    axios.get('http://localhost:5000/projects/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          projPavadinimas: response.data.pavadinimas,
          aprasymas: response.data.aprasymas,
          imone: response.data.imone,
          projektoSuma: response.data.projektoSuma,
          nuolaida: response.data.nuolaida,
          busena: response.data.busena,
          pradziosData: new Date(response.data.pradziosData),
          pabaigosData: new Date(response.data.pabaigosData),
          //date: new Date(response.data.date)

          mokesciai: response.data.mokesciai,

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

        })
      })
      .catch(function (error) {
        console.log(error);
      })

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
  }

  onChangePavadinimas(e) {
    this.setState({
      projPavadinimas: e.target.value
    })
  }

  onChangeAprasymas(e) {
    this.setState({
      aprasymas: e.target.value
    })
  }

  onChangeImone(e) {
    this.setState({
      imone: e.target.value
    })
  }

  onChangeProjektoSuma(e) {
    this.setState({
      suma: e.target.value
    })
  }

  onChangeNuolaida(e) {
    this.setState({
      nuolaida: e.target.value
    })
  }

  onChangeBusena(e) {
    this.setState({
      busena: e.target.value
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

  onSubmit = (e) => {
    e.preventDefault();

    axios.delete('http://localhost:5000/forecasts/dltfore/'+this.props.match.params.id)
      .then(response => { console.log(response.data)});

    let nuolaidaNum = 0;
    axios.get('http://localhost:5000/accounts/accLoyalty/' + this.state.imone)
      .then(response => {
        if (response.data.lojalumas === 'Bronza') { nuolaidaNum = 0.01 }
        else if (response.data.lojalumas === 'Sidabras') { nuolaidaNum = 0.02 }
        else if (response.data.lojalumas === 'Auksas') { nuolaidaNum = 0.03 }
        this.setState({
          lojalumas: response.data.lojalumas,
          grynasisPelnasSuNuolaida: (this.state.laimetaEbitda - this.state.mokesciai - (this.state.laimetaPajamos * nuolaidaNum))
        })
        //let grynasisPelnasSuNuolaida = 0;
        //grynasisPelnasSuNuolaida = (this.state.laimetaEbitda - this.state.mokesciai /*- (this.state.laimetaPajamos * nuolaidaNum)*/)

        //console.log(response.data.lojalumas + " " + this.state.grynasisPelnasSuNuolaida)  //gauna
      })
      .catch((error) => {
        console.log(error);
      })


    const projektas = {
      pavadinimas: this.state.projPavadinimas,
      aprasymas: this.state.aprasymas,
      imone: this.state.imone,
      projektoSuma: this.state.projektoSuma,
      nuolaida: this.state.nuolaida,
      busena: this.state.busena,
      pradziosData: this.state.pradziosData,
      pabaigosData: this.state.pabaigosData
    }
    console.log(projektas);

    // add forecast request
//var firstDay = new Date(this.state.pradziosData.getFullYear(), this.state.pradziosData.getMonth(), 1);
var lastDay = new Date(this.state.pradziosData.getFullYear(), this.state.pradziosData.getMonth() + 1, 0);
//var firstDayLastMonth = new Date(this.state.pabaigosData.getFullYear(), this.state.pabaigosData.getMonth() + 1, 0);
let number_of_months = this.state.pabaigosData.getMonth() - this.state.pradziosData.getMonth() + (12 * (this.state.pabaigosData.getFullYear() - this.state.pradziosData.getFullYear()));
//number_of_months=Number(number_of_months);
var addedMonth = number_of_months +1;
//console.log("men " + (number_of_months) + " add: " + addedMonth);
let isdalintosPajamos = this.state.apskPajamos/addedMonth;
for(let i=0; i<=number_of_months; i++){
if(i===0){console.log("PrognozeF: PRD: " + this.state.pradziosData + " PBD: " + lastDay + " isdalinta: " + isdalintosPajamos);
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
else if(i===(number_of_months)){console.log("PrognozeL: PRD: " + new Date(this.state.pabaigosData.getFullYear(), this.state.pabaigosData.getMonth(),1) + " PBD: " + this.state.pabaigosData + " isdalinta: " + isdalintosPajamos);
const prognoze2 = {
  projektas: this.props.match.params.id,
  periodoPradzia: new Date(this.state.pabaigosData.getFullYear(), this.state.pabaigosData.getMonth(),1),
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
else {console.log(i+" Prognoze: PRD: " + new Date(this.state.pradziosData.getFullYear(), this.state.pradziosData.getMonth()+i, 1) + " PBD: " + new Date(this.state.pradziosData.getFullYear(), this.state.pradziosData.getMonth()+i + 1, 0) + " isdalinta: " + isdalintosPajamos);
const prognoze3 = {
  projektas: this.props.match.params.id,
  periodoPradzia: new Date(this.state.pradziosData.getFullYear(), this.state.pradziosData.getMonth()+i, 1),
  periodoPabaiga: new Date(this.state.pradziosData.getFullYear(), this.state.pradziosData.getMonth()+i + 1, 0),
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


    //atkomentuoti!!
    // axios.post('http://localhost:5000/projects/updateprj/' + this.props.match.params.id, projektas)
    //   .then(res => console.log(res.data));

    // window.location = '/main';//!!!
  }

  productList() {
    console.log(this.state.products.projektas);
    return this.state.products.map(currentproduct => {
      return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id} />;
    })
  }

  taskList() {
    console.log(this.state.tasks.projektas);
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
    return (
      <div>
        <h3>Atnaujinti projektą</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Pavadinimas: </label>
            <input type="text" required className="form-control" value={this.state.projPavadinimas} onChange={this.onChangePavadinimas} />
          </div>
          <div className="form-group">
            <label>Aprašymas: </label>
            <input type="text" required className="form-control" value={this.state.aprasymas} onChange={this.onChangeAprasymas} />
          </div>
          <div className="form-group">
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
          </div>
          <div className="form-group">
            <label>Kontaktas: </label>
            <input type="text" required className="form-control" value={this.state.kontaktas} onChange={this.onChangeKontaktas} />
          </div>
          <div className="form-group">
            <label>Projekto suma: </label>
            <input type="text" required className="form-control" value={this.state.projektoSuma} onChange={this.onChangeProjektoSuma} />
          </div>
          <div className="form-group">
            <label>Nuolaida: </label>
            <input type="text" required className="form-control" value={this.state.nuolaida} onChange={this.onChangeNuolaida} />
          </div>
          <div className="form-group">
            <label>Būsena: </label>
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
          <div className="form-group">
            <label>Gryn pelnas: </label>
            <input type="text" required className="form-control" value={this.state.grynasisPelnasSuNuolaida} />
          </div>
          <div className="form-group">
            <label>Numatoma pradžios data: </label>
            <div>
              <DatePicker
                selected={this.state.pradziosData}
                onChange={this.onChangePradziosData}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Numatoma pabaigos data: </label>
            <div>
              <DatePicker
                selected={this.state.pabaigosData}
                onChange={this.onChangePabaigosData}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Išsaugoti" className="btn btn-primary" />
          </div>
        </form>
        {/* detail komponentas */}

        <div className="project-details">
          <div className="prj-details-col">
            <label>Apskaičiuota suma: </label>
            <input type="text" className="form-control" value={this.state.apskSuma} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Laimėta suma: </label>
            <input type="text" className="form-control" value={this.state.laimetaSuma} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Pralaimėta suma: </label>
            <input type="text" className="form-control" value={this.state.pralaimetaSuma} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Apskaičiuota bendras plotas m2: </label>
            <input type="text" className="form-control" value={this.state.apskBendrasPlotasm2} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Laimėta bendras plotas m2: </label>
            <input type="text" className="form-control" value={this.state.laimetaBendrasPlotasm2} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Pralaimėta bendras plotas m2: </label>
            <input type="text" className="form-control" value={this.state.pralaimetaBendrasPlotasm2} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Apskaičiuota pajamos: </label>
            <input type="text" className="form-control" value={this.state.apskPajamos} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Laimėta pajamos: </label>
            <input type="text" className="form-control" value={this.state.laimetaPajamos} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Pralaimėta pajamos: </label>
            <input type="text" className="form-control" value={this.state.pralaimetaPajamos} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Apskaičiuota EBITDA: </label>
            <input type="text" className="form-control" value={this.state.apskEbitda} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Laimėta EBITD: </label>
            <input type="text" className="form-control" value={this.state.laimetaEbitda} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Pralaimėta EBITD: </label>
            <input type="text" className="form-control" value={this.state.pralaimetaEbitda} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Apskaičiuota EBITDA, %: </label>
            <input type="text" className="form-control" value={this.state.apskEbitdaProc} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Laimėta EBITDA, : </label>
            <input type="text" className="form-control" value={this.state.laimetaEbitdaProc} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Pralaimėta EBITDA, : </label>
            <input type="text" className="form-control" value={this.state.pralaimetaEbitdaProc} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Apskaičiuota bendras kiekis: </label>
            <input type="text" className="form-control" value={this.state.apskBendrasKiekis} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Laimėta bendras kiekis: </label>
            <input type="text" className="form-control" value={this.state.laimetaBendrasKiekis} disabled={true} />
          </div>
          <div className="prj-details-col">
            <label>Pralaimėta bendras kiekis: </label>
            <input type="text" className="form-control" value={this.state.pralaimetaBendrasKiekis} disabled={true} />
          </div>
        </div>

        {/* details komponentas */}
        <p></p>
        <p></p>
        <h3>Susiję produktai</h3>
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
        <p></p>
        <p></p>
        <h3>Susijusios užduotys</h3>
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
        <p></p>
        <p></p>
        <h3>Susijusios prognozės</h3>
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
      </div>
    )
  }
}