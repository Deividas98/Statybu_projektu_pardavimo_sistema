import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import Table from './Table';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, InputGroup, FormControl } from 'react-bootstrap';
import ContactTable from './ContactTable';
import ProjectTable from './ProjectTable';
import ProductTable from './ProductTable';
//import { ReactComponent } from '*.svg';
import EditContactForm from './EditContactForm.js';
import firebase from './util/firebase';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';

import AddProject from './AddProjectModal';

import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Navbar2 from "./components/navbar.component"
import ProductsList from "./components/products-list.component";
import EditProduct from "./components/edit-products.component";
import CreateProduct from "./components/create-product.component";
import CreateProject from "./components/create-project.component";
import TasksList from "./components/list-task.component";
import AccountsList from "./components/list-account.component";
//import Login from "./components/login";
import Axios from "axios";
import MainMenu from "./components/main-menu.component";
import { useHistory } from "react-router-dom";
import Login from "./components/login.component";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      /*deps: [], addModalShow: false,
      deps2: [], contactModalShow: false,
      deps3: [], productModalShow: false,
      table: 'projectTable',*/
      //logino komponentai
      /* registerUsername: "",
     registerPassword: "",
     loginUsername: "",
      loginPassword: "",
      data: null,
      role: "EmptyRole",*/
      userRole: 'tuscias',
      showMainMenu: false,
      hideLogin: false
    };

    //const [show, setShow] = useState(false);

    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    this.handleClickLogin = this.handleClickLogin.bind(this);
  }

  getUserRole = (data) => {
    this.setState({ userRole: data })
  }

  handleClickLogin() {
    this.setState({ hideLogin: true } /*state => ({hideLogin: !state.hideLogin })*/);
    console.log("hide login funkcijoje: " + this.state.hideLogin);
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

  renderMainMenu() {
    if (this.state.showMainMenu == true) {
      //this.setState({hideLogin: true})
      return <MainMenu />
    }
  }


  /*HomeButton() {
   const history = useHistory();
 
   function navigateToMainMenu() {
     history.push("/main");
   }
 }*/


  render() {
    /*
     let testcomponentas;

     if (this.state.table == 'projectTable') {
       testcomponentas = <ProjectTable/>
     } else if (this.state.table == 'productTable') {
       testcomponentas = <ProductTable />
     } else {
       testcomponentas = <ContactTable />
     }*/


    console.log("prisijunge: " + this.props.userRole);

    const LoginContainer = () => (
      <div /*className="container"*/ >
        {/*<Route exact path="/" render={() => <Redirect to="/login" />} />*/}
        <Route exact path="/" component={Login} />
      </div>
    )


    const DefaultContainer = () => (
      <div>

        <div /*className="container"*/>
          <Navbar />
          <Route path="/main" component={MainMenu} />
         {/* laikinai!!!} <Route path="/uzduotys" exact component={TasksList} />
          <Route path="/list" component={ProductsList} />
          <Route path="/edit/:id" component={EditProduct} />
          <Route path="/create" component={CreateProduct} />*/}


        </div>
      </div>
    )

    return (
      <div>
        <Router>
          <Switch>
            <div className="App">
              <Route exact path="/" component={LoginContainer} />
              <Route component=/*{() => <DefaultContainer userRole={this.props.userRole}/>}*/ {DefaultContainer} />

            </div>
          </Switch>
        </Router>
      </div>

    );
  }
}
export default App;

    /*  <div>

{/*this.renderMainMenu()*/{/* -------V2-------}

         
{/*  </Nav>
          </Navbar.Collapse>
            </Navbar>*/}


{/*} <div className="splitleft">

          <Nav defaultActiveKey="/" className="navbar">

           {/* <Nav.Link href="/home">Active</Nav.Link>*/}
{/*<Nav.Link eventKey="link-1" onClick={this.clickHandlerContact.bind(this)}>Contacts</Nav.Link>
            <Nav.Link eventKey="link-2" onClick={this.clickHandlerProject.bind(this)}>Projects</Nav.Link>
            <Nav.Link href="/" onClick={this.clickHandlerProduct.bind(this)}>Products</Nav.Link>*/}
{/* palikti sita komentara <Nav.Link eventKey="link-2">Link</Nav.Link>*/ }

 
      {/*  </div>*/}


{/*  <div className="splitright">
        <div style={{ margin: "20px 20px 20px 20px" }}>

  {testcomponentas}
            

          </div>
        </div>
*/}
{/*  </div>

    );*/{/* }
  }

}

export default App;*/}
}
