import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion'
import { Navigate, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { Tabs, Tab, VTabs, VTabList, VTab, VTabPanel, VButton } from "../ui/Tabs";

import '../stylesheets/Tabs.css';
import '../stylesheets/Patient.css';

import AuthService from "../services/auth-service";
import PatientService from "../services/patient-service"

import AlertDialogBox from "../ui/DailogboxAlert";
import ErorrDialogBox from "../ui/DailogboxError";
import DailogboxFormPrompt from "../ui/DailogboxFormPrompt";

import AddPersonDetails from "../PersonDetails/AddPersonDetails";
import Physical from "../PatientRecord/Physical";
import Blood from "../PatientRecord/Blood";
import EKG1Lead from "../PatientRecord/EKG_1_lead";
import EKG12Lead from "../PatientRecord/EKG_12_lead";
import ECHO from "../PatientRecord/ECHO";
import Ultrasound from "../PatientRecord/Ultrasound";
import AnkleBrachial from "../PatientRecord/Ankle_Brachial";
import COVA from "../PatientRecord/COVA";
import Retinal from "../PatientRecord/Retinal";
import Glyocheck from "../PatientRecord/Glyocheck";


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

class UpdateRecord extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      redirect: null,

      isCloseBtnAppear: true,
      openFormDailog: false,
      openAlertDailog: false,
      openErrorDailog: false,
      openConfirmDailog: false,

      personDetails: null
    };

  }

  SetPersonDetials(patientDetails) {
    if (patientDetails) {
      this.setState({
        personDetails: {
          patientid: patientDetails.patientid,
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
      });
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
      //localStorage.setItem('routeState', JSON.stringify(patientDetails))
      details = patientDetails;
    } else {
      //details = localStorage.getItem('routeState')
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

  async refreshPostUpdate() {
    this.setState({ isLoading: true });
    const pid = this.state.personDetails.patientid;
    const res = await PatientService.get(pid);
    if (res.data) {
      this.setState({
        personDetails: {
          ...res.data,
          patientid: pid,
        }, isLoading: false
      });
    } else {
      console.log("error occured while fetching updated patient record");
      this.setState({ isLoading: false });
    }
  }

  handleSuccessDailog = () => {
    this.setState({ openFormDailog: false, openAlertDailog: true, });
  };

  handleErrorDailog = () => {
    this.setState({ openFormDailog: false, openConfirmDailog: false, openErrorDailog: true, });
  };

  closeFormDailog = () => {
    this.setState({ openFormDailog: false, });
  };

  closeAlertDailog = () => {
    this.setState({ openAlertDailog: false, isCloseBtnAppear: true });
    this.refreshPostUpdate();
    /*window.location.reload(true);*/
  };

  closeErrorDailog = () => {
    this.setState({ openErrorDailog: false, });
  };

  closeConfirmDailog = () => {
    this.setState({ openConfirmDailog: false, });
  };

  setCloseBtnAppear = () => {
    this.setState({ isCloseBtnAppear: false, });
  };

  render() {

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    let PatientInfo = null;
    if (this.state.personDetails) {
      PatientInfo = [
        { label: "First name", value: this.state.personDetails.firstname }
        , { label: "Last name", value: this.state.personDetails.lastname }
        , { label: "Sex", value: this.state.personDetails.sex }
        , { label: "Age", value: this.state.personDetails.age }
        , { label: "Mobile", value: this.state.personDetails.phonenumber }
        , { label: "Email", value: this.state.personDetails.email }
        , { label: "Address", value: this.state.personDetails.address }
        , { label: "City", value: this.state.personDetails.city }
        , { label: "State", value: this.state.personDetails.state }
        , { label: "zip", value: this.state.personDetails.zip }
      ];
    }

    var ShowPatientInfo = PatientInfo ? PatientInfo.map(function (item) {
      return (
        <div className="row mb-1">
          <div className="col-sm-5">{item.label} :</div>
          <div className="col-sm-7" style={{ "fontWeight": "600" }}>{item.value}</div>
        </div>
      );
    }) : null;

    return this.state.isLoading ? (
      <div className="loading_spinner">
        <i className="fas fa-spinner fa-pulse fa-2x" style={{ top: "50%", left: "50%" }} ></i>
      </div>
    ) : (
      <div className="mainpage">

        <AlertDialogBox
          openDailog={this.state.openAlertDailog}
          onSetOpenDailog={this.closeAlertDailog}
          title="Patient Information"
          des="Patient details have been updated sccessfully."
        ></AlertDialogBox>

        <ErorrDialogBox
          openDailog={this.state.openErrorDailog}
          onSetOpenDailog={this.closeErrorDailog}
          title="Error"
          des="Someting went wrong. Try again..."
        ></ErorrDialogBox>

        <DailogboxFormPrompt
          openDailog={this.state.openFormDailog}
          title="Update Patient Information"
          onSetOpenDailog={this.closeFormDailog}
          isCloseBtnAppear={this.state.isCloseBtnAppear}
        >
          <AddPersonDetails
            setCloseBtnAppear={this.setCloseBtnAppear}
            handleSuccessDailog={this.handleSuccessDailog}
            handleErrorDailog={this.handleErrorDailog}
            NewPatient={false}
            personDetail={this.state.personDetails}
          />
        </DailogboxFormPrompt>

        <div className="main_section">
          <div className="topheader">
            <Link to="/patientList" className="search-patient"  >
              <button type="button" className="btn btn-warning" >
                <i className="fa fa-search" aria-hidden="true"></i> &nbsp;Search patient
              </button>
            </Link>

            <ul>
              <li>
                <i class="fa fa-user-edit fa-2x" aria-hidden="true"></i>
              </li>
              <li>
                <h5>
                  {this.state.personDetails && this.state.personDetails.collectionName
                    ? this.state.personDetails.collectionName
                    : ("View record for: " + this.state.personDetails.firstname + " " + this.state.personDetails.lastname)
                  }

                </h5>
              </li>
            </ul>
          </div>

          <hr />

          <div className="main_container">

            <div className="profile_container">

              <div className="patient_name_container">

                <div className="cirlce_initial">
                  {this.state.personDetails.firstname.charAt(0)}{this.state.personDetails.lastname.charAt(0)}
                </div>
                <div className="patient_name">
                  <figure>
                    <blockquote class="blockquote">
                      <p className="patient_name">{this.state.personDetails.firstname} {this.state.personDetails.lastname}</p>
                    </blockquote>
                    <figcaption class="blockquote-footer x-cite"><cite><small>{this.state.personDetails.patientid}</small></cite></figcaption>
                  </figure>
                </div>

              </div>

              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Basic Information</Accordion.Header>
                  <Accordion.Body className="text-justify">
                    <div className="patient_details">

                      {ShowPatientInfo}

                      <div className="text-center mt-3">
                        <button type="button" className="btn btn-warning btn-yellow"
                          onClick={() => { this.setState({ openFormDailog: true, }); }}
                        >
                          <i className="fas fa-edit" style={{ top: "50%", left: "50%" }} ></i> &nbsp;Edit
                        </button>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>RQ/SAT/KAT</Accordion.Header>
                  <Accordion.Body className="text-justify">
                    Let's handle RQ/SAT/KAT here...
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

            </div>

            <div className="content_container">
              <div className="tabs">

                <Tabs>
                  <Tab label="Primary Measurement">
                    <div>

                      <VTabs selected={0}>
                        <VTabList>
                          <VTab> <VButton>Physical measurement</VButton> </VTab>
                          <VTab> <VButton>Blood collection</VButton> </VTab>
                          <VTab> <VButton>One lead EKG</VButton>  </VTab>
                        </VTabList>

                        <VTabPanel> <Physical /> </VTabPanel>

                        <VTabPanel> <Blood /> </VTabPanel>

                        <VTabPanel> <EKG1Lead /> </VTabPanel>
                      </VTabs>

                    </div>
                  </Tab>
                  <Tab label="Risk Assessment">
                    <div>
                      <p>Risk Assessment: calculation logic and result</p>
                    </div>
                  </Tab>

                  <Tab label="Advance Measurement">
                    <div>
                      <VTabs selected={0}>
                        <VTabList>
                          <VTab> <VButton>12 lead EKG</VButton> </VTab>
                          <VTab> <VButton>ECHO</VButton> </VTab>
                          <VTab> <VButton>Ultrasound</VButton> </VTab>
                          <VTab> <VButton>Ankle Brachial</VButton> </VTab>
                          <VTab> <VButton>COVA</VButton> </VTab>
                          <VTab> <VButton>Retinal</VButton> </VTab>
                          <VTab> <VButton>Glyocheck</VButton> </VTab>
                        </VTabList>

                        <VTabPanel> <EKG12Lead /> </VTabPanel>
                        <VTabPanel> <ECHO /> </VTabPanel>
                        <VTabPanel> <Ultrasound /> </VTabPanel>
                        <VTabPanel> <AnkleBrachial /> </VTabPanel>
                        <VTabPanel> <COVA /> </VTabPanel>
                        <VTabPanel> <Retinal /> </VTabPanel>
                        <VTabPanel> <Glyocheck /> </VTabPanel>
                      </VTabs>
                    </div>
                  </Tab>

                  <Tab label="Questionnaire Review">
                    <div>
                      <p>Questionnaire Review</p>
                    </div>
                  </Tab>

                  <Tab label="Final Step">
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <p>Consultation</p>
                        <p>Action plan</p>
                        <p>Post screening</p>
                      </div>
                      <div className="col-md-9 mb-9">
                        <p>Individual stuff goes here...</p>
                      </div>
                    </div>
                  </Tab>

                </Tabs>
              </div>
            </div>

          </div>

        </div >
      </div >
    );
  }
}

export default withRouter(UpdateRecord);
