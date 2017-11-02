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
      <div>
      <i
        class={this.props.class}
        onClick={this.handleClick}
      >
      </i>
    </div>
    )
  }
}

export default Button
