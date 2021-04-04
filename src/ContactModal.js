import React, { Component } from 'react';
import { Modal, Button, Row, Col, FormControl } from 'react-bootstrap';
import firebase from './util/firebase';

export class ContactModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          inputFirstName: '',
          inputLastName: '',
          inputEmail: '',
          inputPhone: '',
          inputJobPosition: '',
          inputAddress: ''
        }
      }
    
      updateFirstNameValue(evt) {
        this.setState({
          inputFirstName: evt.target.value,
        })
      }
    
      updateLastNameValue(evt2) {
        this.setState({
          inputLastName: evt2.target.value,
        })
      }
    
      updateEmailValue(evt3) {
        this.setState({
          inputEmail: evt3.target.value,
        })
      }

      updatePhoneValue(evt4) {
        this.setState({
          inputPhone: evt4.target.value,
        })
      }
    
      updateJobPositionValue(evt5) {
        this.setState({
          inputJobPosition: evt5.target.value,
        })
      }
    
      updateAddressValue(evt6) {
        this.setState({
          inputAddress: evt6.target.value,
        })
      }
    
      AddContactToDb() { 
        let vardas = this.state.inputFirstName;
        let pavarde = this.state.inputLastName;
        let pastas = this.state.inputEmail;
        let telefonas = this.state.inputPhone;
        let pareigos = this.state.inputJobPosition;
        let adresas = this.state.inputAddress;
        let recId = 'temp';
        console.log(vardas +" "+ pavarde +" "+ pastas +" "+ telefonas +" "+ pareigos +" "+ adresas);
        
        /**/const todoRef = firebase.database().ref('ContactLists');
         const kontaktasDB = {
         vardas, pavarde, pastas, telefonas, pareigos, adresas,recId};
    
        let permId = todoRef.push(kontaktasDB).key;
        todoRef.child(permId).update({recId: permId});
        console.log(permId);
        /**/
    
      }
   
    render() {
        return (
            <Modal


                {...this.props}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl value={this.state.inputFirstName} onChange={evt => this.updateFirstNameValue(evt)}
                        placeholder="First Name" aria-label="First Name"
                    />
                    <FormControl value={this.state.inputLastName} onChange={evt2 => this.updateLastNameValue(evt2)}
                        placeholder="Last Name" aria-label="Last Name"
                    />
                    <FormControl value={this.state.inputEmail} onChange={evt3 => this.updateEmailValue(evt3)}
                        placeholder="Email" aria-label="Email"
                    />
                    <FormControl value={this.state.inputPhone} onChange={evt4 => this.updatePhoneValue(evt4)}
                        placeholder="Phone" aria-label="Phone"
                    />
                    <FormControl value={this.state.inputJobPosition} onChange={evt5 => this.updateJobPositionValue(evt5)}
                        placeholder="Job Position" aria-label="Job Position"
                    />
                    <FormControl value={this.state.inputAddress} onChange={evt6 => this.updateAddressValue(evt6)}
                     id="fname" name="fname"
                        placeholder="Address" aria-label="Address"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Cancel</Button>
                    <Button variant="primary" onClick={() => this.AddContactToDb()}>Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}