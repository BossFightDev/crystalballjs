import Codemirror from 'react-codemirror';
import React, {Component} from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript.js';
const io = require('socket.io-client');
const socket = io()


class Code extends Component {
  constructor(props) {
    super();
    this.state = {
      code: ''
    }
    socket.on('receive code', (payload) => {
      this.updateCadeFromSockets(payload)
    })
  }

  updateFromSockets = (payload) => {
    this.setState({code: payload.newCode})
  }
  updateCodeState(newText) {
    this.setState({
      code: newText
    })
    socket.emit('coding event', {
      room: 1,
      newCode: newText
    })
  }
  componentDidMount() {
    socket.emit('room', {
      room: 1
    });
    this.setState({ users: users})
  }
  componentWillUnmount() {
    socket.emit('leave room', {
      room: 1
    })
  }

  render(){
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'monokai'
    }
    return(
      <div>
        <Codemirror
          value = {this.state.code}
          onChange={ this.updateCodeState.bind(this)}
          options={options} />
      </div>
    )
  }
}

export default Code;