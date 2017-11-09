import React, { Component } from 'react';
import uuid from 'uuid';
import logo from './logo.svg';
import './App.css';
import Header from './Header'
import Message from './Message'
import MessageBox from './MessageBox'
import MessageEdit from './MessageEdit'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [
        { id: uuid.v4(), text: 'There’s a passage I got memorized. Ezekiel 25:17. “The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of the darkness, for he is truly his brother’s keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy My brothers. And you will know I am the Lord when I lay My vengeance upon you.”', votes: 10 , date: 1222222222222},
        { id: uuid.v4(), text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue malesuada neque, in tristique nisi iaculis ac. Vivamus porttitor finibus arcu. Duis auctor interdum lectus, ut finibus dui finibus et. Curabitur semper nibh sit amet diam faucibus, vitae aliquam tellus dapibus. Maecenas consectetur magna velit, nec rutrum purus blandit vel. ', votes: 2 , date: 1508333333333},
        { id: uuid.v4(), text: 'I don\'t ever wanna feel like I did that day But take me to the place I love, take me all the way I don\'t ever wanna feel like I did that day But take me to the place I love, take me all the way, yeah, yeah, yeah', votes: 12 , date: 1499444444444}
      ],
      searchValue: '',
      sortValue: 'date',
      sortMethod: 'ascending',
      selectedMessage: '',
      selectedId: '',
      showMessageEdit: false,
      searchText: ''
    }

    this.handleVoteUp = this.handleVoteUp.bind(this)
    this.handleVoteDown = this.handleVoteDown.bind(this)
    this.handleMessageDelete = this.handleMessageDelete.bind(this)
    this.handleAddMessage = this.handleAddMessage.bind(this)

    this.handleSearchBar = this.handleSearchBar.bind(this)

    this.handleSelectChangeValue = this.handleSelectChangeValue.bind(this)
    this.handleSelectChangeMethod = this.handleSelectChangeMethod.bind(this)
    this.handleMessageSort = this.handleMessageSort.bind(this)

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

  handleSelectChangeValue(e) {
    this.setState({
      sortValue: e.target.value.toLowerCase()
    })
  }

  handleSelectChangeMethod(e) {
    this.setState({
      sortMethod: e.target.value.toLowerCase()
    })
  }

  handleSearchBar(e) {
    this.setState({searchValue: e.target.value})

    this.setState({
      searchText: e.target.value,
    })
  }

  handleMessageClickApp(id, text) {
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

  handleMessageSort() {
    if (this.state.sortValue === "votes" && this.state.sortMethod === "descending") {
      return descVotesSort
    } else if (this.state.sortValue === "votes" && this.state.sortMethod === "ascending") {
      return ascVotesSort
    } else if (this.state.sortValue === "date" && this.state.sortMethod === "descending") {
      return descDateSort
    } else if (this.state.sortValue === "date" && this.state.sortMethod === "ascending") {
      return ascDateSort
    }
  }

  render() {
    return (
      <div className="App">
        <Header title={"Ross' Message Board"} />
        <div class="container">
          <MessageBox
            onAddMessage={this.handleAddMessage}
          />
          {this.state.showMessageEdit && <MessageEdit
            selectedMessage={this.state.selectedMessage}
            selectedId={this.state.selectedId}
            onConfirmChange={this.handleConfirmChange}
            onCancelClick={this.handleMessageEditCancel}
          />}
          <div class="panel-group">
            <div class="panel panel-default">
              <div class="panel-heading panel-heading-formatting">
                <input
                  id="search"
                  type="text"
                  class="pull-left search-formatting"
                  placeholder="Search..."
                  value={this.state.searchValue}
                  onChange={this.handleSearchBar}>
                </input>
                <select sortMethod={this.state.value} onChange={this.handleSelectChangeMethod} class="pull-right">
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
                <select sortValue={this.state.value} onChange={this.handleSelectChangeValue} class="pull-right">
                  <option value="date">Date</option>
                  <option value="votes">Votes</option>
                </select>
                <div class="pull-right">Sort by: </div>
              </div>
              <div class="panel-body">
                <ul class="message-board">
                  {this.state.messages.sort(this.handleMessageSort())
                    .filter(message => message.text.toLowerCase().includes(this.state.searchText.toLowerCase()))
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
                      )
                    })
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

const descVotesSort = (a, b) => b.votes - a.votes
const ascVotesSort = (a, b) => a.votes - b.votes
const ascDateSort = (a, b) => b.date - a.date
const descDateSort = (a, b) => a.date - b.date

export default App;
