import React, { Component } from 'react'
import './message.scss'

function Message(props) {
  return (
      <div className='message-style'>
        <h1 dangerouslySetInnerHTML={{__html: props.text}} />
      </div>
    )
}

export default Message;
