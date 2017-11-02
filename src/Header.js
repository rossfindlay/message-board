import React, { Component } from 'react'

class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <nav class="navbar">
          <div class="container-fluid">
            <div class="navbar-header ">
              <h1>{this.props.title}</h1>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header
