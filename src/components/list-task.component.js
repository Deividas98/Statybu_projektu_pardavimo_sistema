import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Button} from 'react-bootstrap';

//ne atskiram faile nes mazas komponentas
const Task = props => (
  <tr>
    <td>{props.task.tema}</td>
    <td>{props.task.pradziosData}</td>
    <td>{props.task.skirta}</td>
    <td>{props.task.atlieka}</td>
    <td>{props.task.pabaigosData}</td>
    <td>{props.task.komentaras}</td>

    <td>
      <Link to={"/edittask/"+props.task._id}>Redaguoti</Link> | <Button variant="danger" onClick={() => { props.deleteTask(props.task._id) }}>Ištrinti</Button> 
    </td>
  </tr>
)

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
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTask(id) {
    if (window.confirm('Ar tikrai norite pašalinti šį įrašą?')){
    axios.delete('http://localhost:5000/tasks/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        tasks: this.state.tasks.filter(el => el._id !== id)
    })
  }
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
              <th>Tema</th>
              <th>Pradžios Data</th>
              <th>Skirta projektui</th>
              <th>Atlieka</th>
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