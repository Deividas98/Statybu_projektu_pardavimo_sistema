import Axios from "axios";
import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import projectLogo from '../projectlogo.PNG';
import '../App.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerUsername: "",
      registerPassword: "",
      loginUsername: "",
      loginPassword: "",
      data: null,
      userRole: "EmptyRole",
    };

  }

  render() {
    const register = () => {
      Axios({
        method: "POST",
        data: {
          username: this.state.registerUsername,//registerUsername,
          password: this.state.registerPassword,//registerPassword,
          role: "EmptyRole"
        },
        withCredentials: true,
        url: "http://localhost:5000/register",
      }).then((res) => console.log(res))
        .catch(error => console.log(error));
    };
    const login = () => {
      Axios({
        method: "POST",
        data: {
          username: this.state.loginUsername,
          password: this.state.loginPassword,
          role: "EmptyRole"//this.state.userRole
        },
        withCredentials: true,
        url: "http://localhost:5000/login",
      }).then(function (response) {
        console.log(response);
        if (response.data == 'Successfully Authenticated' /*res.status == 200*/) {//AR SAUGU TAIP NEPRALEISTI??????? papildyti lyginima pagal statusa
          //console.log("perjungti i kita langa");
          window.location = "/main"
        }
        //else    window.location = "/"
      })
        .catch(error => console.log(error));

      //this.props.getUserRole(this.state.userRole);
    };
    const getUser = () => {
      Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/user",
      }).then((res) => {
        this.setState({ data: res.data });
        console.log(res.data);
      });
    };


    return (
      <div className="loginForm">
        <span>
          <img src={projectLogo} alt="Logo" height="120px" width="120px" />
          <Form>
            <Form.Group controlId="formRegistracija" classname="loginForm2">
              <h1>Registracija</h1>
              <Row>
                <Col>
                  <Form.Control type="email" placeholder="Įveskite elektroninį paštą"
                    onChange={(e) => this.setState({ registerUsername: e.target.value })} />
                </Col>
                <Col>
                  <Form.Control type="password" placeholder="Įveskite slaptažodį"
                    onChange={(e) => this.setState({ registerPassword: e.target.value })} />
                </Col>
                <Button variant="primary" type="button" onClick={register}>Sukurti</Button>

              </Row>
            </Form.Group>

            <Form.Group controlId="formPrisijungimas">
              <h1>Prisijungimas</h1>
              <Row>
                <Col>
                  <Form.Control type="email" placeholder="Įveskite elektroninį paštą"
                    onChange={(e) => this.setState({ loginUsername: e.target.value })} />
                </Col>
                <Col>
                  <Form.Control type="password" placeholder="Įveskite slaptažodį"
                    onChange={(e) => this.setState({ loginPassword: e.target.value })} />
                </Col>
                <Button variant="primary" type="button" onClick={login}>Prisijungti</Button>
              </Row>
            </Form.Group>

            <Form.Group controlId="formEsamasNaudotojas">
              <h1>Gauti naudotoją</h1>
              <Button variant="primary" type="button" onClick={getUser}>Gauti naudotoją</Button>
              {this.state.data ? <h1>Welcome Back {this.state.data.username}</h1> : null}
            </Form.Group>
          </Form>
        </span>
      </div>

    )
  }
}

