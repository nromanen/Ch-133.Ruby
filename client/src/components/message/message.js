import React, { Component } from 'react'
import './message.scss'

class Message extends Component {
  render() {
    return (
      <div className='message-style'>
        <h1>{this.props.text}</h1>
      </div>
    )
  }
}

export default Message;
