import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";

import AuthService from "../services/auth-service";
import UserService from "../services/user-service";

import "../stylesheets/dashboard.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      redirect: null,
      useready: false,
      showAdmin: false,
      showModerator: false,
      isOpen: false,
      currentUser: { username: "" },
      getAllDocCount: {
        patients: 0,
        volunteers: 0,
        admins: 0,
      }
    };
  }

  async componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      this.setState({ redirect: "/home" });
    }

    let isAdmin = false;
    let isModerator = false;

    if (currentUser) {
      isAdmin = currentUser.roles.includes("ROLE_ADMIN");
      isModerator = currentUser.roles.includes("ROLE_MODERATOR");

      this.setState({
        currentUser: currentUser,
        userReady: true,
        showAdmin: isAdmin,
        showModerator: isModerator,
      })
    }

    await this.getAllDocCount(isAdmin || isModerator);
  }

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  async getAllDocCount(bGetList) {
    this.setState({
      isLoading: true,
    });

    if (bGetList) {

      UserService.getAdminList().then(
        response => {
          const userList = response.data;

          this.setState(prevState => ({
            getAllDocCount: {                      // object that we want to update
              ...prevState.getAllDocCount,         // keep all other key-value pairs
              admins: userList.length,            // update the value of specific key
            }
          }))
        },
        error => {
          console.log((error.response && error.response.data) ? error.message : error.toString());
        }
      );

      UserService.getVolunteerList().then(
        response => {
          const userList = response.data;

          this.setState(prevState => ({
            getAllDocCount: {                      // object that we want to update
              ...prevState.getAllDocCount,         // keep all other key-value pairs
              volunteers: userList.length,         // update the value of specific key
            }
          }))
        },
        error => {
          console.log((error.response && error.response.data) ? error.message : error.toString());
        }
      );

    }

    this.setState({
      isLoading: false,
    });
  }



  render() {
    const { showAdmin, showModerator } = this.state;

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    return (
      <div>
        {(this.state.userReady) ?
          <div>

            <div className="dashboardpage">
              <div className="topheader">
                <ul>
                  <li>
                    <i class="far fa-arrow-alt-circle-right fa-2x" aria-hidden="true"></i>
                  </li>
                  <li>
                    <span>Dashboard</span>
                  </li>
                </ul>
              </div>

              <div className="first_section">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    {" "}
                    <Link to="../patientList" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                      <div className="box">
                        {" "}
                        <div className="box_containt">
                          <h1 style={{ fontWeight: "700", color: "#BA79CB", fontSize: "30px", }}>
                            {this.state.getAllDocCount.patients}
                          </h1>

                          <span style={{ fontWeight: "700", color: "#BA79CB", }} > Patients </span>
                        </div>
                        <i class="fa fa-user-injured fa-4x" aria-hidden="true"></i>

                      </div>
                    </Link>
                  </div>

                  {(showModerator || showAdmin) && (<div className="col-md-4 mb-3">
                    {" "}
                    <div className="box">
                      {" "}
                      <div className="box_containt">
                        <h1
                          style={{ fontWeight: "700", color: "#FFA812", fontSize: "30px", }} >
                          {this.state.getAllDocCount.volunteers}
                        </h1>

                        <span style={{ fontWeight: "700", color: "#FFA812", }} > Volunteers </span>
                      </div>
                      <i class="fa fa-user-md fa-4x" aria-hidden="true"></i>
                    </div>
                  </div>
                  )}

                  {showAdmin && (<div className="col-md-4 mb-3">
                    {" "}
                    <div className="box">
                      {" "}
                      <div className="box_containt">
                        <h1 style={{ fontWeight: "700", color: "#00A65A", fontSize: "30px", }} >
                          {this.state.getAllDocCount.admins}
                        </h1>

                        <span style={{ fontWeight: "700", color: "#00A65A", }} > Admins </span>
                      </div>
                      <i class="fa fa-user-tie fa-4x" aria-hidden="true"></i>
                    </div>
                  </div>
                  )}

                </div>
              </div>

            </div >
          </div > : null
        }
      </div>
    );
  }
}
