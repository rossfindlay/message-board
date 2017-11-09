import React, { Component } from 'react'
import Button from './Button'

class Message extends Component {
  constructor(props) {
    super(props)

  this.handleThumbsUpMessage = this.handleThumbsUpMessage.bind(this)
  this.handleThumbsDownMessage = this.handleThumbsDownMessage.bind(this)
  this.handleDeleteMessage = this.handleDeleteMessage.bind(this)
  this.handleMessageClick = this.handleMessageClick.bind(this)
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

  handleMessageClick() {
    this.props.onMessageClick(this.props.id, this.props.text)
  }

  render() {
    return (
      <div>
      <div class="message-text-lift" onClick={this.handleMessageClick}>
          <span class="center">{this.props.text}</span>
      </div>
      <span class="pull-right date-formatting">{timeSince(this.props.date)}</span>
      <div class="message-formatting button-formatting">
          <Button
            class="fa fa-trash pull-left delete"
            onClickMessage={this.handleDeleteMessage}
          />
          <Button
            class="fa fa-thumbs-down pull-left"
            onClickMessage={this.handleThumbsDownMessage}
          />
          <Button
            class="fa fa-thumbs-up pull-left"
            onClickMessage={this.handleThumbsUpMessage}
          />
          <span class="pull-left">{this.props.votes}</span>

      </div>
    </div>
    )
  }
}

function timeSince(date) {

  const seconds = Math.floor((new Date() - date) / 1000)

  let interval = Math.floor(seconds / 31536000)

  if (interval > 1) {
    return `posted ${interval} years ago`
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return `posted ${interval} months ago`
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return `posted ${interval} days ago`
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return `posted ${interval} hours ago`
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return `posted ${interval} minutes ago`
  }
  return `posted ${Math.floor(seconds)} seconds ago`
}

export default Message
