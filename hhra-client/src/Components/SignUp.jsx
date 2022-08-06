import '../stylesheets/Login.css';

import React, { Component } from "react";
import AuthService from "../services/auth-service";
import { isEmail } from "validator";


const formValid = ({ isError, validator, ...rest }) => {
  let isValid1 = true;
  Object.values(isError).every(val => {
    if (val.length > 0) {
      isValid1 = false;
      return false;
    }
    return true;
  });

  let isValid2 = true;
  Object.values(rest).every(val => {
    if (val === null || val === '') {
      isValid2 = false;
      return false;
    }
    return true;
  });

  return isValid1 && isValid2;
};

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      username: "",
      email: "",
      password: "",
      isError: {
        fullname: "",
        username: "",
        email: "",
        password: ""
      },
      validator: {
        successful: false,
        loading: false,
        message: ''
      }
    };
  }

  formValChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let isError = { ...this.state.isError };
    switch (name) {
      case "fullname":
        isError.fullname =
          (value.length < 3 || value.length > 30) ? "The fullname must be between 3 and 30 characters." : "";
        break;
      case "username":
        isError.username =
          (value.length < 3 || value.length > 20) ? "The username must be between 3 and 20 characters." : "";
        break;
      case "email":
        isError.email =
          !isEmail(value) ? "A valid email id is required." : "";
        break;
      case "password":
        isError.password =
          (value.length < 4 || value.length > 20) ? "The password must be between 4 and 20 characters." : "";
        break;
      default:
        break;
    }
    this.setState({
      isError,
      [name]: value
    })
  };

  onSubmit = e => {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
      successful: false
    });

    if (formValid(this.state)) {
      AuthService.register(
        this.state.fullname,
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            loading: false,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        message: "Please fill all the mandatory fields.",
        loading: false,
        successful: false,
      });
      console.log("Form is invalid!");
    }
  };

  render() {
    const { isError } = this.state;
    return (

      <div className="container">

        <div className="col-md-12 col-xs-12 login logincard-container">

          <div className="col-md-4 col-xs-12 card logincard">
            <div className="card-header text-center fw-bold">
              Sign up
            </div>

            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />

            <div className="card-body">

              <form className="loginForm" onSubmit={this.onSubmit} noValidate >
                {!this.state.successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="fullname">Full name:</label>
                      <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-id-card"></i> </div>
                        <input
                          type="text"
                          name="fullname"
                          className={isError.fullname.length > 0 ? "is-invalid form-control" : "form-control"}
                          autoComplete="off"
                          placeholder="Input full name"
                          aria-label="Input fullname"
                          aria-describedby="btnGroupAddon"
                          onChange={this.formValChange}
                          onBlur={this.formValChange}
                          disabled={(this.state.loading) ? "disabled" : ""}
                        />
                        {isError.fullname.length > 0 && (
                          <span className="invalid-feedback">{isError.fullname}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-envelope"></i> </div>
                        <input
                          type="text"
                          name="email"
                          className={isError.email.length > 0 ? "is-invalid form-control" : "form-control"}
                          autoComplete="off"
                          placeholder="Input email id"
                          aria-label="Input email id"
                          aria-describedby="btnGroupAddon"
                          onChange={this.formValChange}
                          onBlur={this.formValChange}
                          disabled={(this.state.loading) ? "disabled" : ""}
                        />
                        {isError.email.length > 0 && (
                          <span className="invalid-feedback">{isError.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Username:</label>
                      <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i> </div>
                        <input
                          type="text"
                          name="username"
                          className={isError.username.length > 0 ? "is-invalid form-control" : "form-control"}
                          autoComplete="off"
                          placeholder="Input username"
                          aria-label="Input username"
                          aria-describedby="btnGroupAddon"
                          onChange={this.formValChange}
                          onBlur={this.formValChange}
                          disabled={(this.state.loading) ? "disabled" : ""}
                        />
                        {isError.username.length > 0 && (
                          <span className="invalid-feedback">{isError.username}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i> </div>
                        <input
                          type="password"
                          name="password"
                          className={isError.password.length > 0 ? "is-invalid form-control" : "form-control"}
                          placeholder="Input password"
                          aria-label="Input password"
                          aria-describedby="btnGroupAddon"
                          onChange={this.formValChange}
                          onBlur={this.formValChange}
                          disabled={(this.state.loading) ? "disabled" : ""}
                        />
                        {isError.password.length > 0 && (
                          <span className="invalid-feedback">{isError.password}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-group loginBtn text-center">
                      <button className="btn btn-primary btn-block" disabled={this.state.loading} >
                        {this.state.loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span> Sign Up</span>
                      </button>
                    </div>
                  </div>
                )}

                {this.state.message && (
                  <div className="form-group">
                    <div className={this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                    } role="alert" >
                      {this.state.message}
                    </div>
                  </div>
                )}

              </form>

            </div>
          </div>
        </div>

      </div>
    );
  }
}
