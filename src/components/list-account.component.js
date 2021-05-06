import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Button} from 'react-bootstrap';

//ne atskiram faile nes mazas komponentas
const Account = props => (
  <tr>
    <td>{props.account.pavadinimas}</td>
    <td>{props.account.salis}</td>
    <td>{props.account.adresas}</td>
    <td>{props.account.telefonoNr}</td>
    <td>{props.account.elPastas}</td>
    <td>{props.account.kontaktinisAsmuo}</td>
    <td>{props.account.svetaine}</td>
    <td>{props.account.lojalumas}</td>

    <td>
      <Link to={"/editacc/"+props.account._id}>Redaguoti</Link> | <Button onClick={() => { props.deleteAccount(props.account._id) }}>Ištrinti</Button>
    </td>
  </tr>
)

export default class AccountsList extends Component {
  constructor(props) {
    super(props);

    this.deleteAccount = this.deleteAccount.bind(this)

    this.state = {accounts: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/accounts/')
      .then(response => {
        this.setState({ accounts: response.data })
        //console.log(this.state.products);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteAccount(id) {
    if (window.confirm('Ar tikrai norite pa6alinti šį įrašą?')){
    axios.delete('http://localhost:5000/accounts/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        accounts: this.state.accounts.filter(el => el._id !== id)
    })
  }
  }

  accountList() {
    return this.state.accounts.map(currentaccount => {
      return <Account account={currentaccount} deleteAccount={this.deleteAccount} key={currentaccount._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Įmonės</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Pavadinimas</th>
              <th>Šalis</th>
              <th>Adresas</th>
              <th>Telefono numeris</th>
              <th>Elektroninis paštas</th>
              <th>Kontaktinis asmuo</th>
              <th>Svetainė</th>
              <th>Lojalumas</th>
            </tr>
          </thead>
          <tbody>
            { this.accountList() }
          </tbody>
        </table>
        
      </div>
    )
  }
}