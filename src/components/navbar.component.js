import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tasklogo from '../tasks.jpg';
import accountlogo from '../account.png';
import projectlogo from '../project.png';
import productlogo from '../product.png';
import agreementlogo from '../agreement.png';
import resourcelogo from '../resource.png';
import '../App.css';

export default class Navbar2 extends Component {

  render() {
    return (
      <nav className="splitleft"/*className="navbar navbar-dark bg-dark navbar-expand-lg"*/>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto" style = {{ marginTop: "30px"}}>
        <li>
          <Link to="/uzduotys" className='navbarbutton'>Užduotys 
          <img src={tasklogo} style={{ height: "20px", width: "20px" }} alt='logo'/></Link>
          </li>
          <li>
          <Link to="/imones" className='navbarbutton'>Įmonės 
          <img src={accountlogo} style={{ height: "20px", width: "20px" }} alt='logo'/></Link>
          </li>
          <li>
          <Link to="/projektai" className='navbarbutton'>Projektai 
          <img src={projectlogo} style={{ height: "20px", width: "20px" }} alt='logo'/></Link>
          </li>
          <li>
          <Link to="/list" className='navbarbutton'>Produktai 
          <img src={productlogo} style={{ height: "20px", width: "20px" }} alt='logo'/></Link>
          </li>
          <li>
          <Link to="/sutartis" className='navbarbutton'>Sutartys 
          <img src={agreementlogo} style={{ height: "20px", width: "20px" }} alt='logo'/></Link>
          </li>
          <li>
          <Link to="/istekliai" className='navbarbutton'>Ištekliai 
          <img src={resourcelogo} style={{ height: "20px", width: "20px" }} alt='logo'/></Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}