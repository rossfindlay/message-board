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
import MessageEdit from './MessageEdit'




class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [
        { id: uuid.v4(), text: 'There’s a passage I got memorized. Ezekiel 25:17. “The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of the darkness, for he is truly his brother’s keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy My brothers. And you will know I am the Lord when I lay My vengeance upon you.”', votes: 10 , date: 1222222222222},
        { id: uuid.v4(), text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue malesuada neque, in tristique nisi iaculis ac. Vivamus porttitor finibus arcu. Duis auctor interdum lectus, ut finibus dui finibus et. Curabitur semper nibh sit amet diam faucibus, vitae aliquam tellus dapibus. Maecenas consectetur magna velit, nec rutrum purus blandit vel. ', votes: 2 , date: 1508333333333},
        { id: uuid.v4(), text: 'Test paragraph three', votes: 12 , date: 1499444444444}
      ],
      searchValue: '',
      sortValue: '',
      searchMessages: [],
      selectedMessage: '',
      selectedId: '',
      showMessageEdit: false,
      searchText: ''
    }

    this.handleVoteUp = this.handleVoteUp.bind(this)
    this.handleVoteDown = this.handleVoteDown.bind(this)
    this.handleMessageDelete = this.handleMessageDelete.bind(this)
    this.handleAddMessage = this.handleAddMessage.bind(this)
    this.handleSortByVotes = this.handleSortByVotes.bind(this)
    this.handleSortByDate = this.handleSortByDate.bind(this)
    this.handleSearchBar = this.handleSearchBar.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleMessageClickApp = this.handleMessageClickApp.bind(this)
    this.handleConfirmChange = this.handleConfirmChange.bind(this)
    this.handleMessageEditCancel = this.handleMessageEditCancel.bind(this)
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

  handleSelectChange(e) {

    const test = e.target.value.toLowerCase()

    console.log(test)

    const newMessageArray = this.state.messages.sort(function(a, b) {
      return b.votes - a.votes
    })

    this.setState({
      messages: newMessageArray,
      sortValue: e.target.value.toLowerCase()
    })

    //need to finish this
  }

  handleSearchBar(e) {
    this.setState({searchValue: e.target.value})

    this.setState({
      searchText: e.target.value,
    })
  }

  handleMessageClickApp(id, text) {

    // ReactDOM.render(
    //   <MessageEdit
    //     selectedMessage={this.state.selectedMessage}
    //     selectedId={this.state.selectedId}
    //     onConfirmChange={this.handleConfirmChange}
    //     onCancelClick={this.handleMessageEditCancel}
    //   />, document.getElementById('me'))

      this.setState({
        selectedMessage: text,
        selectedId: id,
        showMessageEdit: true
      })
  }

  handleConfirmChange(newText, id) {
    const message = this.state.messages.find(message => message.id === id)

    message.text = newText

    this.setState({
      messages: this.state.messages,
      showMessageEdit: false
    })
  }

  handleMessageEditCancel() {
    this.setState({
      showMessageEdit: false
    })
  }

  render() {
    // console.log(this.state.messages.sort(function(a, b) {
    //   return b.votes - a.votes
    // }))

    console.log(this.state.messages.includes(message => message.text === this.state.searchText))
    return (
      <div className="App">
        <Header title={"Ross' Message Board"} />
        <div class="container">
          <MessageBox
            onAddMessage={this.handleAddMessage}
          />
          <div class="panel-group">
            <div class="panel panel-default">
              <div class="panel-heading center search-formatting">Search messages
                <input
                  id="search"
                  type="text"
                  class="center search-formatting"
                  placeholder="Search..."
                  value={this.state.searchValue}
                  onChange={this.handleSearchBar}>
                </input>
              </div>
            </div>
          </div>
          {/* {this.state.showSearchResults && <SearchBoard messages={this.state.messages}/>} */}
          {this.state.showMessageEdit && <MessageEdit
            selectedMessage={this.state.selectedMessage}
            selectedId={this.state.selectedId}
            onConfirmChange={this.handleConfirmChange}
            onCancelClick={this.handleMessageEditCancel}
          />}
          <div id="sb"></div>
          <div id="me"></div>
          <div class="panel-group">Message Board
            <div class="panel panel-default">
              <div class="panel-heading">Message Board
                <select sortValue={this.state.value} onChange={this.handleSelectChange}>
                  <option value="date">Date</option>
                  <option value="votes">Votes</option>
                </select>
                <select sortValueTwo={this.state.value} onChange={this.handleSelectChange}>
                  <option value="date">Date</option>
                  <option value="votes">Votes</option>
                </select>
                <button class="pull-right sort-button" onClick={this.handleSortByVotes}>Sort by Votes</button>
                <button class="pull-right sort-button" onClick={this.handleSortByDate}>Sort by Date</button>
              </div>
              <div class="panel-body">
                <ul class="message-board">
                  {this.state.messages
                    .filter(message => message.text.includes(this.state.searchText))
                    //(this.state.sortValue === "votes" ? .sort((a, b) => b.votes - a.votes) : undefined)
                    .map(message => {
                      return (
                        <Message
                          text={message.text}
                          votes={message.votes}
                          date={message.date}
                          onVoteUpApp={this.handleVoteUp}
                          onVoteDownApp={this.handleVoteDown}
                          onMessageDeleteApp={this.handleMessageDelete}
                          onMessageClick={this.handleMessageClickApp}
                          id={message.id}
                        />
                      )}
                    )
                  }
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
