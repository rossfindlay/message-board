import React, { Component } from 'react';
import uuid from 'uuid';
import logo from './logo.svg';
import './App.css';
import Header from './Header'
import Message from './Message'
import MessageBox from './MessageBox'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [
        { id: uuid.v4(), text: 'Hello ', votes: 1 },
        { id: uuid.v4(), text: 'Hello ', votes: 2 },
        { id: uuid.v4(), text: 'Hello ', votes: 3 }
      ]
    }

    this.handleVoteUp = this.handleVoteUp.bind(this)
    this.handleVoteDown = this.handleVoteDown.bind(this)
    this.handleMessageDelete = this.handleMessageDelete.bind(this)
    this.handleAddMessage = this.handleAddMessage.bind(this)
  }

  handleVoteUp(id) {
    const message = this.state.messages.find(message => message.id === id)

    message.votes = message.votes + 1

    this.setState({
      messages: this.state.messages
    })
  }

  handleVoteDown(id) {
    const message = this.state.messages.find(message => message.id === id)

    message.votes = message.votes - 1

    this.setState({
      messages: this.state.messages
    })
  }

  handleMessageDelete(id) {
    const newMessageArray = this.state.messages.filter(message => message.id !== id)

    this.setState({
      messages: newMessageArray
    })
  }

  handleAddMessage(text) {
    const message = { id: uuid.v4(), text: text, votes: 0 }

    this.state.messages.push(message)

    this.setState({
      messages: this.state.messages
    })
  }

  render() {
    return (
      <div className="App">
        <Header title={"Ross' Message Board"} />

           <div class="container">
            <MessageBox
              onAddMessage={this.handleAddMessage}
            />

             <div class="panel-group">
               <div class="panel panel-default">
                 <div class="panel-heading">Message Board</div>
                 <div class="panel-body">
                   <ul class="message-board">
                     {this.state.messages.map(message => {
                        return (
                          <Message
                            text={message.text}
                            votes={message.votes}
                            onVoteUpApp={this.handleVoteUp}
                            onVoteDownApp={this.handleVoteDown}
                            onMessageDeleteApp={this.handleMessageDelete}
                            id={message.id}
                          />
                        )}
                      )}
                   </ul>
                 </div>
               </div>
             </div>
           </div>

      </div>
    );
  }
}

export default App;
