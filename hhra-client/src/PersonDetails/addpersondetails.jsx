import React, { Component } from "react";

import NewPersonDetailsForm from "./newpersondetailsform";


class AddPersonDetails extends Component {
  constructor() {
    super();

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

  handleSubmit = () => {
    this.setState({
      isLoading: true,
    });
    this.props.setCloseBtnAppear();
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
              <NewPersonDetailsForm
                handleSubmit={this.handleSubmit}
                onEdit={this.onEdit}
                // startDate={this.state.startDate}
                date={this.state.date}
                htmlelement={this.state.htmlelement}
                handleChange={this.handleChange}
              ></NewPersonDetailsForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    persionUidDeatils: state.persionUidDeatils,
  };
};
export default AddPersonDetails;
//export default connect(mapStateToProps, null)(AddPersonDetails);
