import React, { Component } from "react";

import "../stylesheets/EditPersonDetailsForm.css";


export default class Blood extends Component {
  constructor() {
    super();
    this.state = {
      physical: {
        ekg: 0,
        ifAbnormal: "",
      }
    };
  }

  formValChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let isError = { ...this.state.isError };
    switch (name) {
      case "username":
        //isError.username =
        //  (value.length < 3 || value.length > 20) ? "The username must be between 3 and 20 characters." : "";
        break;
      case "password":
        //isError.password =
        //  (value.length < 4 || value.length > 20) ? "The password must be between 4 and 20 characters." : "";
        break;
      default:
        break;
    }
    //this.setState({
    //  isError,
    //  [name]: value
    //})
  };

  render() {
    return (
      <div className="editd_person_details_formpage">
        <div className="container main_section">

          <div className="first_section">

            <form onSubmit={this.props.handleSubmit}>
              <div className="mb-4 row">

                <label className="col-md-4 col-form-label" htmlFor="validationDefault10">Glyocheck:</label>
                <div className="col-md-4">
                  <select
                    name="ekg"
                    className="form-select"
                    id="ekg"
                    value={this.state.EKG}
                    onChange={this.formValChange}
                    required
                  >
                    <option></option>
                    <option>Normal</option>
                    <option>Abnormal</option>
                  </select>
                </div>

                <div class="col-md-4 ">
                  <input
                    type="text"
                    class="form-control"
                    name="ifAbnormal"
                    id="EKG"
                    maxlength="100"
                    placeholder="If abnormal"
                    disabled
                  />
                </div>

              </div>

              <div className="text-center">
                <button className="btn btn-success update_btn" type="submit"> Update </button>
              </div>
            </form>

          </div >
        </div >
      </div >
    );
  }
}

