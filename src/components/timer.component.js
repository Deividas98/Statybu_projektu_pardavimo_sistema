import { Button } from 'react-bootstrap';
const React = require('react');
const ms = require('pretty-ms');

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.state = {
      time: Date.parse(props.laikas2),
      start: 0,
      isOn: false
    }
  }

  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1)
    console.log("start")
    console.log(this.state.time);
  }
  stopTimer() {
    this.setState({ isOn: false })
    clearInterval(this.timer)
    //this.onTrigger()
    this.sendData()
    console.log("stop" + this.state.time)
  }
  resetTimer() {
    this.setState({ time: 0 })
    console.log("reset")
  }

sendData = () => {
  this.props.parentCallback(this.state.time);
}

  render() {
    let start = (this.state.time === 0) ? <Button onClick={this.startTimer}>Pradėti</Button> : null
    let stop = (this.state.isOn) ? <Button onClick={this.stopTimer}>Stabdyti</Button> : null
    let reset = (this.state.time !== 0 && !this.state.isOn) ? <Button variant="btn btn-secondary" onClick={this.resetTimer}>Atstatyti</Button> : null
    let resume = (this.state.time !== 0 && !this.state.isOn) ? <Button onClick={this.startTimer}>Tęsti</Button> : null
    return (
      <div>
        <label>Laikas: {ms(this.state.time) /*this.state.time*/}</label> 
        {/* atejo: {this.props.laikas2, Date.parse(this.props.laikas2)} */}
        {start}
        {resume}
        {stop}
        {reset}
      </div>
    );
  }
}
export default Timer;