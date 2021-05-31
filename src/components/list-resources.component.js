import React, { Component } from 'react';
import axios from 'axios';

//ne atskiram faile nes mazas komponentas
const Resource = props => (
  <tr>
    <td>{props.resource.pavadinimas}</td>
    <td>{props.resource.kiekis}</td>
  </tr>
)

export default class ResourcesList extends Component {
  constructor(props) {
    super(props);
    this.state = {resources: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/resources/')
      .then(response => {
        this.setState({ resources: response.data })
        //console.log(this.state.resources);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  resourceList() {return <Resource resource={this.state.resources} key={this.state.resources._id}/>;}

  render() {
    return (
      <div>
        <h3>Ištekliai</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Pavadinimas</th>
              <th>Kiekis</th>              
            </tr>
          </thead>
          <tbody>
            { this.resourceList() }
          </tbody>
        </table>
      </div>
    )
  }
}