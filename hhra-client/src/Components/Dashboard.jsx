import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth-service";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      useready: false,
      showAdmin: false,
      showModerator: false,
      isOpen: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      this.setState({ redirect: "/home" });
    }

    if (currentUser) {
      this.setState({
        currentUser: currentUser,
        userReady: true,
        showAdmin: currentUser.roles.includes("ROLE_ADMIN"),
        showModerator: currentUser.roles.includes("ROLE_MODERATOR"),
      })
    }
  }

  openModal = () => this.setState({ isOpen: true });

  closeModal = () => this.setState({ isOpen: false });

  render() {
    const { showAdmin, showModerator } = this.state;

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    return (
      <div>
        {(this.state.userReady) ?
          <div>

            <div className="row">
              {showAdmin && (
                <div className="col-md-4 g-pad-bottom">
                  <div className="col-md-12 col-xs-12 card">
                    <h5 className="card-header">
                      Manage Users
                    </h5>
                    <div className="card-body">
                      <p> Yet to come</p>
                    </div>
                  </div>
                </div>
              )}

              {(showAdmin || showModerator) && (
                <div className="col-md-4 g-pad-bottom">
                  <div className="col-md-12 col-xs-12 card">
                    <h5 className="card-header">
                      Patient Reporting
                    </h5>
                    <div className="card-body">
                      <p> Yet to come</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-4 g-pad-bottom">
                <div className="col-md-12 col-xs-12 card">
                  <h5 className="card-header">
                    Manage Patient
                  </h5>
                  <div className="card-body">
                    <p> You can enroll new patient and update the details of existing patient. </p>

                    <table style={{ "width": "100%" }}>
                      <tr>
                        <td>
                          <a href="/register" className="btn btn-primary">New Patient</a>
                        </td>
                        <td style={{ "textAlign": "right" }}>
                          <button variant="primary" className="btn btn-success" onClick={this.openModal}> Existing Patient </button>
                        </td>
                      </tr>
                    </table>

                  </div>

                  <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Search Patient</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Example textarea</Form.Label>
                          <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.closeModal}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={this.closeModal}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>

                </div>
              </div>
            </div>

          </div> : null}
      </div>
    );
  }
}
