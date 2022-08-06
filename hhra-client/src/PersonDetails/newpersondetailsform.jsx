import React, { Component } from "react";

import "../stylesheets/newpersondetailsform.css";


class NewPersonDetailsForm extends Component {
  constructor(prosp) {
    super(prosp);
    this.state = {
      isConsent: false
    };
  }

  isConsentProvided = (e) => {
    this.setState({
      isConsent: e.target.checked
    });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="first_section">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationDefault01">First name:</label>
              <input
                name="firstname"
                type="text"
                className="form-control"
                id="firstname"
                onChange={this.props.onEdit}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="validationDefault02">Last name:</label>
              <input
                name="lastname"
                type="text"
                className="form-control"
                id="lastname"
                onChange={this.props.onEdit}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationDefault10">Sex:</label>
              <select
                name="sex"
                className="form-select"
                id="sex"
                onChange={this.props.onEdit}
                required
              >
                <option></option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="validationDefault11">Age:</label>
              <input
                name="age"
                type="number"
                min="1"
                max="100"
                className="form-control"
                id="age"
                onChange={this.props.onEdit}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationDefault03">Mobile:</label>
              <input
                name="phonenumber"
                type="number"
                className="form-control no-spin"
                id="phonenumber"
                onChange={this.props.onEdit}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="validationDefault04">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                onChange={this.props.onEdit}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mb-3">
              <label htmlFor="validationDefault05">Address:</label>
              <input
                name="address"
                type="text"
                className="form-control"
                id="address"
                onChange={this.props.onEdit}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-5 mb-3">
              <label htmlFor="validationDefault06">City:</label>
              <input
                name="city"
                type="text"
                className="form-control"
                id="city"
                onChange={this.props.onEdit}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="validationDefault07">State:</label>
              <select
                name="state"
                className="form-select"
                id="state"
                onChange={this.props.onEdit}
              >
                <option></option>
                <option>CG</option>
                <option>MP</option>
                <option>UP</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationDefault08">Zip:</label>
              <input
                name="zip"
                type="text"
                className="form-control"
                id="zip"
                onChange={this.props.onEdit}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <div className="form-check">
                  <label className="form-check-label" htmlFor="consent1">User consent goes here along with link if any!</label>
                  <input className="form-check-input" type="checkbox" value="" name="consent1" onChange={this.isConsentProvided} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-md-12 mb-3">
            <button className="btn btn-success savebtn" type="submit" disabled={!this.state.isConsent}> Save </button>
          </div>
        </div>
      </form>
    );
  }
}

export default NewPersonDetailsForm;
