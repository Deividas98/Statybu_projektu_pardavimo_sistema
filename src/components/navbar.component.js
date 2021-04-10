import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar2 extends Component {

  render() {
    return (
      <nav className="splitleft"/*className="navbar navbar-dark bg-dark navbar-expand-lg"*/>
        <Link to="/" className="navbar-brand">ExcerTracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li style = {{ marginLeft: "30px"}} /*className="navbar-item"*/>
          <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li style = {{marginLeft: "30px"}} /*className="navbar-item"*/>
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li style = {{marginLeft: "30px"}} /*className="navbar-item"*/>
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}