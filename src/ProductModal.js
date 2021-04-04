import React, { Component } from 'react';
import { Modal, Button, Row, Col, FormControl } from 'react-bootstrap';
import firebase from './util/firebase';

//let optionSet = [];
export class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.projectRef = React.createRef();

    this.state = {
      optionSet: [],
      inputName: '',
      inputPrice: '',
      inputQuantity: '',
      inputDescription: ''
    }
  }

  updateNameValue(evt) {
    this.setState({
      inputName: evt.target.value,
    })
  }

  updateDescriptionValue(e) {
    this.setState({
      inputDescription: e.target.value,
    })
  }

  updatePriceValue(ev) {
    this.setState({
      inputPrice: ev.target.value,
    })
  }

  updateQuantityValue(ev2) {
    this.setState({
      inputQuantity: ev2.target.value,
    })
  }

  getProjectList(){
    let optionSetlet = [];
    firebase.database().ref("TESTINIS-ProjectsList").on('value', (snapshot) => {
      snapshot.forEach(snap => {
        optionSetlet.push(snap.val().pavadinimas);
      });
    });
     //this.setState.optionSet = optionSet;
     //optionSet: this.setState({ optionSet: optionsetlet })
    console.log("optset " + optionSetlet);
  }

  AddProductToDb() {
    //datos
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    let pavadinimas = this.state.inputName;
    let aprasymas = this.state.inputDescription;
    let kiekis = this.state.inputQuantity;
    let kaina = this.state.inputPrice;
    let projektas = this.projectRef.current.value;
    let suma = kiekis * kaina;
    let recId = 'temp';
    let sukurimodata = today;
    console.log(pavadinimas + " " + aprasymas + " " + kiekis + " " + kaina + " " + projektas + " " + suma);

    /**/const todoRef = firebase.database().ref('ProductsLists');
    const produktasDB = {
      pavadinimas, aprasymas, kiekis, kaina, projektas, suma, recId, sukurimodata
    };

    let permId = todoRef.push(produktasDB).key;
    todoRef.child(permId).update({ recId: permId });
    //CIA KAZKUR UPDATINTI PROJEKTO SUMA

    //const projDB = firebase.database().ref('TESTINIS-ProjectsList');
    //let projectId = '', projectSum = '';
  /*  projDB.orderByChild("pavadinimas").equalTo(projektas).on("value", function(snapshot) {
      //console.log("query " + snapshot.key);
      
      snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val().nuolaida;
        projectId = childKey;
        projectSum = childSnapshot.val().projektoSuma + suma;
        console.log("query3 "+ childData + " " + childKey);
        
        
      
    });*/
      //console.log("query2 " + snapshot.val().pavadinimas);
    //});
    //console.log(permId);
    /**/

  }

  render() {
    //console.log(this.setState.optionSet);
    return (
      <Modal


        {...this.props}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl value={this.state.inputName} onChange={evt => this.updateNameValue(evt)}
            placeholder="Name"
            aria-label="Name"
          />
          <FormControl value={this.state.inputPrice} onChange={ev => this.updatePriceValue(ev)}
            placeholder="Price"
            aria-label="Price"
          />
          <FormControl value={this.state.inputQuantity} onChange={ev2 => this.updateQuantityValue(ev2)}
            placeholder="Quantity"
            aria-label="Quantity"
          />

          <FormControl as="select" custom ref={this.projectRef}>
            <option value="Projektas 1">Projektas 1</option>
            <option value="Projektas 2">Projektas 2</option>
            <option value="Projektas 3">Projektas 3</option>
            <option value="Projektas 4">Projektas 4</option>

            {this.state.optionSet.map(data => {
              return (
                <option value={data}>{data}</option>
              )
            }
            )}


          </FormControl>

          <FormControl value={this.state.inputDescription} onChange={e => this.updateDescriptionValue(e)}
            placeholder="Description" as="textarea"
            aria-label="Description"
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Atsaukti
          </Button>
          <Button variant="primary" onClick={() => this.AddProductToDb()}>Save</Button>
        </Modal.Footer>
      </Modal>
    )
  }

}