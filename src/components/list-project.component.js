import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Button} from 'react-bootstrap';

//ne atskiram faile nes mazas komponentas
const Project = props => (
  <tr>
    <td>{props.project.pavadinimas}</td>
    <td>{props.project.aprasymas}</td>
    <td>{props.project.imone}</td>
    <td>{props.project.projektoSuma}</td>
    <td>{props.project.nuolaida}</td>
    <td>{props.project.busena}</td>

    <td>
      <Link to={"/editprj/"+props.project._id}>Redaguoti</Link> | <Button onClick={() => { props.deleteProject(props.project._id) }}>Ištrinti</Button>
      {/* <a href="#" onClick={() => { props.deleteProject(props.project._id) }}>Ištrinti</a> */}
    </td>
  </tr>
)

/*const Projektai = Object.keys(products).map(key =>
  <option value={key}>{products[key]}</option>
)*/

export default class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.deleteProject = this.deleteProject.bind(this)

    this.state = {projects: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/projects/')
      .then(response => {
        this.setState({ projects: response.data })
        //console.log(this.state.products);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteProject(id) {
    if (window.confirm('Ar tikrai norite pa6alinti šį įrašą?')){
    axios.delete('http://localhost:5000/projects/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        projects: this.state.projects.filter(el => el._id !== id)
    })
  }
  }

  projectList() {
    //console.log(this.state.projects.projektas);
    return this.state.projects.map(currentproject => {
      return <Project project={currentproject} deleteProject={this.deleteProject} key={currentproject._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Projektai</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Pavadinimas</th>
              <th>Aprašymas</th>
              <th>Įmonė</th>
              <th>Projekto suma</th>
              <th>Nuolaida</th>
              <th>Būsena</th>
            </tr>
          </thead>
          <tbody>
            { this.projectList() }
          </tbody>
        </table>
        
      </div>
    )
  }
}