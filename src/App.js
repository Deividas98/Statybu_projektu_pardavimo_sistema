import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/*import EditProduct from "./components/edit-products.component";
import CreateProject from "./components/create-project.component";
import TasksList from "./components/list-task.component";*/
//import Login from "./components/login";
//import Axios from "axios";
import MainMenu from "./components/main-menu.component";
import Login from "./components/login.component";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      /*deps2: [], contactModalShow: false,
      table: 'projectTable',*/
      //logino komponentai
      /* registerUsername: "",
     loginUsername: "",
      role: "EmptyRole",*/
      userRole: 'tuscias',
      showMainMenu: false,
      hideLogin: false
    };

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
    if (this.state.showMainMenu === true) {
      //this.setState({hideLogin: true})
      return <MainMenu />
    }
  }

  render() {
    /*
     let testcomponentas;

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
