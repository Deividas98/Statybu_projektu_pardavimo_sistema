import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Button} from 'react-bootstrap';

//ne atskiram faile nes mazas komponentas
const Project = props => (
  <tr>
    <td>{props.project.pavadinimas}</td>
    <td>{props.project.aprasymas}</td>
    <td>{props.project.grynasisPelnas}</td>
    <td>{props.project.imone}</td>
    <td>{props.project.pradziosData}</td>
    <td>{props.project.pabaigosData}</td>
    <td>{props.project.statusas}</td>
    <td>
      <Link to={"/editprj/"+props.project._id}>Redaguoti</Link> | <Button variant="danger" onClick={() => { props.deleteProject(props.project._id) }}>Ištrinti</Button>
    </td>
  </tr>
)

export default class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.deleteProject = this.deleteProject.bind(this)

    this.state = {projects: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/projects/allprojects')
      .then(response => {
        this.setState({ projects: response.data })
        //console.log(this.state.products);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteProject(id) {
    if (window.confirm('Ar tikrai norite pašalinti šį įrašą?')){
    axios.delete('http://localhost:5000/projects/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        projects: this.state.projects.filter(el => el._id !== id)
    })
  }
  }

  projectList() {
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
              <th>Grynasis pelnas</th>
              <th>Įmonė</th>
              <th>Pradžios data</th>
              <th>Pabaigos data</th>
              <th>Statusas</th>
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