import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = props => (
    <tr>
      <td>{props.product.pavadinimas}</td>
      <td>{props.product.aprasymas}</td>
      <td>{props.product.suma}</td>
      <td>{props.product.kiekis}</td>
  <td>{props.product.kaina}</td>
      <td>
        <Link to={"/edit/"+props.product._id}>edit</Link> | <Button onClick={() => { props.deleteProduct(props.product._id) }}>delete</Button> 
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
        <Link to={"/edittask/"+props.task._id}>Redaguoti</Link> | <Button onClick={() => { props.deleteTask(props.task._id) }}>Ištrinti</Button> 
        {/* <a href="#" onClick={() => { props.deleteTask(props.task._id) }}>Ištrinti</a> */}
  
      </td>
    </tr>
  )

  const Forecast= props => (
    <tr>
      <td>{props.task.periodoPradzia}</td>
      <td>{props.task.periodoPabaiga}</td>
      <td>{props.task.isdalintaSuma}</td>
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
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pavadinimas: '',
            aprasymas: '',
            imone: '',
            projektoSuma: '',
            nuolaida: '',
            busena: '',
            grynasisPelnasSuNuolaida: 0,
            lojalumas: '',
            //date: new Date(), pataisyti
            projektai: [],
            ProjectId: '',
            tasks: [],
            products: [],
            forecasts: [],
            imones: [],

            laimetaEbitda: 0,
            mokesciai: 0,
            laimetaPajamos: 0
        }
    }

    //su kitais objektais ta padaryti
    componentDidMount() {
        axios.get('http://localhost:5000/projects/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          pavadinimas: response.data.pavadinimas,
          aprasymas: response.data.aprasymas,
          imone: response.data.imone,
          projektoSuma: response.data.projektoSuma,
          nuolaida: new Date(response.data.nuolaida),
          busena: response.data.busena,
          //date: new Date(response.data.date)
          laimetaEbitda: response.data.laimetaEbitda,
          mokesciai: response.data.mokesciai,
          laimetaPajamos: response.data.laimetaPajamos
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
            pavadinimas: e.target.value
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

    onSubmit = (e) => {
        e.preventDefault();

        let nuolaidaNum = 0;
        axios.get('http://localhost:5000/accounts/accLoyalty/' + this.state.imone)
        .then(response => {
            if(response.data.lojalumas === 'Bronza'){nuolaidaNum = 0.01}
            else if(response.data.lojalumas === 'Sidabras'){nuolaidaNum = 0.02}
            else if(response.data.lojalumas === 'Auksas'){nuolaidaNum = 0.03}
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
            pavadinimas: this.state.pavadinimas,
            aprasymas: this.state.aprasymas,
            imone: this.state.imone,
            projektoSuma: this.state.projektoSuma,
            nuolaida: this.state.nuolaida,
            busena: this.state.busena
        }

        console.log(projektas);

        axios.post('http://localhost:5000/projects/updateprj/' + this.props.match.params.id, projektas)
            .then(res => console.log(res.data));

       // window.location = '/main';//!!!
    }

    productList() {
        console.log(this.state.products.projektas);
        return this.state.products.map(currentproduct => {
          return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>;
        })
      }

      taskList() {
        console.log(this.state.tasks.projektas);
        return this.state.tasks.map(currenttask => {
          return <Task task={currenttask} deleteTask={this.deleteTask} key={currenttask._id}/>;
        })
      }

      forecastList() {
        return this.state.forecasts.map(currentforecast => {
          return <Forecast forecast={currentforecast} key={currentforecast._id}/>;
        })
      }

    render() {
        return (
            <div>
                <h3>Atnaujinti projektą</h3>
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
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.kontaktas}
                            onChange={this.onChangeKontaktas}
                        />
                    </div>
                    <div className="form-group">
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
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.grynasisPelnasSuNuolaida}
                            // onChange={this.onChangeProjektoSuma}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Išsaugoti" className="btn btn-primary" />
                    </div>
                </form>
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
            { this.productList() }
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
            { this.taskList() }
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
            { this.forecastList() }
          </tbody>
        </table>
            </div>
        )
    }
}