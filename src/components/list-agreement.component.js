import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

//ne atskiram faile nes mazas komponentas
const Agreement = props => (
  <tr>
    <td>{props.agreement.pavadinimas}</td>
    <td>{props.agreement.imone}</td>
    <td>{props.agreement.projektas}</td>
    <td>{props.agreement.sutartiesNumeris}</td>
    <td>{props.agreement.tipas}</td>
    <td>
      <Link to={"/editagr/" + props.agreement._id}>Redaguoti</Link> | <Button variant="danger" onClick={() => { props.deleteAgreement(props.agreement._id) }}>Ištrinti</Button>
    </td>
  </tr>
)

export default class AgreementsList extends Component {
  constructor(props) {
    super(props);

    this.deleteAgreement = this.deleteAgreement.bind(this)
    this.sorting = this.sorting.bind(this)
    this.state = { agreements: [], sorted: false  };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/agreements/agrwlookup')
      .then(response => {
        this.setState({ agreements: response.data })
        // console.log(this.state.agreements);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteAgreement(id) {
    if (window.confirm('Ar tikrai norite pašalinti šį įrašą?')) {
      axios.delete('http://localhost:5000/agreements/' + id)
        .then(response => { console.log(response.data) });

      this.setState({
        agreements: this.state.agreements.filter(el => el._id !== id)
      })
    }
  }

  agreementList() {
    return this.state.agreements.map(currentagreement => {
      return <Agreement agreement={currentagreement} deleteAgreement={this.deleteAgreement} key={currentagreement._id} />;
    })
  }

  sorting() {
    this.setState(({ sorted }) => ({ sorted: !sorted }))
    if (this.state.sorted) {
      axios.get('http://localhost:5000/agreements/agrwlookup')
      .then(response => {
        this.setState({ agreements: response.data })
        // console.log(this.state.agreements);
      })
      .catch((error) => {
        console.log(error);
      })
    }
    else {
      axios.get('http://localhost:5000/agreements/listagrsort')
      .then(response => {
        this.setState({ agreements: response.data })
        // console.log(this.state.agreements);
      })
      .catch((error) => {
        console.log(error);
      })
    }
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
              <th>Projektas</th>
              <th>Sutarties numeris</th>
              <th>Tipas</th>
              <th><Button variant="info" onClick={this.sorting}>Rūšiuoti</Button></th>
            </tr>
          </thead>
          <tbody>
            {this.agreementList()}
          </tbody>
        </table>
      </div>
    )
  }
}