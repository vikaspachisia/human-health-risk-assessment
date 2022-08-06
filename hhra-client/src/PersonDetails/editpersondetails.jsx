import React, { Component } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';


//import { setpersonDetails } from "../../actions/setpersondetailsaction";
import AlertDialogBox from "../ui/DailogboxAlert";
import ErorrDialogBox from "../ui/DailogboxError";

import AuthService from "../services/auth-service";
import EditPersonDetailsForm from "./editpersondetailsform";


function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

class EditPersonDetails extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      redirect: null,
      openAlertDailog: false,
      openErrorDailog: false
    };

    const { location } = this.props.router;
    if (location && location.state) {
      const { patientDetails } = location.state;
      this.SetPersonDetials(patientDetails);
    }
  }

  SetPersonDetials(patientDetails) {
    if (patientDetails) {
      this.state = {
        personDetails: {
          address: patientDetails.address,
          age: patientDetails.age,
          city: patientDetails.city,
          email: patientDetails.email,
          firstname: patientDetails.firstname,
          lastname: patientDetails.lastname,
          phonenumber: patientDetails.phonenumber,
          sex: patientDetails.sex,
          state: patientDetails.state,
          zip: patientDetails.zip,
          collectionName: patientDetails.collectionName,
        }
      }
    }
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      this.setState({ redirect: "/home" });
    } else {
      this.setState({ isLoading: false });
    }

    let details = null;
    if (this.props.router && this.props.router.location.state) {
      const { patientDetails } = this.props.router.location.state;
      localStorage.setItem('routeState', JSON.stringify(patientDetails))
      details = patientDetails;
    } else {
      details = localStorage.getItem('routeState')
      if (details) {
        details = JSON.parse(details)
      }
    }

    if (details) {
      this.SetPersonDetials(details);
      this.setState({
        redirect: null,
        isLoading: false
      });
    } else {
      this.setState({ redirect: "/patientList" });
    }
  }


  async handleSubmit() {
    this.setState({
      isLoading: true,
    });

    await this.onUpdate();
  };

  async onUpdate() {
    const sendData = {
      ...this.state.personDetails,
      searchbyname: (
        this.state.personDetails.firstname + this.state.personDetails.lastname
      ).toLowerCase(),
    };
    //const res = await Service.updateData(
    //  sendData,
    //  this.props.personDetails.collectionName,
    //  this.props.personDetails.personId,
    //  this.props.persionUidDeatils.uid
    //);
    const res = "success";
    if (res === "success") {
      this.setState({
        isLoading: false,
        openAlertDailog: true,
        alertDailogBoxTitle: "Update",
        alertDailogBoxDes: "successfully updated",
      });

      let personDetails = this.state.personDetails;
      personDetails = {
        ...this.state.personDetails,
        collectionName: this.props.personDetails.collectionName,
        personId: this.props.personDetails.personId,
      };

      this.props.setOnpersonDetails(personDetails);
    } else {
      this.setState({
        isLoading: false,
      });
      this.handleErrorDailog();
    }
  }

  handleErrorDailog = () => {
    this.setState({
      openErrorDailog: true,
    });
  };

  closeErrorDailog = () => {
    this.setState({
      openErrorDailog: false,
    });
  };

  handleChange = (date) => {
    if (date != null) {
      const birthDate = new Date(date);

      this.setState({
        personDetails: {
          ...this.state.personDetails,
          birthdate: `${birthDate.getMonth() + 1
            }/${birthDate.getDate()}/${birthDate.getFullYear()}`,
        },
        date: date,
        startDate: date,
      });
    } else {
      this.setState({
        personDetails: {
          ...this.state.personDetails,
          birthdate: date,
        },
        date: date,
        startDate: date,
      });
    }
  };

  onEdit = (e) => {
    let personDetails = this.state.personDetails;

    this.setState({
      personDetails: {
        ...this.state.personDetails,
        [e.target.name]: e.target.value,
      },
    });
    console.log(personDetails);
  };

  handleSetOpenDailog = () => {
    this.setState({
      setAlertOpenDailog: false,
      openAlertDailog: false,
    });
  };


  render() {

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    return this.state.isLoading ? (
      <div className="editpersondetailspage text-center">
        <i className="fas fa-spinner fa-pulse fa-2x" style={{ top: "50%", left: "50%" }} ></i>
      </div>
    ) : (
      <div className="editpersondetailspage">
        <AlertDialogBox
          openDailog={this.state.openAlertDailog}
          setOpenDailog={this.state.setOpenAlertDailog}
          onSetOpenDailog={this.handleSetOpenDailog}
          title="Update"
          des="successfully updated"
        ></AlertDialogBox>

        <ErorrDialogBox
          openDailog={this.state.openErrorDailog}
          onSetOpenDailog={this.closeErrorDailog}
          title="Error"
          des="Someting went wrong. Try again"
        ></ErorrDialogBox>

        <EditPersonDetailsForm
          handleSubmit={this.handleSubmit}
          onEdit={this.onEdit}
          date={this.state.date}
          handleChange={this.handleChange}
          personDetails={this.state.personDetails}
          profileHtmlelEment={this.state.profileHtmlelEment}
          onImageRemove={this.onImageRemove}
          onImageChange={this.onImageChange}
          handleImageForUpload={this.handleImageForUpload}
        ></EditPersonDetailsForm>

      </div>
    );
  }
}
export default withRouter(EditPersonDetails);


