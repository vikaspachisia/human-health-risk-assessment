import React, { Component } from "react";

import "../stylesheets/editpersondetailsform.css";


export default class Blood extends Component {
  constructor() {
    super();
    this.state = {
      blood: {
        crp: 0,
        tnf: 0,
        IL6: 0,
        IL10: 0,
        d_dimer: 0,
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
              <div className="mb-2 row">

                <label for="crp" className="col-sm-3 col-form-label">CRP (1.00 ~ 10.00):</label>
                <div className="col-sm-3">
                  <input
                    type="number"
                    className="form-control no-spin"
                    placeholder="In mg/L"
                    id="crp"
                    name="crp"
                    min="1" max="10" step=".0001"
                    autoComplete="off"
                    required
                    value={this.state.blood.crp}
                    onChange={this.formValChange}
                  />
                </div>

                <label for="tnf" className="col-sm-3 col-form-label">TNF (10.00 ~500.00):</label>
                <div className="col-sm-3">
                  <input
                    type="number"
                    className="form-control no-spin"
                    placeholder="In pg/mL"
                    id="tnf"
                    name="tnf"
                    min="10" max="500" step=".0001"
                    autoComplete="off"
                    required
                    value={this.state.blood.tnf}
                    onChange={this.formValChange}
                  />
                </div>
              </div>

              <div className="mb-2 row">
                <label for="IL6" className="col-sm-3 col-form-label">IL6 (0.100 ~40.000):</label>
                <div className="col-sm-3">
                  <input
                    type="number"
                    className="form-control no-spin"
                    placeholder="In pg/mL"
                    id="IL6"
                    name="IL6"
                    min="0.100" max="40.000" step=".0001"
                    autoComplete="off"
                    required
                    value={this.state.blood.IL6}
                    onChange={this.formValChange}
                  />
                </div>

                <label for="IL10" className="col-sm-3 col-form-label">IL10 (0.100 ~1000.000):</label>
                <div className="col-sm-3">
                  <input
                    type="number"
                    className="form-control no-spin"
                    placeholder="In pg/mL"
                    id="IL10"
                    name="IL10"
                    min="0.100" max="1000.000" step=".0001"
                    autoComplete="off"
                    required
                    value={this.state.blood.IL10}
                    onChange={this.formValChange}
                  />
                </div>
              </div>

              <div className="mb-4 row">
                <label for="d_dimer" className="col-sm-3 col-form-label">D-Dimer (0.000 ~0.250):</label>
                <div className="col-sm-3">
                  <input
                    type="number"
                    className="form-control no-spin"
                    placeholder="In ng/mL"
                    id="d_dimer"
                    name="d_dimer"
                    min="0.000" max="0.250" step=".0001"
                    autoComplete="off"
                    required
                    value={this.state.blood.d_dimer}
                    onChange={this.formValChange}
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

