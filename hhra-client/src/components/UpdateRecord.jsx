import React, { Component } from "react";
import { Navigate, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { Tabs, Tab, VTabs, VTabList, VTab, VTabPanel, VButton } from "../ui/Tabs";

import '../stylesheets/Tabs.css';

import AuthService from "../services/auth-service";
import EditPersonDetails from "../PersonDetails/editpersondetails";
import Physical from "../PatientRecord/Physical";
import Blood from "../PatientRecord/Blood";
import EKG_1_Lead from "../PatientRecord/EKG_1_lead";
import EKG_12_Lead from "../PatientRecord/EKG_12_lead";
import ECHO from "../PatientRecord/ECHO";
import Ultrasound from "../PatientRecord/Ultrasound";
import Ankle_Brachial from "../PatientRecord/Ankle_Brachial";
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
      personDetails: null
    };

  }

  SetPersonDetials(patientDetails) {
    if (patientDetails) {
      this.setState({
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


  render() {

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    return this.state.isLoading ? (
      <div className="loading_spinner">
        <i className="fas fa-spinner fa-pulse fa-2x" style={{ top: "50%", left: "50%" }} ></i>
      </div>
    ) : (
      <div className="mainpage">
        <div className="main_section">
          <div className="topheader">
            <Link to="/patientList" className="search-patient"  >
              <button type="button" className="btn btn-warning" >
                <i className="fa fa-magnifying-glass" aria-hidden="true"></i> Search patient
              </button>
            </Link>

            <ul>
              <li>
                <i class="fa fa-user-edit fa-2x" aria-hidden="true"></i>
              </li>
              <li>
                <h5>
                  {this.state.personDetails && this.state.personDetails.collectionName ?
                    (this.state.personDetails.collectionName) :
                    ("Update record for: Unknown")}
                </h5>
              </li>
            </ul>
          </div>


          <div className="tabs">

            <Tabs>
              <Tab label="Registration Info">
                <div>

                  <VTabs selected={0}>
                    <VTabList>
                      <VTab> <VButton>Basic information</VButton> </VTab>
                      <VTab> <VButton>RQ/SAT/KAT</VButton> </VTab>
                    </VTabList>

                    <VTabPanel> <EditPersonDetails /> </VTabPanel>
                    <VTabPanel>
                      <div>RQ/SAT/KAT : STEP TWO /  PRE-SCREENING STATION:
                        PARTICIPANTS WHO NEED HELP TO COMPLETE THE RISK QUESTIONNAIRE (RQ), KNOWLEDGE ASSESSMENT TEST (KAT), AND SELF-ASSESSMENT TEST (SAT),
                        VOLUNTEERS WILL BE AVAILABLE.</div>
                    </VTabPanel>
                  </VTabs>

                </div>
              </Tab>

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

                    <VTabPanel> <EKG_1_Lead /> </VTabPanel>
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

                    <VTabPanel> <EKG_12_Lead /> </VTabPanel>
                    <VTabPanel> <ECHO /> </VTabPanel>
                    <VTabPanel> <Ultrasound /> </VTabPanel>
                    <VTabPanel> <Ankle_Brachial /> </VTabPanel>
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
    );
  }
}

export default withRouter(UpdateRecord);
