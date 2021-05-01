import { Button } from 'react-bootstrap';
const React = require('react');
const ms = require('pretty-ms');


class Timer extends React.Component {
    constructor(props){
        super(props)    
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.state = {
            time: 0,
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
  }
stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
    console.log("stop" + this.state.time)
  } 
resetTimer() {
    this.setState({time: 0})
    console.log("reset")
  }

    render() {
        let start = (this.state.time == 0) ? <Button onClick={this.startTimer}>Pradėti</Button> : null    
        let stop = (this.state.isOn) ? <Button onClick={this.stopTimer}>Stabdyti</Button> : null    
        let reset = (this.state.time != 0 && !this.state.isOn) ? <Button variant="btn btn-secondary" onClick={this.resetTimer}>Atstatyti</Button> : null    
        let resume = (this.state.time != 0 && !this.state.isOn) ?  <Button onClick={this.startTimer}>Tęsti</Button> : null
       return (
         <div>
           <label>Laikas: {ms(this.state.time)}</label>
           {/* <button onClick={this.startTimer}>start</button>
         <button onClick={this.stopTimer}>stop</button>
         <button onClick={this.resetTimer}>reset</button> */}
                 {start}
        {resume}
        {stop}
        {reset}
         </div>
       );
    }
  }
  //module.exports = Timer
  export default Timer;