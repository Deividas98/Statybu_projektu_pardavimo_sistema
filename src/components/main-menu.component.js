import React, { Component } from 'react';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';
import ContactTable from '../ContactTable';
import ProjectTable from '../ProjectTable';
import ProductTable from '../ProductTable';

import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar2 from "./navbar.component"
import ProductsList from "./products-list.component";
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
        registerPassword: "",
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

      /*taskModalClose(){
        this.setState( prevState => (
          {show: !prevState.taskShow}))  
      } */
      

    render() {
        let taskModalClose = () => {this.setState({ taskShow: false })};
        let accountModalClose = () => {this.setState({ accountShow: false })};
        let agreementModalClose = () => {this.setState({ agreementShow: false })};
        let projectModalClose = () => {this.setState({ projectShow: false })};
        let productModalClose = () => {this.setState({ productShow: false })};

    /*    let testcomponentas;
    
        if (this.state.table == 'projectTable') {
          testcomponentas = <ProjectTable/>
        } else if (this.state.table == 'productTable') {
          testcomponentas = <ProductTable />
        } else {
          testcomponentas = <ContactTable />
        }*/

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
            }).catch( err => {
               console.log(err);
            })
          };

        return (

            <div>
                
                   <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
          <Navbar.Brand href="/main">SPS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link onClick={() => this.setState({ taskShow: true })} >Pridėti užduotį</Nav.Link>
            <Nav.Link onClick={() => this.setState({ accountShow: true })} >Pridėti įmonę</Nav.Link>
            <Nav.Link onClick={() => this.setState({ productShow: true })} >Pridėti produktą</Nav.Link>
            <Nav.Link onClick={() => this.setState({ projectShow: true })} >Pridėti projektą</Nav.Link>
            <Nav.Link onClick={() => this.setState({ agreementShow: true })} >Pridėti sutartį</Nav.Link>
              {/* <Nav.Link onClick={() => this.setState({ contactModalShow: true })} href="/">Add Contact</Nav.Link> */}
              {/* <Nav.Link onClick={() => this.setState({ addModalShow: true })} href="/edit/:id">Create Project</Nav.Link> */}
              {/* <Nav.Link onClick={() => this.setState({ productModalShow: true })} href="/create">Add Product</Nav.Link> */}
              <Nav.Link onClick={() => this.sort()} href="#link">Sort</Nav.Link>


              {/* palikti sita komentara <Nav.Link href="#link">Change Date/Currency format</Nav.Link>
              <Nav.Link href="#link">About</Nav.Link>*/}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

       {/* <div className="splitleft">
         {/* <Nav defaultActiveKey="/" className="navbar">

           {/* <Nav.Link href="/home">Active</Nav.Link>*/}
            {/*<Nav.Link eventKey="link-1" onClick={this.clickHandlerContact.bind(this)}>Contacts</Nav.Link>
            <Nav.Link eventKey="link-2" onClick={this.clickHandlerProject.bind(this)}>Projects</Nav.Link>
            <Nav.Link href="/" onClick={this.clickHandlerProduct.bind(this)}>Products</Nav.Link>*/}
            {/* palikti sita komentara <Nav.Link eventKey="link-2">Link</Nav.Link>*/}

         {/*}   <Nav.Link to="/list" className="nav-link">ExcerTracker</Nav.Link>{/*buvo link to / */}
         {/* <Nav.Link to="/list" className="nav-link">Exercises</Nav.Link>{/*buvo link to / */}
         {/* <Nav.Link to="/user" className="nav-link" onClick={this.clickHandlerProduct.bind(this)}>Create User</Nav.Link>*/}
         {/* </Nav>*/}

       {/* </div>*/}

        <div className="splitright">
       
       <button onClick={getUser}>getuser</button>{/*baltas kairys kampas yra del situ komponentu*/}
          <div style={{ margin: "20px 20px 20px 20px" }}> 


        <Router>
        <Navbar2/>
      <br/>
      <Route path="/uzduotys" exact component={TasksList} />
      <Route path="/imones" exact component={AccountsList} />
      <Route path="/sutartis" exact component={AgreementsList} />
      <Route path="/projektai" exact component={ProjectsList} />
      <Route path="/list" exact component={ProductsList} />{/*pakeisti kelius!!!*/}{/*buvo link to / */}
      <Route path="/edittask/:id" component={EditTask} />
      <Route path="/editacc/:id" component={EditAccount} />
      <Route path="/editagr/:id" component={EditAgreement} />
      <Route path="/edit/:id" component={EditProduct} />
      <Route path="/editprj/:id" component={EditProject} />
      <Route path="/user"  component={CreateProject} />
      </Router>
     


        {/*testcomponentas*/}
          </div>
        </div>

        <CreateTask show={this.state.taskShow} onHide={taskModalClose} />
        <CreateAccount show={this.state.accountShow} onHide={accountModalClose} />
        <CreateAgreement show={this.state.agreementShow} onHide={agreementModalClose} />
        <CreateProject show={this.state.projectShow} onHide={projectModalClose} />
        <CreateProduct show={this.state.productShow} onHide={productModalClose} />
            </div>
        )}
}