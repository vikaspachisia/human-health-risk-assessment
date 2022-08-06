import React, { Component } from "react";

import "../stylesheets/editpersondetailsform.css";


class EditPersonDetailsForm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="editd_person_details_formpage">
        <div className="container main_section">

          <div className="first_section">

            <form onSubmit={this.props.handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="row">
                    <label className="col-sm-3 col-form-label" htmlFor="validationDefault01">First name:</label>
                    <div className="col-md-9 mb-3">
                      <input
                        name="firstname"
                        type="text"
                        className="form-control"
                        id="validationDefault01"
                        required
                        value={this.props.personDetails.firstname}
                        onChange={this.props.onEdit}
                      />
                    </div>

                  </div>

                  <div className="row">
                    <label className="col-sm-3 col-form-label" htmlFor="validationDefault02">Last name:</label>
                    <div className="col-md-9 mb-3">
                      <input
                        name="lastname"
                        type="text"
                        className="form-control"
                        id="validationDefault02"
                        value={this.props.personDetails.lastname}
                        onChange={this.props.onEdit}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <label className="col-sm-3 col-form-label" htmlFor="validationDefault10">Sex:</label>
                    <div className="col-md-3 mb-3">
                      <select
                        name="sex"
                        className="form-select"
                        id="validationDefault10"
                        value={this.props.personDetails.sex}
                        onChange={this.props.onEdit}
                        required
                      >
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>other</option>
                      </select>
                    </div>

                    <label className="col-sm-3 col-form-label" htmlFor="validationDefault11">Age:</label>
                    <div className="col-md-3 mb-3">
                      <input
                        name="age"
                        type="number"
                        min="1"
                        max="100"
                        className="form-control"
                        id="validationDefault11"
                        value={this.props.personDetails.age}
                        onChange={this.props.onEdit}
                      />
                    </div>

                  </div>

                  <div className="row">
                    <label className="col-sm-3 col-form-label" htmlFor="validationDefault03">Mobile:</label>
                    <div className="col-md-9 mb-3">
                      <input
                        name="phonenumber"
                        type="number"
                        className="form-control"
                        id="validationDefault03"
                        value={this.props.personDetails.phonenumber}
                        onChange={this.props.onEdit}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <label className="col-sm-3 col-form-label" htmlFor="validationDefault04">Email:</label>
                    <div className="col-md-9 mb-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="validationDefault04"
                        value={this.props.personDetails.email}
                        onChange={this.props.onEdit}
                      />
                    </div>
                  </div>

                </div>

                <div className="col-md-6 mb-3">

                  <div className="row">
                    <label className="col-sm-3 col-form-label" htmlFor="validationDefault05">Address:</label>
                    <div className="col-md-9 mb-3">
                      <input
                        name="address"
                        type="text"
                        className="form-control"
                        id="validationDefault05"
                        value={this.props.personDetails.address}
                        onChange={this.props.onEdit}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <label className="col-sm-3 col-form-label" htmlFor="validationDefault06">City:</label>
                    <div className="col-md-9 mb-3">
                      <input
                        name="city"
                        type="text"
                        className="form-control"
                        id="validationDefault06"
                        value={this.props.personDetails.city}
                        onChange={this.props.onEdit}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <label className="col-sm-3 col-form-label" htmlFor="validationDefault07">State:</label>
                    <div className="col-md-9 mb-3">
                      <select
                        name="state"
                        className="form-select"
                        id="validationDefault07"
                        value={this.props.personDetails.state}
                        onChange={this.props.onEdit}
                      >
                        <option></option>
                        <option>CG</option>
                        <option>MP</option>
                        <option>UP</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <label className="col-sm-3 col-form-label" htmlFor="validationDefault08">Zip:</label>
                    <div className="col-md-9 mb-3">
                      <input
                        name="zip"
                        type="text"
                        className="form-control"
                        id="validationDefault85"
                        value={this.props.personDetails.zip}
                        onChange={this.props.onEdit}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button className="btn btn-success update_btn" type="submit"> Update </button>
                </div>

              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default EditPersonDetailsForm;
