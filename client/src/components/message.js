import React, { Component } from 'react'

const message = {
  display: "block",
  borderStyle: "solid",
  borderRadius: "25px",
  textAlign: "center",
  borderColor: "#cd3c45",
  fontFamily: "'Lucida Console', 'Courier New', monospace",
  color: "#cd3c45",
  fontSize: "10px",
  marginBottom: "50px",
};

class Message extends Component {
  render() {
    return (
      <div style={message}>
        <h1>{this.props.text}</h1>
      </div>
    )
  }
}

export default Message;
