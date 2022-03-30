import React, { Component } from 'react'
import './message.scss'

function Message(props) {
  return (
      <div className={props.style}>
        <h1 dangerouslySetInnerHTML={{__html: props.text}} />
      </div>
    )
}

export default Message;
