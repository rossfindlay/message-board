import React, { Component } from 'react'

class Button extends Component {
  constructor(props) {
    super(props)

  this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
      this.props.onClickMessage(this.props.id)
  }

  render() {
    return (
      <i
        class={this.props.class}
        onClick={this.handleClick}
      ></i>
    )
  }
}

export default Button
