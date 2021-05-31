import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import EditProduct from "./components/edit-products.component";
//import Login from "./components/login";
import MainMenu from "./components/main-menu.component";
import Login from "./components/login.component";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //logino komponentai
      /*loginUsername: "",
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
    console.log("prisijunge: " + this.props.userRole);

    const LoginContainer = () => (
      <div /*className="container"*/ >
        {/*<Route exact path="/" render={() => <Redirect to="/login" />} />*/}
        <Route exact path="/" component={Login} />
      </div>
    )

    const DefaultContainer = () => (
      <div>

        <div>
          <Navbar />
          <Route path="/main" component={MainMenu} />
          {/* laikinai!!!} <Route path="/uzduotys" exact component={TasksList} />*/}
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
