import '../stylesheets/Login.css';


import React, { Component } from "react";
import AuthService from "../services/auth-service";

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

export default class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isError: {
        username: '',
        password: ''
      },
      validator: {
        loading: false,
        message: ''
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    if (formValid(this.state)) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          window.location.href = '/dashboard';
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );

    } else {
      this.setState({
        message: "Please fill the mandatory fields.",
        loading: false
      });
      console.log("Form is invalid!");
    }
  };

  formValChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let isError = { ...this.state.isError };
    switch (name) {
      case "username":
        isError.username =
          (value.length < 3 || value.length > 20) ? "The username must be between 3 and 20 characters." : "";
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


  render() {
    const { isError } = this.state;
    return (

      <div className="container">

        <div className="col-md-12 col-xs-12 login logincard-container">

          <div className="col-md-4 col-xs-12 card logincard">
            <div className="card-header text-center fw-bold">
              Sign In
            </div>

            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />

            <div className="card-body">

              <form className="loginForm" onSubmit={this.onSubmit} noValidate>

                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <div className="input-group">
                    <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i> </div>
                    <input
                      type="text"
                      name="username"
                      className={isError.username.length > 0 ? "is-invalid form-control" : "form-control"}
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
                    <span> Sign In</span>
                  </button>
                </div>

                {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
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


