import React, { Component } from "react";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return null;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="left brand-logo">
            FeedbackApp
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
