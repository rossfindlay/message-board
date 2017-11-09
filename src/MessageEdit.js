import React, { Component } from 'react'

class MessageEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newText: '',
      id: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    this.setState({
      newText: this.props.selectedMessage,
      id: this.props.selectedId
    })
  }

  handleClick() {
    this.props.onConfirmChange(this.state.newText, this.state.id)
  }

  handleCancel(){
    this.props.onCancelClick()
  }

  handleChange(e) {
    this.setState({newText: e.target.value})
  }

  render() {
    return (
      <div>
        <div class="form-group">
          <label>Edit message:</label>
          <textarea
            id="message"
            type="text"
            class="form-control"
            style={{height: '150px'}}
            value={this.state.newText}
            onChange={this.handleChange}>
          </textarea>
        </div>
        <button
          id="submit"
          class="btn btn-default message-edit-btn-format"
          onClick={this.handleClick}>
          Confirm changes
        </button>
        <button
          id="submit"
          class="btn btn-default message-edit-btn-format"
          onClick={this.handleCancel}>
          Cancel changes
        </button>
      </div>
    )
  }
}

export default MessageEdit
