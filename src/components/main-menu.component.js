import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';
import sysLogo from '../projectlogo.PNG';
/*import ContactTable from '../ContactTable';
import ProductTable from '../ProductTable';*/

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
      data: null,//,
      //logino komponentai
      /* registerUsername: "",
     loginUsername: "",
      loginPassword: "",
      data: null,
      role: "EmptyRole"*/
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

  render() {
    let taskModalClose = () => { this.setState({ taskShow: false }) };
    let accountModalClose = () => { this.setState({ accountShow: false }) };
    let agreementModalClose = () => { this.setState({ agreementShow: false }) };
    let projectModalClose = () => { this.setState({ projectShow: false }) };
    let productModalClose = () => { this.setState({ productShow: false }) };

    const getUser = /*async*/ () => {
      console.log("apsk");
          /*await*/  Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/user",
      }).then(response => {
        //this.setState({data: res.data});
        console.log(response.data.role);
        //console.log("role: " + res.data.role);
      }).catch(err => {
        console.log(err);
      })
    };

    return (
      <div>
        <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
          <Navbar.Brand href="/main">
          <img src={sysLogo} style={{ height: "30px", width: "30px" }} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => this.setState({ taskShow: true })} >Pridėti užduotį</Nav.Link>
              <Nav.Link onClick={() => this.setState({ accountShow: true })} >Pridėti įmonę</Nav.Link>
              <Nav.Link onClick={() => this.setState({ productShow: true })} >Pridėti produktą</Nav.Link>
              <Nav.Link onClick={() => this.setState({ projectShow: true })} >Pridėti projektą</Nav.Link>
              <Nav.Link onClick={() => this.setState({ agreementShow: true })} >Pridėti sutartį</Nav.Link>
              {/* <Nav.Link onClick={() => this.setState({ contactModalShow: true })} href="/">Add Contact</Nav.Link> */}
              {/* <Nav.Link onClick={() => this.sort()} href="#link">Sort</Nav.Link> */}
              {/* dar grizti cia */}

              {/* palikti sita komentara
              <Nav.Link href="#link">About</Nav.Link>*/}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="splitright">

          {/* dar grizti */}
          {/* <button onClick={getUser}>getuser</button> */}
          {/*baltas kairys kampas yra del situ komponentu*/}
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