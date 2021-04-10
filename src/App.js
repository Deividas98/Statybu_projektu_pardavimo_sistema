import './App.css';
import React, { useEffect, useState } from 'react';
import { render } from "react-dom";
//import {Table, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button, Modal } from 'reactstrap';
//import Table from './Table';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { AddModal } from './AddModal.js';
import { Navbar, Nav, NavDropdown, InputGroup, FormControl } from 'react-bootstrap';
import ContactTable from './ContactTable';
import ProjectTable from './ProjectTable';
import ProductTable from './ProductTable';
//import { ReactComponent } from '*.svg';
import { ContactModal } from './ContactModal.js';
import { ProductModal } from './ProductModal.js';
import EditContactForm from './EditContactForm.js';
import firebase from './util/firebase';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';

import AddProject from './AddProjectModal';

import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar2 from "./components/navbar.component"
import ProductsList from "./components/products-list.component";
import EditProduct from "./components/edit-products.component";
import CreateProduct from "./components/create-product.component";
import CreateProject from "./components/create-project.component";

/*function Example() {
  const [show, setShow] = useState(false);

    </>
  );
}*/

//render(<Example />);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deps: [], addModalShow: false,
      deps2: [], contactModalShow: false,
      deps3: [], productModalShow: false,
      table: 'projectTable',
      sortAZ: true
    }
    //const [show, setShow] = useState(false);

    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
  }

  clickHandlerContact() {
    this.setState({
      table: 'contactTable'
    })
  }

  clickHandlerProject() {
    this.setState({
      table: 'projectTable'
    })
  }

  clickHandlerProduct() {
    this.setState({
      table: 'productTable'
    })
  }

  sort(){
    /*bugs =*/ this.setState(prevState => ({
      sortAZ: !prevState.sortAZ
    }));
    //window.location.reload(false);
  }
  



  render() {
    const { deps } = this.state;
    const { deps2 } = this.state;
    const { deps3 } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let contactModalClose = () => this.setState({ contactModalShow: false });
    let productModalClose = () => this.setState({ productModalShow: false });
    let testcomponentas;

    console.log("Sort AZ? - " + this.state.sortAZ);
    //====
    /*const products2 = [
      {
        "id": "10",
        "name": "minivan",
        "price": 333
        
      },
      {
        "id": "10",
        "name": "station wagon",
        "price": 100
      }
     ];
    const columns2 = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];*/
    //======


    if (this.state.table == 'projectTable') {
      testcomponentas = <ProjectTable data3={this.state.sortAZ}/>
    } else if (this.state.table == 'productTable') {
      testcomponentas = <ProductTable />
    } else {
      testcomponentas = <ContactTable />
    }

    return (
      

     

     

      <div>
        {/*nurodzius kelia urkraus tam tikra komponenta pvz editproduct*/}
 {/*<Router>
      <div className="container">
      <Navbar2 />
      <br/>
      <Route path="/" exact component={ProductsList} />{/*pakeisti kelius!!!*/}
      {/*<Route path="/edit/:id" component={EditProduct} />
      <Route path="/create" component={CreateProduct} />
      <Route path="/user" component={CreateProject} />
      </div>
    </Router>*/}


        <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
          <Navbar.Brand href="#home">Sales System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => this.setState({ contactModalShow: true })} href="/">Add Contact</Nav.Link>
              <Nav.Link onClick={() => this.setState({ addModalShow: true })} href="/edit/:id">Create Project</Nav.Link>
              <Nav.Link onClick={() => this.setState({ productModalShow: true })} href="/create">Add Product</Nav.Link>
              <Nav.Link onClick={() => this.sort()} href="#link">Sort</Nav.Link>


              {/* palikti sita komentara <Nav.Link href="#link">Change Date/Currency format</Nav.Link>
              <Nav.Link href="#link">About</Nav.Link>*/}
            </Nav>
          </Navbar.Collapse>
        </Navbar>


        <div className="splitleft">

          <Nav defaultActiveKey="/home" className="navbar">

            <Nav.Link href="/home">Active</Nav.Link>
            <Nav.Link eventKey="link-1" onClick={this.clickHandlerContact.bind(this)}>Contacts</Nav.Link>
            <Nav.Link eventKey="link-2" onClick={this.clickHandlerProject.bind(this)}>Projects</Nav.Link>
            <Nav.Link href="/" onClick={this.clickHandlerProduct.bind(this)}>Products</Nav.Link>
            {/* palikti sita komentara <Nav.Link eventKey="link-2">Link</Nav.Link>*/}


            <Nav.Link to="/" className="navbar-brand">ExcerTracker</Nav.Link>
 
          <Nav.Link to="/" className="nav-link">Exercises</Nav.Link>

          <Nav.Link to="/create" className="nav-link">Create Exercise Log</Nav.Link>

          <Nav.Link to="/user" className="nav-link" onClick={this.clickHandlerProduct.bind(this)}>Create User</Nav.Link>
          </Nav>

{/*<Navbar2/>*/}
          

        </div>


        

        <div className="splitright">

          <div style={{ margin: "20px 20px 20px 20px" }}>
 {/* palikti sita komentararender(<Example />);*/}

        {/* palikti sita komentara <EditContactForm/>  <BootstrapTable keyField='id' data={ products2 } columns={ columns2 }/>  */}


        <Router>
        <Navbar2/>
      <br/>
      <Route path="/" exact component={ProductsList} />{/*pakeisti kelius!!!*/}
      <Route path="/edit/:id" component={EditProduct} />
      <Route path="/create" component={CreateProduct} />
      <Route path="/user" component={CreateProject} />
      </Router>
     


        {testcomponentas}
            

          </div>
        </div>


        <AddModal  show={this.state.addModalShow} onHide={addModalClose} />
        <ContactModal show={this.state.contactModalShow} onHide={contactModalClose} />
        <ProductModal show={this.state.productModalShow} onHide={productModalClose} />
      </div>

    );
  }

}

export default App;
