import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Faq from "./Faq";
import Aboutus from "./Aboutus";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import DashboardAdmin from "./DashboardAdmin";
import DashboardModerator from "./DashboardModerator";
import DashboardUser from "./DashboardUser";

import EventBus from "../common/EventBus";
import AuthService from "../services/auth-service";
import SecuredRoute from "../services/secure-route"

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div style={{ 'paddingTop': '70px' }}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand href="/">
              <img
                src="/logoMain.png"
                width="120"
                height="30"
                className="d-inline-block align-top"
                alt="GHL"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/aboutus">About us</Nav.Link>
                <Nav.Link href="/faq">FAQ</Nav.Link>
                {currentUser && (
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                )}
              </Nav>

              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <Navbar.Text>
                    Logged in as:
                  </Navbar.Text>

                  <NavDropdown title={currentUser.username} id="collasible-nav-dropdown">
                    {showAdminBoard && (
                      <NavDropdown.Item href="/dashboardAdmin"> <span className="fas fa-user-cog" /> Admin Dashboard</NavDropdown.Item>
                    )}
                    {showModeratorBoard && (
                      <NavDropdown.Item href="/dashboardModerator"> <span className="fas fa-user-cog" /> Moderator Dashboard</NavDropdown.Item>
                    )}
                    {currentUser && (
                      <NavDropdown.Item href="/dashboardUser"><span className="fas fa-user-cog" /> User Dashboard</NavDropdown.Item>
                    )}
                    <NavDropdown.Item href="/dashboard"><span className="fas fa-user-cog" /> Dashboard</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/" onClick={this.logOut}> <span className="fas fa-sign-out-alt" /> Sign Out</NavDropdown.Item>
                  </NavDropdown>

                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <Nav.Link href="/signin" > <span className="fas fa-sign-in-alt" /> Sign In</Nav.Link>
                  <Nav.Link href="/signup" > <span className="fas fa-user-plus" /> Sign up</Nav.Link>
                </div>
              )}

            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container mt-4">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="aboutus" element={<Aboutus />} />
              <Route path="faq" element={<Faq />} />
              <Route path="signup" element={<SignUp />} />

              {/*Secure routing: for Individual routing*/}
              <Route path="/signin" element={
                <SecuredRoute redirectPath="/profile" isAllowed={currentUser ? false : true}>
                  <SignIn />
                </SecuredRoute>
              }
              />

              <Route path="profile" element={<Profile />} />

              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboardUser" element={<DashboardUser />} />
              <Route path="dashboardAdmin" element={<DashboardAdmin />} />
              <Route path="dashboardModerator" element={<DashboardModerator />} />

              <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
          </BrowserRouter>
        </div>

      </div >
    );
  };
};
