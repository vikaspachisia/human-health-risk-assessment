import React, { Component } from "react";

import PersonDetailsForm from "./PersonDetailsForm";
import PatientInfoService from "../services/patient-service.js"


class AddPersonDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        firstname: "",
        lastname: "",
        sex: "",
        age: "",
        phonenumber: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: ""
      }
    };

  }
  componentDidMount() {
    if (this.props.personDetail) {
      this.setState(
        {
          formData: {
            address: this.props.personDetail.address,
            age: this.props.personDetail.age,
            city: this.props.personDetail.city,
            email: this.props.personDetail.email,
            firstname: this.props.personDetail.firstname,
            lastname: this.props.personDetail.lastname,
            phonenumber: this.props.personDetail.phonenumber,
            sex: this.props.personDetail.sex,
            state: this.props.personDetail.state,
            zip: this.props.personDetail.zip,
          }
        });
    }
  }

  handleSubmit = () => {
    this.setState({ isLoading: true, });
    this.props.setCloseBtnAppear();

    let sendData = {
      ...this.state.formData,
      searchbyname: (
        this.state.formData.firstname + this.state.formData.lastname
      ).toLowerCase(),
    };

    if (this.props.NewPatient) {
      // Registring new patient
      PatientInfoService.create(sendData).then(
        response => {
          this.setState({ isLoading: false, });
          this.props.handleSuccessDailog();
          console.log(response.data);
        },
        error => {
          this.setState({ isLoading: false, });
          this.props.handleErrorDailog();
        }
      ).catch(e => {
        console.log(e);
      });
    } else {
      // Updating existing patient
      PatientInfoService.update(this.props.personDetail.patientid, sendData).then(
        response => {
          this.setState({ isLoading: false, });
          this.props.handleSuccessDailog();
          console.log(response.data);
        },
        error => {
          this.setState({ isLoading: false, });
          this.props.handleErrorDailog();
        }
      ).catch(e => {
        console.log(e);
      });
    }
  };

  handleChange = (date) => {
    if (date != null) {
      const birthDate = new Date(date);

      this.setState({
        date: date,
        formData: {
          ...this.state.formData,
          birthdate: `${birthDate.getMonth() + 1
            }/${birthDate.getDate()}/${birthDate.getFullYear()}`,
        },

        startDate: date,
      });
    } else {
      this.setState({
        date: date,
        formData: {
          ...this.state.formData,
          birthdate: date,
        },

        startDate: date,
      });
    }
  };

  onEdit = (e) => {
    const formData = this.state.formData;
    this.setState({
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return this.state.isLoading ? (
      <div className="addpersonpage">
        <i
          className="fas fa-spinner fa-pulse fa-2x"
          style={{ position: "relative", top: " 0%", left: "40%" }}
        ></i>
      </div>
    ) : (
      <div className="addpersonpage">
        <div className="container main_section" style={{ marginTop: "10px" }}>
          <div className="row">
            <div className="col-sm">
              <PersonDetailsForm
                handleSubmit={this.handleSubmit}
                onEdit={this.onEdit}
                date={this.state.date}
                htmlelement={this.state.htmlelement}
                handleChange={this.handleChange}
                NewPatient={this.props.NewPatient}
                personDetail={this.props.personDetail ? this.props.personDetail : this.state.formData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPersonDetails;
