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
          <span class="center">{this.props.text}</span>
          <span class="pull-right">{timeSince(this.props.date)}</span>
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
        </li>
      </div>
    )
  }
}

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000)

  var interval = Math.floor(seconds / 31536000)

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
