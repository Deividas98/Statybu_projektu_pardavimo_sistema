import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';
import sysLogo from '../projectlogo.PNG';
//import ProductTable from '../ProductTable';

import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar2 from "./navbar.component"
import ProductsList from "./products-list.component";
import ResourcesList from "./list-resources.component";
import EditProduct from "./edit-products.component";
import CreateProduct from "./create-product.component";
import CreateProject from "./create-project.component";
import CreateTask from "./create-task.component";
import CreateAccount from "./create-account.component";
import CreateAgreement from "./create-agreement.component";
import TasksList from "./list-task.component";
import AccountsList from "./list-account.component";
import AgreementsList from "./list-agreement.component";
import ProjectsList from "./list-project.component";
import EditTask from "./edit-task.component";
import EditAccount from "./edit-account.component";
import EditAgreement from "./edit-agreement.component";
import EditProject from "./edit-project.component";
import Axios from "axios";

export default class MainMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productModalShow: false,
      taskShow: false,
      accountShow: false,
      agreementShow: false,
      productShow: false,
      projectShow: false,
      table: 'projectTable',
      data: null,
      role: ""
    }
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

  componentDidMount(){
    Axios({ method: "GET", withCredentials: true, url: "http://localhost:5000/user", })
    .then(response => {
      this.setState({role: response.data.role});
      console.log(response.data.role);
    }).catch(err => { console.log(err); })
  }

  render() {
    let taskModalClose = () => { this.setState({ taskShow: false }) };
    let accountModalClose = () => { this.setState({ accountShow: false }) };
    let agreementModalClose = () => { this.setState({ agreementShow: false }) };
    let projectModalClose = () => { this.setState({ projectShow: false }) };
    let productModalClose = () => { this.setState({ productShow: false }) };

    return (
      <div>
        <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
          <Navbar.Brand href="/main">
          <img src={sysLogo} style={{ height: "30px", width: "30px" }} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {this.state.role === 'Vadovas' ? (<Nav.Link onClick={() => this.setState({ taskShow: true })} >Pridėti užduotį</Nav.Link>) : (<></>)}
              <Nav.Link onClick={() => this.setState({ accountShow: true })} >Pridėti įmonę</Nav.Link>
              <Nav.Link onClick={() => this.setState({ productShow: true })} >Pridėti produktą</Nav.Link>
              <Nav.Link onClick={() => this.setState({ projectShow: true })} >Pridėti projektą</Nav.Link>
              {this.state.role === 'Vadovas' ? (<Nav.Link onClick={() => this.setState({ agreementShow: true })} >Pridėti sutartį</Nav.Link>) : (<></>)}
            </Nav>
            <Nav className="ml-auto">
            <Nav.Link onClick={()=> window.location = "/" } >Atsijungti</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="splitright">
          <div>
            <Router>
              <Navbar2 />
              <br />
              <Route path="/uzduotys" exact component={TasksList} />
              <Route path="/imones" exact component={AccountsList} />
              <Route path="/sutartis" exact component={AgreementsList} />
              <Route path="/projektai" exact component={ProjectsList} />
              <Route path="/istekliai" exact component={ResourcesList} />
              <Route path="/list" exact component={ProductsList} />
              <Route path="/edittask/:id" component={EditTask} />
              <Route path="/editacc/:id" component={EditAccount} />
              <Route path="/editagr/:id" component={EditAgreement} />
              <Route path="/edit/:id" component={EditProduct} />
              <Route path="/editprj/:id" component={EditProject} />
              <Route path="/user" component={CreateProject} />
            </Router>
          </div>
        </div>

        <CreateTask show={this.state.taskShow} onHide={taskModalClose} />
        <CreateAccount show={this.state.accountShow} onHide={accountModalClose} />
        <CreateAgreement show={this.state.agreementShow} onHide={agreementModalClose} />
        <CreateProject show={this.state.projectShow} onHide={projectModalClose} />
        <CreateProduct show={this.state.productShow} onHide={productModalClose} />
      </div>
    )
  }
}