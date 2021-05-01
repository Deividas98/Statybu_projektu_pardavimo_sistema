import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar2 extends Component {

  render() {
    return (
      <nav className="splitleft"/*className="navbar navbar-dark bg-dark navbar-expand-lg"*/>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li style = {{marginLeft: "30px"}} /*className="navbar-item"*/>
          <Link to="/uzduotys" className="nav-link">Užduotys</Link>
          </li>
          <li style = {{marginLeft: "30px"}} /*className="navbar-item"*/>
          <Link to="/imones" className="nav-link">Įmonės</Link>
          </li>
          <li style = {{marginLeft: "30px"}} /*className="navbar-item"*/>
          <Link to="/projektai" className="nav-link">Projektai</Link>
          </li>
          <li style = {{ marginLeft: "30px"}} /*className="navbar-item"*/>
          <Link to="/list" className="nav-link">Produktai</Link>
          </li>
          <li style = {{marginLeft: "30px"}} /*className="navbar-item"*/>
          <Link to="/sutartis" className="nav-link">Sutartys</Link>
          </li>
          <li style = {{marginLeft: "30px"}} /*className="navbar-item"*/>
          <Link to="/istekliai" className="nav-link">Ištekliai</Link>
          </li>
          {/* <li style = {{marginLeft: "30px"}} >
          <Link to="/user" className="nav-link">Create User</Link>
          </li> */}
        </ul>
        </div>
      </nav>
    );
  }
}