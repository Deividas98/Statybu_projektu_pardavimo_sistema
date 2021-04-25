import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Button} from 'react-bootstrap';

//ne atskiram faile nes mazas komponentas
const Agreement = props => (
  <tr>
    <td>{props.agreement.pavadinimas}</td>
    <td>{props.agreement.imone}</td>
    <td>{props.agreement.sutartiesNumeris}</td>
    <td>{props.agreement.tipas}</td>
    <td>
      <Link to={"/editagr/"+props.agreement._id}>Redaguoti</Link> | <Button onClick={() => { props.deleteAgreement(props.agreement._id) }}>Ištrinti</Button>
      {/* <a href="#" onClick={() => { props.deleteAgreement(props.agreement._id) }}>Ištrinti</a> */}
    </td>
  </tr>
)

/*const Projektai = Object.keys(products).map(key =>
  <option value={key}>{products[key]}</option>
)*/

export default class AgreementsList extends Component {
  constructor(props) {
    super(props);

    this.deleteAgreement = this.deleteAgreement.bind(this)

    this.state = {agreements: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/agreements/agrwlookup')
      .then(response => {
        this.setState({ agreements: response.data })
        //console.log(this.state.products);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteAgreement(id) {
    axios.delete('http://localhost:5000/agreements/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        agreements: this.state.agreements.filter(el => el._id !== id)
    })
  }

  agreementList() {
    console.log(this.state.agreements.projektas);//projektas???
    return this.state.agreements.map(currentagreement => {
      return <Agreement agreement={currentagreement} deleteAgreement={this.deleteAgreement} key={currentagreement._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Sutartys</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Pavadinimas</th>
              <th>Įmonė</th>
              <th>Sutarties numeris</th>
              <th>Tipas</th>
            </tr>
          </thead>
          <tbody>
            { this.agreementList() }
          </tbody>
        </table>
        
      </div>
    )
  }
}