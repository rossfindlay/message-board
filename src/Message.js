import React, { Component } from 'react'
import Button from './Button'

class Message extends Component {
  constructor(props) {
    super(props)

  this.handleThumbsUpMessage = this.handleThumbsUpMessage.bind(this)
  this.handleThumbsDownMessage = this.handleThumbsDownMessage.bind(this)
  this.handleDeleteMessage = this.handleDeleteMessage.bind(this)
  }

  handleThumbsUpMessage() {
    this.props.onVoteUpApp(this.props.id)
  }

  handleThumbsDownMessage() {
    this.props.onVoteDownApp(this.props.id)
  }

  handleDeleteMessage() {
    this.props.onMessageDeleteApp(this.props.id)
  }

  render() {
    return (
      <div>
        <li>
          {this.props.text}
          <Button
            class="fa fa-trash pull-right delete"
            onClickMessage={this.handleDeleteMessage}
          />
          <Button
            class="fa fa-thumbs-down pull-right"
            onClickMessage={this.handleThumbsDownMessage}
          />
          <Button
            class="fa fa-thumbs-up pull-right"
            onClickMessage={this.handleThumbsUpMessage}
          />
          <span class="pull-right">{this.props.votes}</span>
        </li>
      </div>
    )
  }
}

export default Message
