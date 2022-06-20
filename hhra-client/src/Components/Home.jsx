import logo from '../logo.svg';
import React, { Component } from "react";

import UserService from "../services/user-service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ?
            error.message :
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <header className="App-header text-center">
        <div className="jumbotron">
          <h3>{this.state.content}</h3>
        </div>

        <div className="row">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
      </header >
    );
  }
}

