import React, { Component } from 'react';
import uuid from 'uuid';
import logo from './logo.svg';
import './App.css';
import Header from './Header'
import Message from './Message'
import MessageBox from './MessageBox'
import SearchBoard from './SearchBoard'
import Fuse from 'fuse.js'
import ReactDOM from 'react-dom'




class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [
        { id: uuid.v4(), text: 'Hello my name is Ross and I have 225 powers ', votes: 1 , date: 1222222222222},
        { id: uuid.v4(), text: 'Once upon a time there was a fairy and a giant ', votes: 2 , date: 1508333333333},
        { id: uuid.v4(), text: 'I don\'t ever wanna feel like I did that day But take me to the place I love, take me all the way I don\'t ever wanna feel like I did that day But take me to the place I love, take me all the way, yeah, yeah, yeah ', votes: 3 , date: 1499444444444}
      ],
      value: '',
      sortvalue: '',
      searchmessages: []
    }

    this.setState({
      searchmessages: this.state.messages.slice()
    })

    this.handleVoteUp = this.handleVoteUp.bind(this)
    this.handleVoteDown = this.handleVoteDown.bind(this)
    this.handleMessageDelete = this.handleMessageDelete.bind(this)
    this.handleAddMessage = this.handleAddMessage.bind(this)
    this.handleSortByVotes = this.handleSortByVotes.bind(this)
    this.handleSortByDate = this.handleSortByDate.bind(this)
    this.handleSearchBar = this.handleSearchBar.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
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

  handleSelectChange(event) {
    this.setState({sortvalue: event.target.value})
    const test = this.state.sortvalue

    console.log(test)

    const newMessageArray = this.state.messages.sort(function(a, b) {
      return b.test - a.test
    })

    this.setState({
      messages: newMessageArray
    })
  }

  handleSearchBar(e) {

    if (this.state.value !== "") {
      ReactDOM.render(<SearchBoard messages={this.state.searchmessages}/>, document.getElementById('sb'))
    } else {
      ReactDOM.unmountComponentAtNode(document.getElementById('sb'))
    }

    this.setState({value: e.target.value})

    var options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "text",
        ]
    }

    var fuse = new Fuse(this.state.messages, options)
    var result = fuse.search(e.target.value)


    this.setState({
      searchmessages: result
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
             <div id="sb"></div>
             <div class="panel-group">Message Board
               <div class="panel panel-default">
                 <div class="panel-heading test">Message Board
                  <select sortvalue={this.state.sortvalue} onChange={this.handleSelectChange}>
                    <option sortvalue="date">Date</option>
                    <option sortvalue="votes">Votes</option>
                  </select>
                  <button class="pull-right sort-button" onClick={this.handleSortByVotes}>Sort by Votes</button>
                  <button class="pull-right sort-button" onClick={this.handleSortByDate}>Sort by Date</button>
                  <input
                    id="search"
                    type="text"
                    class="pull-right"
                    placeholder="Search..."
                    value={this.state.value}
                    onChange={this.handleSearchBar}>
                  </input>
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
