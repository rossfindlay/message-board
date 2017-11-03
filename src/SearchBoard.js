import React, { Component } from 'react'
import Message from './Message'

class SearchBoard extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div class="panel-group">
        <div class="panel panel-default">
          <div class="panel-heading test">Search Results:</div>
          <div class="panel-body">
            <ul class="message-board">
              {this.props.messages.map(message => {
                 return (
                   <Message
                     text={message.text}
                     votes={message.votes}
                     date={message.date}
                     id={message.id}
                   />
                 )}
               )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBoard
