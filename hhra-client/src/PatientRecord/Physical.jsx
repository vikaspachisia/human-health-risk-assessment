import React, { Component } from "react";

import "../stylesheets/editpersondetailsform.css";


export default class Physical extends Component {
  constructor() {
    super();
    this.state = {
      physical: {
        body_weight: 0,
        body_weight_in_pound: false,
        body_height: 0,
        body_waist: 0,
        BMI: 0,
        o2: 0,
        temperatue: 0,
        temp_in_celcius: false,
        body_fat: 0,
        body_water: 0,
        bone_density: 0,
        muscle_mass: 0,
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
              <div className="row mb-4">
                <div className="col-sm-6">
                  <div className="row row-border">
                    <fieldset>
                      <legend>BMI:</legend>
                      <div className="row">

                        <div className="mb-2 row">
                          <label for="bodyweight" className="col-sm-4 col-form-label">Body Weight:</label>
                          <div className="col-sm-3">
                            <input
                              type="number"
                              className="form-control no-spin"
                              placeholder="Weight in kg/pound"
                              id="bodyweight"
                              name="bodyweight"
                              min="1" max="2000" step=".0001"
                              autoComplete="off"
                              required
                              value={this.state.physical.body_weight}
                              onChange={this.formValChange}
                            />
                          </div>

                          <div className="col-sm-5" style={{ "padding-top": "0.4em" }}>
                            <table>
                              <tr>
                                <td style={{ "padding-right": "0.7em" }}>
                                  <input type="radio" name="radioWeight" id="weight_kg" required checked /> In kg
                                </td>
                                <td style={{ "padding-left": "0.7em" }}>
                                  <input type="radio" name="radioWeight" id="weight_pound" required /> In pound
                                </td>
                              </tr>
                            </table>
                          </div>
                        </div>

                        <div className="mb-2 row">
                          <label for="bodyheight" className="col-sm-4 col-form-label">Body Height:</label>
                          <div className="col-sm-8">
                            <input
                              type="number"
                              className="form-control no-spin"
                              placeholder="Height in cm"
                              id="bodyheight"
                              name="bodyheight"
                              min="1" max="350" step=".0001"
                              autoComplete="off"
                              required
                              value={this.state.physical.body_height}
                              onChange={this.formValChange}
                            />
                          </div>

                        </div>

                        <div className="mb-2 row">
                          <label for="bodyheight" className="col-sm-4 col-form-label">Body Waist:</label>
                          <div className="col-sm-8">
                            <input
                              type="number"
                              className="form-control no-spin"
                              placeholder="Waist in cm"
                              id="bodywaist"
                              name="bodywaist"
                              min="20" max="200" step=".0001"
                              autoComplete="off"
                              required
                              value={this.state.physical.body_waist}
                              onChange={this.formValChange}
                            />
                          </div>

                        </div>

                        <div className="row text-end">
                          <div className="col-sm-12 mb-12">
                            <small className="form-text text-muted" id="helpBMI">
                              {!this.state.physical.BMI
                                ? ("Calculated BMI : " + (this.state.physical.BMI))
                                : ("Enter height and weight to calculate BMI.")}
                            </small>
                          </div>
                        </div>
                      </div>
                    </fieldset>

                  </div>

                  <div className="row">

                    <div className="mb-3 row">
                      <label for="Temperature" className="col-sm-4 col-form-label">Temperature:</label>
                      <div className="col-sm-4">
                        <input
                          type="number"
                          className="form-control no-spin"
                          placeholder={this.state.physical.temp_in_celcius ? "Range (30~50)" : "Range (95~104)"}
                          id="Temperature"
                          name="Temperature"
                          min={this.state.physical.temp_in_celcius ? "30" : "95"}
                          max={this.state.physical.temp_in_celcius ? "50" : "104"}
                          step=".0001"
                          autoComplete="off"
                          required
                          value={this.state.physical.temperatue}
                          onChange={this.formValChange}
                        />
                      </div>

                      <div className="col-md-4 mb-2">
                        <table>
                          <tr>
                            <td style={{ "padding": "0.2em 0.3em" }}><input type="radio" name="radiotemprature" id="degree" required checked /> In &deg;C </td>
                            <td style={{ "padding": "0.2em 0.3em" }}><input type="radio" name="radiotemprature" id="fahrenheit" required /> In &deg; F </td>
                          </tr>
                        </table>
                      </div>

                    </div>

                    

                  </div>

                </div>

                <div className="col-sm-6">

                  <div className="mb-2 row">
                    <label for="bodyFat" className="col-sm-4 col-form-label">Body fat:</label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control no-spin"
                        placeholder="In percentage (20~150)"
                        id="bodyFat"
                        name="bodyFat"
                        min="20" max="150" step=".0001"
                        autoComplete="off"
                        required
                        value={this.state.physical.body_fat}
                        onChange={this.formValChange}
                      />
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label for="bodyWater" className="col-sm-4 col-form-label">Body water:</label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control no-spin"
                        placeholder="In percentage (20~150)"
                        id="bodyWater"
                        name="bodyWater"
                        min="20" max="150" step=".0001"
                        autoComplete="off"
                        required
                        value={this.state.physical.body_water}
                        onChange={this.formValChange}
                      />
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label for="boneDensity" className="col-sm-4 col-form-label">Bone density:</label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control no-spin"
                        placeholder="In percentage (20~150)"
                        id="boneDensity"
                        name="boneDensity"
                        min="20" max="150" step=".0001"
                        autoComplete="off"
                        required
                        value={this.state.physical.bone_density}
                        onChange={this.formValChange}
                      />
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label for="muscleMass" className="col-sm-4 col-form-label">Muscle mass:</label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control no-spin"
                        placeholder="In percentage (20~150)"
                        id="muscleMass"
                        name="muscleMass"
                        min="20" max="150" step=".0001"
                        autoComplete="off"
                        required
                        value={this.state.physical.muscle_mass}
                        onChange={this.formValChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label for="Temperature" className="col-sm-4 col-form-label">O2 saturation:</label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control no-spin"
                        placeholder="In percentage (20~150)"
                        id="o2"
                        name="o2"
                        min="20" max="150" step=".0001"
                        autoComplete="off"
                        required
                        value={this.state.physical.o2}
                        onChange={this.formValChange}
                      />
                    </div>
                  </div>

                </div>
              </div>

              <div className="text-center">
                <button className="btn btn-success update_btn" type="submit"> Update </button>
              </div>
            </form>

          </div>
        </div >
      </div >
    );
  }
}

