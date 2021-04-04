import React, { Component } from 'react'
//import { Table, Button, Modal, Alert } from 'reactstrap';
import firebase from './util/firebase';
import BootstrapTable from "react-bootstrap-table-next";
import { Modal, Button, Row, Col, Form, FormControl, ProgressBar } from 'react-bootstrap';

const contactColumns = [{
  dataField: 'vardas',
  text: 'First Name'
}, {
  dataField: 'pavarde',
  text: 'Last Name'
}, {
  dataField: 'pastas',
  text: 'Email'
}, {
  dataField: 'telefonas',
  text: 'Phone'
}, {
  dataField: 'pareigos',
  text: 'Job Position'
}, {
  dataField: 'adresas',
  text: 'Address'
},];

export class ContactTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contactList: [],

      depsPrj: [], contactModalShow: false,
      show: false,
      vardas: '',
      pavarde: '',
      telefonas: '',
      pastas: '',
      adresas: '',
      pareigos: '',
      kontaktoId: '',
      deleteConfirm: false,
    }

  }

  showModal = e => {
    this.setState({ show: true });
  };

  hideModal = e => {
    this.setState({ show: false });
  };

  showConfirmDelete = e => {
    this.setState({ deleteConfirm: true });
  };

  hideConfirmDelete = e => {
    this.setState({ deleteConfirm: false });
  };

  updateFirstNameValue(evt) {
    this.setState({
      vardas: evt.target.value,
    })
  }

  updateLastNameValue(evt2) {
    this.setState({
      pavarde: evt2.target.value,
    })
  }

  updatePhoneValue(evt3) {
    this.setState({
      telefonas: evt3.target.value,
    })
  }

  updateEmailValue(evt4) {
    this.setState({
      pastas: evt4.target.value,
    })
  }

  updateJobPositionValue(evt5) {
    this.setState({
      pareigos: evt5.target.value,
    })
  }

  updateAddressValue(evt6) {
    this.setState({
      adresas: evt6.target.value,
    })
  }

  onUpdate() {
    var db = firebase.database().ref("ContactLists");
    db.child(this.state.kontaktoId).update({
      vardas: this.state.vardas, pavarde: this.state.pavarde, pastas: this.state.pastas,
      telefonas: this.state.telefonas, pareigos: this.state.pareigos, adresas: this.state.adresas,
    });
  }

  onDelete() {
    var db = firebase.database().ref("ContactLists");
    db.child(this.state.kontaktoId).remove();
  }

  componentWillMount() {
    this.setState({ contactList: [] });
  }

  componentDidMount() {
    var counter = 0;
    this.setState({ contactList: [] });
    firebase.database().ref("ContactLists").on('value', (snapshot) => {
      let contactList = [];
      snapshot.forEach(snap => {
        counter++;
        console.log(snap.val());
        console.log(snap.key);//recod id!!!
        contactList.push(snap.val());
      });
      this.setState({ contactList: contactList });
    });
    console.log(counter);
  }

  render() {
    const { depsPrj } = this.state;

    const rowEvents = {
      onClick: (e, row) => {
        console.log(row);
        this.setState({
          vardas: row.vardas,
          pavarde: row.pavarde,
          telefonas: row.telefonas,
          pastas: row.pastas,
          pareigos: row.pareigos,
          adresas: row.adresas,
          kontaktoId: row.recId,
        });

        console.log(this.state.vardas);
        console.log(this.state.kontaktoId);
        this.showModal();
      },
    };

    return (
      <div>
        <Modal show={this.state.deleteConfirm} >
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Do you Really want to Delete this record?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.setState({ deleteConfirm: false })}>Cancel</Button>
            <Button variant="danger" onClick={() => this.onDelete()}>Confirm</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.show} >
          <Modal.Header closeButton>
            <Modal.Title>Edit Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl onChange={evt => this.updateFirstNameValue(evt)} value={this.state.vardas} />
            <FormControl onChange={evt => this.updateLastNameValue(evt)} value={this.state.pavarde} />
            <FormControl onChange={evt => this.updateEmailValue(evt)} value={this.state.pastas} />
            <FormControl onChange={evt => this.updatePhoneValue(evt)} value={this.state.telefonas} />
            <FormControl onChange={evt => this.updateJobPositionValue(evt)} value={this.state.pareigos} />
            <FormControl onChange={evt => this.updateAddressValue(evt)} value={this.state.adresas} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ show: false })}>Cancel</Button>
            <Button variant="primary" onClick={() => this.onUpdate()}>Update</Button>
            <Button variant="danger" onClick={() => this.showConfirmDelete()}>Delete</Button>
          </Modal.Footer>
        </Modal>

        <BootstrapTable keyField='id' data={this.state.contactList} columns={contactColumns} rowEvents={rowEvents} />
      </div>
    )
  }
}

export default ContactTable