import React, { Component } from 'react'
//import { Table, Button, Modal } from 'reactstrap';
import firebase from './util/firebase';
import BootstrapTable from "react-bootstrap-table-next";
import { Modal, Button, Row, Col, Form, FormControl, ProgressBar } from 'react-bootstrap';

//const projectList = [
  /*{
     "id": "10",
     "name": "minivan",
     "price": 333
     
   }*/
//];


const projectColumns = [/*{
  dataField: 'id',
  text: 'Product ID'
},*/ {
  dataField: 'pavadinimas',
  text: 'Pavadinimas'
}, {
  dataField: 'aprasymas',
  text: 'Aprašymas'
}, {
  dataField: 'projektoSuma',
  text: 'Suma'
}, {
  dataField: 'kontaktas',
  text: 'Kontaktas'
}, {
  dataField: 'nuolaida',
  text: 'Nuolaida'
}, {
  dataField: 'sukurimodata',
  text: 'Sukūrimo Data'
}, {
  dataField: 'busena',
  text: 'Būsena'
},];

/*const toggleTrueFalse = () => {
  setShowModal(this.handleShow());
};*/

export class ProjectTable extends Component {
  constructor(props) {
    super(props)

    this.myRef = React.createRef();
    this.BusenaRef = React.createRef();

    this.state = {
     // message: 'hello',
      //ProjectList: [],
      optionSet: [],
      projectList: [],

      depsPrj: [], projectModalShow: false,
      show: false,
      pavadinimas: '',
      aprasymas: '',
      busena: '',
      kontaktas: '',
      nuolaida: '',
      projektoId: '',
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

  updateInputValue(evt) {
    this.setState({
      pavadinimas: evt.target.value,
    })
  }

  updateNuolaidaValue(evt2) {
    this.setState({
      nuolaida: evt2.target.value,
    })
  }

  updateDescriptionValue(evt3) {
    this.setState({
      aprasymas: evt3.target.value,
    })
  }

  updateStatusValue(evt4) {
    this.setState({
      busena: evt4.target.value,
    })
  }

  updateContactValue(evt5) {
    this.setState({
      kontaktas: evt5.target.value,
    })
  }

  onUpdate() {
    var db = firebase.database().ref("TESTINIS-ProjectsList");
    db.child(this.state.projektoId).update({
      pavadinimas: this.state.pavadinimas, aprasymas: this.state.aprasymas,
      kontaktas: this.myRef.current.value, nuolaida: this.state.nuolaida, busena: this.BusenaRef.current.value
    }); //geras
  }

  onDelete() {
    var db = firebase.database().ref("TESTINIS-ProjectsList");
    db.child(this.state.projektoId).remove();
  }

  componentWillMount() {
    this.setState({ projectList: [] });
  }

  /*getSnapshotBeforeUpdate(prevProps) {
    return { sortYN: prevProps.data3 !== this.props.data3 };
  }*/

  componentDidMount() {
    const newBugs = this.props.data3;
    console.log("another comp " + /*this.props.data3*/newBugs);

    //console.log("prewprops::: " + prevProps);
    var counter = 0;
    let optionSet = [];
    this.setState({ projectList: [] });
    firebase.database().ref("TESTINIS-ProjectsList").orderByChild("pavadinimas").on('value', (snapshot) => {
      //let ProjectList = [];
      let projectList = [];
      
      snapshot.forEach(snap => {
        // snap.val() is the dictionary with all your keys/values from the 'students-list' path
        //ProjectList.push(snap.val());
        counter++;
        console.log(snap.val());
        console.log(snap.key);//recod id!!!
        projectList.push(snap.val());
        //var object[counter] ={};
        //optionSet.push(snap.val().kontaktas);

      });
      
      if(!newBugs){projectList.reverse();}
      
      //this.setState({ ProjectList: ProjectList });
      this.setState({ projectList: projectList });
      //window.location.reload(false);
    });
    console.log(counter);
    //console.log(optionSet);


    //get products
    /*firebase.database().ref("ContactLists").on('value', (snapshot) => {
      snapshot.forEach(snap => {
        optionSet.push(snap.val().vardas);
        optionSet.push(snap.val().pavarde);
      });
    });
    console.log(optionSet);*/
  }

  render() {
    //const newBugs = this.props.data3;
    
    //console.log("another comp " + /*this.props.data3*/newBugs);
    const sortas = this.props.sortAZ;
    let progress = 0;

    if (this.state.busena == "Pradėtas") { progress = 33; } 
    else if (this.state.busena == "Vykdomas") { progress = 67; } 
    else if (this.state.busena == "Pabaigtas") { progress = 100; }
    else progress = 0;

    const { depsPrj } = this.state;
    //let projectModalClose = () => this.setState({ projectModalShow: false });

    const rowEvents = {
      onClick: (e, row) => {
        console.log(row);
        this.setState({
          pavadinimas: row.pavadinimas,
          aprasymas: row.aprasymas,
          busena: row.busena,
          nuolaida: row.nuolaida,
          kontaktas: row.kontaktas,
          projektoId: row.recId,
          // kontaktas: row.this.myRef.current.value,
          busena: row.busena//this.BusenaRef.current.value
        });

        console.log(this.state.pavadinimas);
        console.log(this.state.projektoId);
        console.log(this.state.kontaktas + " | " + this.state.busena);
        this.showModal();
        //e => {this.showModal();}
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
            <Modal.Title>Edit Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProgressBar now={progress} label={this.state.busena} />

            <FormControl onChange={evt => this.updateInputValue(evt)} value={this.state.pavadinimas}
            disabled={this.state.busena == "Pabaigtas" ? true : false} />

            <FormControl onChange={evt => this.updateDescriptionValue(evt)} value={this.state.aprasymas}  as="textarea"
            disabled={this.state.busena == "Pabaigtas" ? true : false}/>

            <FormControl as="select" custom ref={this.myRef} disabled={this.state.busena == "Pabaigtas" ? true : false}>
              <option value={this.state.kontaktas}>{this.state.kontaktas}</option>
              <option value="petras petraitis">Petras Petraitis</option>
              <option value="purple p">Paba</option>
              <option value="magenta mag">Atš</option>
            </FormControl>

            <FormControl onChange={evt => this.updateNuolaidaValue(evt)} value={this.state.nuolaida} 
            disabled={this.state.busena == "Pabaigtas" ? true : false}/>

            <FormControl as="select" custom ref={this.BusenaRef} disabled={this.state.busena == "Pabaigtas" ? true : false}>
              <option value={this.state.busena}>{this.state.busena}</option>
              <option value="Pradėtas">Pradėtas</option>
              <option value="Vykdomas">Vykdomas</option>
              <option value="Pabaigtas">Pabaigtas</option>
              <option value="Atšauktas">Atšauktas</option>
            </FormControl>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ show: false })}>Cancel</Button>
            <Button variant="primary" onClick={() => this.onUpdate()}>Update</Button>
            <Button variant="danger" onClick={() => this.showConfirmDelete()}>Delete</Button>
          </Modal.Footer>
        </Modal>

        <BootstrapTable keyField='id' data={this.state.projectList/*projectList*/} columns={projectColumns} rowEvents={rowEvents} />
        

        {/*}  <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Pavadinimas</th>
              <th>Aprašymas</th>
              <th>Suma</th>
              <th>Kontaktas</th>
              <th>Nuolaida</th>
              <th>Sukūrimo data</th>
              <th>Būsena</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ProjectList.map(data => {
              return (
                <tr onRowClick={console.log("smt")}>
                  <td>1</td>
                  <td>{data.pavadinimas}</td>
                  <td>{data.aprasymas}</td>
                  <td>x</td>
                  <td>{data.kontaktas}</td>
                  <td>{data.nuolaida}</td>
                  <td>x</td>
                  <td>{data.busena}</td>
                </tr>
              )
            }
            )}
          </tbody>
        </Table>*/}

      </div>
    )
  }
}

export default ProjectTable