import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//ne atskiram faile nes mazas komponentas
const Task = props => (
  <tr>
    <td>{props.task.subjektas}</td>
    <td>{props.task.pradziosData}</td>
    <td>{props.task.skirta}</td>
    <td>{props.task.pabaigosData}</td>
    <td>{props.task.komentaras}</td>

    <td>
      <Link to={"/edittask/"+props.task._id}>Redaguoti</Link> | <a href="#" onClick={() => { props.deleteTask(props.task._id) }}>Ištrinti</a>
    </td>
  </tr>
)

/*const Projektai = Object.keys(products).map(key =>
  <option value={key}>{products[key]}</option>
)*/

export default class TasksList extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this)

    this.state = {tasks: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tasks/alltaskslookup')
      .then(response => {
        this.setState({ tasks: response.data })
        //console.log(this.state.products);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTask(id) {
    axios.delete('http://localhost:5000/tasks/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        tasks: this.state.tasks.filter(el => el._id !== id)
    })
  }

  taskList() {
    console.log(this.state.tasks.projektas);
    return this.state.tasks.map(currenttask => {
      return <Task task={currenttask} deleteTask={this.deleteTask} key={currenttask._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Užduotys</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Subjektas</th>
              <th>Pradžios Data</th>
              <th>Skirta</th>
              <th>Pabaigos Data</th>
              <th>Komentaras</th>
              
            </tr>
          </thead>
          <tbody>
            { this.taskList() }
          </tbody>
        </table>
        
      </div>
    )
  }
}