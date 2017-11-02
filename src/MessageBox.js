import React, { Component } from 'react'

class MessageBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick() {
    this.props.onAddMessage(this.state.text)
  }

  handleChange(event) {
    this.setState({text: event.target.value})
  }

  render() {
    return (
      <div class="panel-group">
        <div class="panel panel-primary">
          <div class="panel-heading">Post a message</div>
          <div class="panel-body">
            <div class="form-group">
              <label>Message:</label>
              <textarea
                id="message"
                type="text"
                class="form-control"
                value={this.state.text}
                onChange={this.handleChange}>
              </textarea>
            </div>
            <button
              id="submit"
              class="btn btn-default"
              onClick={this.handleClick}>
              Post to board
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageBox
