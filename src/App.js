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
        { id: uuid.v4(), text: 'Hello1 ', votes: 1 , date: 2222222},
        { id: uuid.v4(), text: 'Hello2 ', votes: 2 , date: 3333333},
        { id: uuid.v4(), text: 'Hello3 ', votes: 3 , date: 4444444}
      ]
    }

    this.handleVoteUp = this.handleVoteUp.bind(this)
    this.handleVoteDown = this.handleVoteDown.bind(this)
    this.handleMessageDelete = this.handleMessageDelete.bind(this)
    this.handleAddMessage = this.handleAddMessage.bind(this)
    this.handleSortByVotes = this.handleSortByVotes.bind(this)
    this.handleSortByDate = this.handleSortByDate.bind(this)
    this.handleNewDate = this.handleNewDate.bind(this)

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

    const message = { id: uuid.v4(), text: text, votes: 0 , date: Date.now() }

    this.state.messages.push(message)

    this.setState({
      messages: this.state.messages
    })
  }

  handleSortByVotes() {
    const newMessageArray = this.state.messages.sort(function(a, b) {
      return b.votes - a.votes
    })

    this.setState({
      messages: newMessageArray
    })
  }

  handleSortByDate() {
    const newMessageArray = this.state.messages.sort(function(a, b) {
      return b.date - a.date
    })

    this.setState({
      messages: newMessageArray
    })
  }

  handleNewDate(date) {

    let dd = date.getDate()
    let mm = date.getMonth()+1
    let yyyy = date.getFullYear()

    if (dd < 10) {
      dd = '0' + dd //need to change to proper format
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    date = dd + '/' + mm + '/' + yyyy


  }

  render() {
    return (
      <div className="App">
        <Header title={"Ross' Message Board"} />

           <div class="container">
            <MessageBox
              onAddMessage={this.handleAddMessage}
            />

             <div class="panel-group">Message Board
               <div class="panel panel-default">
                 <div class="panel-heading test">Message Board
                  <button class="pull-right sort-button" onClick={this.handleSortByVotes}>Sort by Votes</button>
                  <button class="pull-right sort-button" onClick={this.handleSortByDate}>Sort by Date</button>
                  <input class="pull-right" placeholder="Search..."></input>
                  </div>
                 <div class="panel-body">
                   <ul class="message-board">
                     {this.state.messages.map(message => {
                        return (
                          <Message
                            text={message.text}
                            votes={message.votes}
                            date={message.date}
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
