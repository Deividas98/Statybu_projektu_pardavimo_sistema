import React, { Component } from 'react';
import { Modal, Button, Row, Col, FormControl} from 'react-bootstrap';
import firebase from './util/firebase';

export class AddModal extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.BusenaRef = React.createRef();
    this.state = {
      inputProject: '',
      inputDescription: '',
      inputNuolaida: ''
    }
  }

  updateInputValue(evt) {
    this.setState({
      inputProject: evt.target.value,
    })
  }

  updateDescriptionValue(e) {
    this.setState({
      inputDescription: e.target.value,
    })
  }

  updateNuolaidaValue(ev) {
    this.setState({
      inputNuolaida: ev.target.value,
    })
  }

  AddProjectToDb() {
//datos
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

    let pavadinimas = this.state.inputProject;
    let aprasymas = this.state.inputDescription;
    let nuolaida = this.state.inputNuolaida;
    let kontaktas = this.myRef.current.value;
    let busena = this.BusenaRef.current.value;
    let recId = 'temp';
    let sukurimodata = today;
    let projektoSuma = 0;
    console.log(pavadinimas +" "+ aprasymas +" "+ nuolaida +" "+ kontaktas +" "+ busena +" "+ today +" "+ projektoSuma);
    
    
    /**/const todoRef = firebase.database().ref('TESTINIS-ProjectsList');
     const projektasDB = {
     pavadinimas,
    aprasymas,
    kontaktas,
    nuolaida,
    busena,
    recId,
    sukurimodata,
    projektoSuma
     };

    let permId = todoRef.push(projektasDB).key;
    todoRef.child(permId).update({recId: permId});
    console.log(permId);
    /**/

  }

  /*
  po pirmos modal eilutes 
  show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          
          secondary variant button onClick={handleClose}*/
  render() {
    return (
      <Modal


        {...this.props}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl value={this.state.inputProject} onChange={evt => this.updateInputValue(evt)}
            placeholder="Pavadinimas"
            aria-label="Pavadinimas"
          />
          <FormControl value={this.state.inputDescription} onChange={e => this.updateDescriptionValue(e)}
            placeholder={"Aprašymas"}
            aria-label="Aprasymas" as="textarea"
          />
          <FormControl as="select" custom ref={this.myRef}>
            <option value="Jonas Jonaitis">Jonas Jonaitis</option>
            <option value="amber">Petras Petraitis</option>
            <option value="purple">Kontaktas2</option>
            <option value="magenta">Kontaktas2</option>
          </FormControl>

          <FormControl value={this.state.inputNuolaida} onChange={ev => this.updateNuolaidaValue(ev)}
            placeholder="Nuolaida"
            aria-label="Nuolaida"
          />

          <FormControl as="select" custom ref={this.BusenaRef}>
            <option value="Pradėtas">Pradėtas</option>
            <option value="amber">Vykdomas</option>
            <option value="purple">Pabaigtas</option>
            <option value="magenta">Atšauktas</option>
          </FormControl>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Atsaukti
          </Button>
          <Button variant="primary" onClick={() => this.AddProjectToDb()}>Saugoti</Button>
        </Modal.Footer>
      </Modal>
    )
  }

}