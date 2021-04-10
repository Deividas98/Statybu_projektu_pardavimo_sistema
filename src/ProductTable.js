import React, { Component } from 'react'
//import { Table, Button, Modal } from 'reactstrap';
import firebase from './util/firebase';
import BootstrapTable from "react-bootstrap-table-next";
import { Modal, Button, Row, Col, Form, FormControl } from 'react-bootstrap';
/*is componen product list js*/
import { Link } from 'react-router-dom';
import axios from 'axios';

//ne atskiram faile nes mazas komponentas
const Product = props => (
  <tr>
    <td>{props.product.pavadinimas}</td>
    <td>{props.product.aprasymas}</td>
    <td>{props.product.projektas}</td>
    <td>{props.product.suma}</td>
    <td>{props.product.kiekis}</td>
<td>{props.product.kaina}</td>
        {/*<td>{props.product.inventory_docs[0]}</td>
    <td>{props.product.date.substring(0,10)}</td>*/}
    <td>
      <Link to={"/edit/"+props.product._id}>edit</Link> | <a href="#" onClick={() => { props.deleteProduct(props.product._id) }}>delete</a>
    </td>
  </tr>
)
/*is componen product list js*/

/*const productColumns = [{
  dataField: 'pavadinimas',
  text: 'Name'
}, {
  dataField: 'kaina',
  text: 'Price'
}, {
  dataField: 'kiekis',
  text: 'Quantity'
}, {
  dataField: 'suma',
  text: 'Sum'
}, {
  dataField: 'projektas',
  text: 'Project'
}, {
  dataField: 'aprasymas',
  text: 'Description'
}, {
  dataField: 'sukurimodata',
  text: 'Created On'
},];*/

export class ProductTable extends Component {
  constructor(props) {
    super(props);

    /*is componen product list js*/
    this.deleteProduct = this.deleteProduct.bind(this)
    this.state = {products: []};
    /*is componen product list js*/

   /* this.projectRef = React.createRef();
    this.state = {
      productList: [],

      depsPrj: [], projectModalShow: false,
      show: false,
      pavadinimas: '',
      aprasymas: '',
      kiekis: '',
      kaina: '',
      produktoId: '',
      projektas: '',
      deleteConfirm: false,
    }*/
  }

  /*showModal = e => {
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

  updateNameValue(evt) {
    this.setState({
      pavadinimas: evt.target.value,
    })
  }

  updateQuantityValue(evt2) {
    this.setState({
      kiekis: evt2.target.value,
    })
  }

  updateDescriptionValue(evt3) {
    this.setState({
      aprasymas: evt3.target.value,
    })
  }

  updatePriceValue(evt4) {
    this.setState({
      kaina: evt4.target.value,
    })
  }

  updateProjectValue(evt5) {
    this.setState({
      projektas: evt5.target.value,
    })
  }

  onUpdate() {
    var db = firebase.database().ref("ProductsLists");
    db.child(this.state.produktoId).update({
      pavadinimas: this.state.pavadinimas, aprasymas: this.state.aprasymas, kiekis: this.state.kiekis,
      projektas: this.projectRef.current.value, kaina: this.state.kaina,
      suma: this.state.kaina * this.state.kiekis
    }); //geras
  }

  onDelete() {
    var db = firebase.database().ref("ProductsLists");
    db.child(this.state.produktoId).remove();
  }

  componentWillMount() {
    this.setState({ productList: [] });
  }

  componentDidMount() {
    var counter = 0;
    this.setState({ productList: [] });
    firebase.database().ref("ProductsLists").on('value', (snapshot) => {
      let productList = [];//product list
      snapshot.forEach(snap => {
        counter++;
        console.log(snap.val());
        console.log(snap.key);//recod id!!!
        productList.push(snap.val());
      });

      this.setState({ productList: productList });
    });
    console.log(counter);
  }*/

  /*is componen product list js*/
  componentDidMount() {
    axios.get('http://localhost:5000/products/getProjects')
      .then(response => {
        this.setState({ products: response.data })
        //console.log(this.state.products);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteProduct(id) {
    axios.delete('http://localhost:5000/products/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        products: this.state.products.filter(el => el._id !== id)
    })
  }

  productList() {
    console.log(this.state.products.projektas);
    return this.state.products.map(currentproduct => {
      return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>;
    })
  }
  /*is componen product list js*/


  /*render() {

    const { depsPrj } = this.state;
    //let projectModalClose = () => this.setState({ projectModalShow: false });

    const rowEvents = {
      onClick: (e, row) => {
        console.log(row);
        this.setState({
          pavadinimas: row.pavadinimas,
          aprasymas: row.aprasymas,
          kiekis: row.kiekis,
          kaina: row.kaina,
          projektas: row.projektas,
          produktoId: row.recId,
        });

        console.log(this.state.pavadinimas);
        console.log(this.state.produktoId);
        console.log(this.state.projektas);
        this.showModal();
        //e => {this.showModal();}
      },
    };*/

    render(){
    return (
      <div>
{/*
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
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl onChange={evt => this.updateNameValue(evt)} value={this.state.pavadinimas} />

            <FormControl onChange={evt => this.updateQuantityValue(evt)} value={this.state.kiekis} />

            <FormControl onChange={evt => this.updatePriceValue(evt)} value={this.state.kaina} />

            <FormControl as="select" custom ref={this.projectRef}>
              <option value={this.state.projektas}>{this.state.projektas}</option>
              <option value="Projektas 2">Projektas 2</option>
              <option value="Projektas 3">Projektas 3</option>
              <option value="Projektas 4">Projektas 4</option>
            </FormControl>

            <FormControl onChange={evt => this.updateDescriptionValue(evt)} value={this.state.aprasymas} as="textarea" />



          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ show: false })}>Cancel</Button>
            <Button variant="primary" onClick={() => this.onUpdate()}>Update</Button>
            <Button variant="danger" onClick={() => this.showConfirmDelete()}>Delete</Button>
          </Modal.Footer>
        </Modal>

        <BootstrapTable keyField='id' data={this.state.productList} columns={productColumns} rowEvents={rowEvents} />/*}{/*surendinama lentele*/}
        
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Pavadinimas</th>
              <th>Aprasymas</th>
              <th>Projektas</th>
              <th>Suma</th>
              <th>Kiekis</th>
              <th>Kaina</th>
            </tr>
          </thead>
          <tbody>
            { this.productList() }
          </tbody>
        </table>


      </div>
    )

  }
}

export default ProductTable