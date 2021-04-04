import React, { useState } from 'react';
import firebase from './util/firebase';
import { Modal, Button, Row, Col, Form, FormControl, Dropdown } from 'react-bootstrap';

export default function AddProject() {
  const [pavadinimas, setPavadinimas, aprasymas, setAprasymas, kontaktas, setKontaktas, nuolaida, setNuolaida, busena, setBusena] = useState('');

  /*const handleOnChange = (e) => {
      setTitle(e.target.value);
  };*/

  const createProject = () => {
    const todoRef = firebase.database().ref('ProjectsList');
    const projektasDB = {
      pavadinimas,
      aprasymas,
      kontaktas,
      nuolaida,
      busena,
    };

    todoRef.push(projektasDB);
  }
  return (
    <Modal
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl onChange={e => setPavadinimas(e.target.value)} value={pavadinimas}
          placeholder="Pavadinimas"
          aria-label="Pavadinimas"
        />
        <FormControl onChange={e => setAprasymas(e.target.value)} value={aprasymas}
          placeholder="Aprašymas"
          aria-label="Aprasymas"
        />
        <Dropdown >
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Kontaktas
</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <FormControl
          placeholder="Nuolaida"
          aria-label="Nuolaida"
        />
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Būsena
</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Pradėtas</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Vykdomas</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Pabaigtas</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Atšauktas</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.props.onHide}>
          Atsaukti
      </Button>
        <Button variant="primary" onClick={createProject}>Saugoti</Button>
      </Modal.Footer>
    </Modal>
  )
}
