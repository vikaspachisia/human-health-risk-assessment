import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";

import '../stylesheets/Patient.css';

import AuthService from "../services/auth-service";
import UserService from "../services/user-service";
import EventBus from "../common/EventBus";

import AlertDialogBox from "../ui/DailogboxAlert";
import ConfirmDialogBox from "../ui/DailogboxConfirm";
import ErorrDialogBox from "../ui/DailogboxError";
import DailogboxFormPrompt from "../ui/DailogboxFormPrompt";
import AddPersonDetails from "../PersonDetails/addpersondetails";

export default class PatientList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      content: "",

      serachText: "",
      isLoading: true,
      limit: 10,

      isLoadMoredata: false,
      isCloseBtnAppear: true,
      isDeleting: false,

      totalNumOfPatient: null,
      noMoreDataText: "",

      openFormDailog: false,
      openAlertDailog: false,
      openErrorDailog: false,
      openConfirmDailog: false,

      patientlist: [],
      isSearching: false,
      isSearchDataShow: false,

      selectedPatientName: "",
      selectedPatientId: "",

      patientDetails: null,
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      this.setState({ redirect: "/home" });
    }

    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data,
          patientlist: [
            {
              "bloodgroup": "A",
              "birthdate": "2/3/1984",
              "patientid": "300102217000",
              "zip": "10965",
              "sex": "Male",
              "email": "admin@example.com",
              "remark": "remarks",
              "searchbyname": "Mmchaelbrown",
              "city": "Pearl River",
              "age": "38",
              "phonenumber": "+1234567890",
              "firstname": "Michael",
              "state": "New York",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "lastname": "Brown",
              "address": "4347 Marshville Road",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 80000000
              }
            },
            {
              "deathreportid": "300102217036",
              "birthdate": "2/3/1990",
              "isBedAllotted": true,
              "age": "30",
              "email": "admin@example.com",
              "firstname": "Lucy",
              "bedallotementid": "300102217038",
              "searchbyname": "lucywhite",
              "collectionName": "patients",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 79000000
              },
              "operationreportid": "300102217035",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "phonenumber": "+0123456789",
              "birthreportid": "300102217037",
              "state": "Oklahoma",
              "isBeforeBirthAlloted": true,
              "isBeforeDeathAlloted": true,
              "address": "97 Bridge Street",
              "zip": "74116",
              "city": "Tulsa",
              "sex": "Female",
              "lastname": "White",
              "bloodgroup": "B+",
              "isBeforeOperationAlloted": true,
              "remark": "remarks",
              "patientid": "300102217001"
            },
            {
              "email": "admin@example.com",
              "patientid": "300102217002",
              "sex": "Male",
              "age": "36",
              "remark": "remakrs",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "phonenumber": "+0234567890",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 79000000
              },
              "address": "2761 Thrash Trail",
              "zip": "70093",
              "state": "Louisiana",
              "searchbyname": "frankhill",
              "bloodgroup": "AB",
              "firstname": "Frank",
              "city": "BELLE CHASSE",
              "lastname": "Hill",
              "birthdate": "2/3/1984"
            },
            {
              "bloodgroup": "A",
              "birthdate": "2/3/1984",
              "patientid": "300102217003",
              "zip": "10965",
              "sex": "Male",
              "email": "admin@example.com",
              "remark": "remarks",
              "searchbyname": "Mmchaelbrown",
              "city": "Pearl River",
              "age": "38",
              "phonenumber": "+1234567890",
              "firstname": "Michael",
              "state": "New York",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "lastname": "Brown",
              "address": "4347 Marshville Road",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 80000000
              }
            },
            {
              "deathreportid": "300102217036",
              "birthdate": "2/3/1990",
              "isBedAllotted": true,
              "age": "30",
              "email": "admin@example.com",
              "firstname": "Lucy",
              "bedallotementid": "300102217038",
              "searchbyname": "lucywhite",
              "collectionName": "patients",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 79000000
              },
              "operationreportid": "300102217035",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "phonenumber": "+0123456789",
              "birthreportid": "300102217037",
              "state": "Oklahoma",
              "isBeforeBirthAlloted": true,
              "isBeforeDeathAlloted": true,
              "address": "97 Bridge Street",
              "zip": "74116",
              "city": "Tulsa",
              "sex": "Female",
              "lastname": "White",
              "bloodgroup": "B+",
              "isBeforeOperationAlloted": true,
              "remark": "remarks",
              "patientid": "300102217004"
            },
            {
              "email": "admin@example.com",
              "patientid": "300102217005",
              "sex": "Male",
              "age": "36",
              "remark": "remakrs",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "phonenumber": "+0234567890",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 79000000
              },
              "address": "2761 Thrash Trail",
              "zip": "70093",
              "state": "Louisiana",
              "searchbyname": "frankhill",
              "bloodgroup": "AB",
              "firstname": "Frank",
              "city": "BELLE CHASSE",
              "lastname": "Hill",
              "birthdate": "2/3/1984"
            },
            {
              "bloodgroup": "A",
              "birthdate": "2/3/1984",
              "patientid": "300102217006",
              "zip": "10965",
              "sex": "Male",
              "email": "admin@example.com",
              "remark": "remarks",
              "searchbyname": "Mmchaelbrown",
              "city": "Pearl River",
              "age": "38",
              "phonenumber": "+1234567890",
              "firstname": "Michael",
              "state": "New York",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "lastname": "Brown",
              "address": "4347 Marshville Road",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 80000000
              }
            },
            {
              "deathreportid": "300102217036",
              "birthdate": "2/3/1990",
              "isBedAllotted": true,
              "age": "30",
              "email": "admin@example.com",
              "firstname": "Lucy",
              "bedallotementid": "300102217038",
              "searchbyname": "lucywhite",
              "collectionName": "patients",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 79000000
              },
              "operationreportid": "300102217035",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "phonenumber": "+0123456789",
              "birthreportid": "300102217037",
              "state": "Oklahoma",
              "isBeforeBirthAlloted": true,
              "isBeforeDeathAlloted": true,
              "address": "97 Bridge Street",
              "zip": "74116",
              "city": "Tulsa",
              "sex": "Female",
              "lastname": "White",
              "bloodgroup": "B+",
              "isBeforeOperationAlloted": true,
              "remark": "remarks",
              "patientid": "300102217007"
            },
            {
              "email": "admin@example.com",
              "patientid": "300102217008",
              "sex": "Male",
              "age": "36",
              "remark": "remakrs",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "phonenumber": "+0234567890",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 79000000
              },
              "address": "2761 Thrash Trail",
              "zip": "70093",
              "state": "Louisiana",
              "searchbyname": "frankhill",
              "bloodgroup": "AB",
              "firstname": "Frank",
              "city": "BELLE CHASSE",
              "lastname": "Hill",
              "birthdate": "2/3/1984"
            },
            {
              "bloodgroup": "A",
              "birthdate": "2/3/1984",
              "patientid": "300102217009",
              "zip": "10965",
              "sex": "Male",
              "email": "admin@example.com",
              "remark": "remarks",
              "searchbyname": "Mmchaelbrown",
              "city": "Pearl River",
              "age": "38",
              "phonenumber": "+1234567890",
              "firstname": "Michael",
              "state": "New York",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "lastname": "Brown",
              "address": "4347 Marshville Road",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 80000000
              }
            },
            {
              "deathreportid": "300102217010",
              "birthdate": "2/3/1990",
              "isBedAllotted": true,
              "age": "30",
              "email": "admin@example.com",
              "firstname": "Lucy",
              "bedallotementid": "300102217038",
              "searchbyname": "lucywhite",
              "collectionName": "patients",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 79000000
              },
              "operationreportid": "300102217035",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "phonenumber": "+0123456789",
              "birthreportid": "300102217037",
              "state": "Oklahoma",
              "isBeforeBirthAlloted": true,
              "isBeforeDeathAlloted": true,
              "address": "97 Bridge Street",
              "zip": "74116",
              "city": "Tulsa",
              "sex": "Female",
              "lastname": "White",
              "bloodgroup": "B+",
              "isBeforeOperationAlloted": true,
              "remark": "remarks",
              "patientid": "300102217011"
            },
            {
              "email": "admin@example.com",
              "patientid": "300102217012",
              "sex": "Male",
              "age": "36",
              "remark": "remakrs",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "phonenumber": "+0234567890",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 79000000
              },
              "address": "2761 Thrash Trail",
              "zip": "70093",
              "state": "Louisiana",
              "searchbyname": "frankhill",
              "bloodgroup": "AB",
              "firstname": "Frank",
              "city": "BELLE CHASSE",
              "lastname": "Hill",
              "birthdate": "2/3/1984"
            },
            {
              "bloodgroup": "A",
              "birthdate": "2/3/1984",
              "patientid": "300102217013",
              "zip": "10965",
              "sex": "Male",
              "email": "admin@example.com",
              "remark": "remarks",
              "searchbyname": "Mmchaelbrown",
              "city": "Pearl River",
              "age": "38",
              "phonenumber": "+1234567890",
              "firstname": "Michael",
              "state": "New York",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "lastname": "Brown",
              "address": "4347 Marshville Road",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 80000000
              }
            },
            {
              "deathreportid": "300102217036",
              "birthdate": "2/3/1990",
              "isBedAllotted": true,
              "age": "30",
              "email": "admin@example.com",
              "firstname": "Lucy",
              "bedallotementid": "300102217038",
              "searchbyname": "lucywhite",
              "collectionName": "patients",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 79000000
              },
              "operationreportid": "300102217035",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "phonenumber": "+0123456789",
              "birthreportid": "300102217037",
              "state": "Oklahoma",
              "isBeforeBirthAlloted": true,
              "isBeforeDeathAlloted": true,
              "address": "97 Bridge Street",
              "zip": "74116",
              "city": "Tulsa",
              "sex": "Female",
              "lastname": "White",
              "bloodgroup": "B+",
              "isBeforeOperationAlloted": true,
              "remark": "remarks",
              "patientid": "300102217014"
            },
            {
              "email": "admin@example.com",
              "patientid": "300102217015",
              "sex": "Male",
              "age": "36",
              "remark": "remakrs",
              "imgaeurl": "https://firebasestorage.googleapis.com/v0/b/fir-hospital-management.appspot.com/o/images%2Fprofileimage.jpeg?alt=media&token=cbbe44b1-f3d1-4b4e-a50e-259257573b80",
              "phonenumber": "+0234567890",
              "timeStamp": {
                "seconds": 1657767907,
                "nanoseconds": 79000000
              },
              "address": "2761 Thrash Trail",
              "zip": "70093",
              "state": "Louisiana",
              "searchbyname": "frankhill",
              "bloodgroup": "AB",
              "firstname": "Frank",
              "city": "BELLE CHASSE",
              "lastname": "Hill",
              "birthdate": "2/3/1984"
            }
          ]
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  showMore = () => {
    if (this.state.limit <= this.state.totalNumOfPatient) {
      const limit = this.state.limit + 10;
      this.setState({ limit: limit });
      this.onFetchData(limit);
    } else {
      this.setState({
        noMoreDataText: "No More Patients",
      });
    }
  };

  handleOnDelete = (patientname, id) => {
    this.setState({
      selectedPatientName: patientname,
      selectedPatientId: id,
      openConfirmDailog: true,
    });
  };

  deleteData = async () => {
    this.setState({ isDeleting: true });
    //const res = await Service.deleteData(
    //  "patients",
    //  this.state.selectedPatientId,
    //  this.props.persionUidDeatils.uid,
    //  this.props.persionUidDeatils.uid
    //);
    const res = "success";
    if (res === "success") {
      this.setState({
        isDeleting: false,
        openConfirmDailog: false,
      });
      window.location.reload(false);
    } else {
      this.setState({
        isDeleting: false,
      });
      this.handleErrorDailog();
    }
  };

  handleSeach = async () => {
    if (this.state.serachText === "" || null) {
      window.location.reload(false);
    } else {
      this.setState({
        isSearching: true,
        isSearchDataShow: true,
      });

      const searchText = this.state.serachText.toLowerCase().replace(/\s/g, "");

      //const resultPatientlist = await Service.getSearchRes(
      //  "patients",
      //  searchText,
      //  this.props.persionUidDeatils.uid,
      //  this.props.persionUidDeatils.uid
      //);

      const resultPatientlist = "error";
      if (resultPatientlist === "error") {
        this.setState({
          isSearching: false,
          openErrorDailog: true,
        });
      } else {
        this.setState({
          patientlist: resultPatientlist,
          isSearching: false,
        });
      }
    }
  };

  handleSuccessDailog = () => {
    this.setState({
      openFormDailog: false,
      openAlertDailog: true,
    });
  };
  handleErrorDailog = () => {
    this.setState({
      openFormDailog: false,
      openConfirmDailog: false,
      openErrorDailog: true,
    });
  };
  closeFormDailog = () => {
    this.setState({
      openFormDailog: false,
    });
  };
  closeAlertDailog = () => {
    this.setState({
      openAlertDailog: false,
    });
    window.location.reload(false);
  };
  closeErrorDailog = () => {
    this.setState({
      openErrorDailog: false,
    });
  };
  closeConfirmDailog = () => {
    this.setState({
      openConfirmDailog: false,
    });
  };
  setCloseBtnAppear = () => {
    this.setState({
      isCloseBtnAppear: false,
    });
  };

  render() {

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    let count = 0;
    return (
      <div className="mainpage">
        <div className="main_section">
          <ConfirmDialogBox
            openDailog={this.state.openConfirmDailog}
            onSetOpenDailog={this.closeConfirmDailog}
            handleConfirmOkBtn={this.deleteData}
            isLoading={this.state.isDeleting}
            title="Delete"
            des={
              "Are you sure to delete " +
              this.state.selectedPatientName +
              " " +
              "details"
            }
          ></ConfirmDialogBox>
          <AlertDialogBox
            openDailog={this.state.openAlertDailog}
            onSetOpenDailog={this.closeAlertDailog}
            title="Added"
            des="New Patient has been added sccessfully"
          ></AlertDialogBox>
          <ErorrDialogBox
            openDailog={this.state.openErrorDailog}
            onSetOpenDailog={this.closeErrorDailog}
            title="Error"
            des="Someting went wrong. Try again"
          ></ErorrDialogBox>

          <DailogboxFormPrompt
            openDailog={this.state.openFormDailog}
            title="Add New Patient"
            onSetOpenDailog={this.closeFormDailog}
            isCloseBtnAppear={this.state.isCloseBtnAppear}
          >
            <AddPersonDetails
              setCloseBtnAppear={this.setCloseBtnAppear}
              handleSuccessDailog={this.handleSuccessDailog}
              handleErrorDailog={this.handleErrorDailog}
              collectionName="patients"
              id="patientid"
            ></AddPersonDetails>
          </DailogboxFormPrompt>
          <div className="topheader">
            <ul>
              <li>
                <i class="fa fa-users fa-2x" aria-hidden="true"></i>
              </li>
              <li>
                <h5>Patients</h5>
              </li>
            </ul>
          </div>
          <hr />
          <div className="top_section">
            <div className="wrap">
              <ul>
                <li>
                  <div className="search">
                    <input
                      type="text"
                      className="searchTerm"
                      placeholder="Search patient by full name"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          this.handleSeach();
                        }
                      }}
                      onChange={(e) => {
                        this.setState({
                          serachText: e.target.value,
                        });
                      }}
                    />

                    <button onClick={this.handleSeach} type="submit" className="searchButton" >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </li>
                <li style={{ fontSize: "12px" }}> #</li>
                <li tyle={{ fontSize: "12px" }}>
                  {this.state.patientlist.length}{" "}
                </li>
              </ul>
            </div>

            <a href="#">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  this.setState({
                    openFormDailog: true,
                  });
                }}
              >
                + Add Patient
              </button>
            </a>
          </div>

          <table className="table table-striped">
            <thead className="thead tablehead">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Profile</th>
                <th scope="col">Name</th>
                <th scope="col">Sex</th>
                <th scope="col">Age</th>
                <th scope="col">Blood Group</th>
                <th scope="col">Mobile</th>
                {/* <th scope="col">Email</th> */}
                <th scope="col">City</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Option</th>
              </tr>
            </thead>

            <tbody className="tablebody">
              {!this.state.isLoading ? (
                <tr className="loading_spinner">
                  <td colSpan="11"><i className="fas fa-spinner fa-pulse fa-2x "></i></td>
                </tr>
              ) : this.state.isSearching ? (
                <tr className="loading_spinner">
                  <td colSpan="11"><i className="fas fa-spinner fa-pulse fa-2x "></i></td>
                </tr>
              ) : this.state.patientlist.length === 0 ? (

                <tr>
                  <td colSpan="11">No Patient Found</td>
                </tr>
              ) : (
                this.state.patientlist &&
                this.state.patientlist.map((p) => {
                  count++;

                  let date = new Date(p.timeStamp.seconds * 1000 + p.timeStamp.nanoseconds / 1000000,);
                  const createdTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                  const createdDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                  const sendData = {
                    ...p,
                    collectionName: "Update record for : " + p.firstname + " " + p.lastname,
                    personId: p.patientid,
                  };

                  return (
                    <tr key={p.patientid}>
                      <td className="align-middle" scope="row">
                        {count}
                      </td>
                      <td className="align-middle">
                        {p.imgaeurl === "" ? (
                          <div className="userbg">
                            <i className="fa fa-user fa-2x"></i>
                          </div>
                        ) : (
                          <img className="image" alt="" srcSet={p.imgaeurl} />
                        )}
                      </td>
                      <td className="align-middle">
                        {p.firstname + " " + p.lastname}
                      </td>
                      <td className="align-middle">{p.sex}</td>
                      <td className="align-middle">
                        {p.age === "" ? "N/A" : p.age}
                      </td>
                      <td className="align-middle">
                        {p.bloodgroup === "" ? "N/A" : p.bloodgroup}
                      </td>
                      <td className="align-middle">
                        {" "}
                        {p.phonenumber === "" ? "N/A" : p.phonenumber}
                      </td>
                      {/* <td className="align-middle">
                          {" "}
                          {p.email == "" ? "N/A" : p.email}
                        </td> */}
                      <td className="align-middle">
                        {p.city === "" ? "N/A" : p.city}
                      </td>
                      <td className="align-middle">
                        {createdDate === "" ? "N/A" : createdDate}
                      </td>
                      <td className="align-middle">
                        {createdTime === "" ? "N/A" : createdTime}
                      </td>
                      <td className="align-middle">
                        <Link to="/updaterecord" state={{ patientDetails: sendData }}>
                          <button type="button" className="btn btn-success" >
                            <i className="fa fa-edit edit-patient" aria-hidden="true"></i>
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            this.handleOnDelete(
                              p.firstname + " " + p.lastname,
                              p.patientid
                            );
                          }}
                        >
                          <i className="fa fa-trash delete-patient" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          <div className="loadmoredatasection">
            {this.state.isLoadMoredata ? (
              <i className="fas fa-spinner fa-pulse fa-2x loadmoredataspinner"></i>
            ) : (
              <div className="nomoredatatext">{this.state.noMoreDataText}</div>
            )}
            {this.state.patientlist.length === 0 ? null : this.state
              .isSearchDataShow ? null : (
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => this.showMore()}
              >
                Show More
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
