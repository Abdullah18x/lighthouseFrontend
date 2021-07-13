import React, { Component } from "react";
import ViewTeacherAssignedSection from "../../components/ViewTeacherAssignedSection";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const admin = require("../../axios/admin");

class Viewteacherprofile extends Component {
  state = {
    teacherId: "",
    adminId: ls.get("adminId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    userName: "",
    email: "",
    name: "",
    updatedName: "",
    updatedEmail: "",
    updatedPassword: "",
    status: "Un Assigned",
    assignedSections: [],
    loggedIn: true,
  };

  verification = async () => {
    let verifyToken = await auth.verifyToken(
      this.state.adminId,
      this.state.userType,
      this.state.token
    );
    if (verifyToken.length === 0) {
      this.setState({
        loggedIn: false,
      });
      return;
    } else {
      if (verifyToken.expired === 1) {
        this.setState({
          loggedIn: false,
        });
      }
      return;
    }
  };

  setTeacher = async () => {
    try {
      let teacherId = this.props.location.state.teacherId;
      let returedLecturer = await admin.getLecturer(
        teacherId,
        this.state.token
      );
      let status = "Un Assigned";
      if (returedLecturer.status === 1) {
        status = "Assigned";
      }
      this.setState({
        teacherId: returedLecturer.lecturerId,
        userName: returedLecturer.userName,
        email: returedLecturer.email,
        name: returedLecturer.name,
        updatedName: returedLecturer.name,
        updatedEmail: returedLecturer.email,
        updatedPassword: returedLecturer.password,
        status: status,
      });
    } catch (error) {
      window.location.href = "/error";
      // console.log(error)
    }
  };

  updateLecturer = async () => {
    try {
      let updateLecturer = await admin.updateLecturer(
        this.state.teacherId,
        this.state.updatedName,
        this.state.updatedEmail,
        this.state.updatedPassword,
        this.state.token
      );
      this.setTeacher();
    } catch (error) {
      console.log(error);
    }
  };
  setUsername = (event) => {
    let value = event.target.value;
    this.setState({
      updatedName: value,
    });
  };

  setEmail = (event) => {
    let value = event.target.value;
    this.setState({
      updatedEmail: value,
    });
  };

  setPassword = (event) => {
    let value = event.target.value;
    this.setState({
      updatedPassword: value,
    });
  };

  getAssignedSections = async () => {
    try {
      let returnedSection = await admin.getAssignedSections(
        this.props.location.state.teacherId,
        this.state.token
      );
      this.setState({
        assignedSections: returnedSection,
      });
    } catch (error) {
      console.log(error);
    }
  };

  unAssignTeacher = async (lecturerId, assignId) => {
    try {
      let unassignedStatus = await admin.unAssignTeacher(
        lecturerId,
        assignId,
        this.state.token
      );
      let returnedSection = await admin.getAssignedSections(
        this.props.location.state.teacherId,
        this.state.token
      );
      this.setState({
        assignedSections: returnedSection,
      });
    } catch (error) {}
  };

  componentDidMount() {
    if (
      this.state.adminId === null ||
      this.state.adminId === undefined ||
      this.state.userType === null ||
      this.state.userType === undefined ||
      this.state.token === null ||
      this.state.token === undefined
    ) {
      this.setState({
        loggedIn: false,
      });
      window.location.href = "/error";
    } else {
      this.verification();
    }
    if (this.state.loggedIn) {
      this.setTeacher();
      this.getAssignedSections();
    }
  }

  isLoggedIn = () => {
    if (this.state.loggedIn) {
      return (
        <div>
          <div className="main-content">
            <div
              class="modal fade"
              id="updateLecturer"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Update Lecturer
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div className="form-group">
                      <label
                        className="font-weight-semibold"
                        htmlFor="userName"
                      >
                        Name:
                      </label>
                      <div className="input-affix">
                        <i className="prefix-icon anticon anticon-user" />
                        <input
                          type="text"
                          className="form-control"
                          id="userName"
                          placeholder="Username"
                          onChange={(e) => this.setUsername(e)}
                          value={this.state.updatedName}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        className="font-weight-semibold"
                        htmlFor="userName"
                      >
                        Email:
                      </label>
                      <div className="input-affix">
                        <i className="prefix-icon anticon anticon-user" />
                        <input
                          type="text"
                          className="form-control"
                          id="userName"
                          placeholder="Username"
                          onChange={(e) => this.setEmail(e)}
                          value={this.state.updatedEmail}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        className="font-weight-semibold"
                        htmlFor="userName"
                      >
                        Password:
                      </label>
                      <div className="input-affix">
                        <i className="prefix-icon anticon anticon-user" />
                        <input
                          type="text"
                          className="form-control"
                          id="userName"
                          placeholder="Username"
                          onChange={(e) => this.setPassword(e)}
                          value={this.state.updatedPassword}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={this.updateLecturer}
                      class="btn btn-primary"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="page-header">
              <h2 className="header-title">Profile</h2>
              <div className="header-sub-title">
                <nav className="breadcrumb breadcrumb-dash">
                  <a href="#" className="breadcrumb-item">
                    <i className="anticon anticon-home m-r-5" />
                    Home
                  </a>
                  <a className="breadcrumb-item" href="#">
                    Pages
                  </a>
                  <span className="breadcrumb-item active">Profile</span>
                </nav>
              </div>
            </div>
            <div className="container">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-7">
                      <div className="d-md-flex align-items-center">
                        <div className="text-center text-sm-left ">
                          <div
                            className="avatar avatar-image"
                            style={{ width: "150px", height: "150px" }}
                          >
                            <img
                              src="../assets/images/avatars/thumb.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="text-center text-sm-left m-v-15 p-l-30">
                          <h2 className="m-b-5">{this.state.name}</h2>
                          <button
                            type="button"
                            data-toggle="modal"
                            data-target="#updateLecturer"
                            className="btn btn-primary btn-tone"
                          >
                            Edit Profile
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="row">
                        <div className="d-md-block d-none border-left col-1" />
                        <div className="col">
                          <ul className="list-unstyled m-t-10">
                            <li className="row">
                              <p className="col-sm-4 col-4 font-weight-semibold text-dark m-b-5">
                                <i className="m-r-10 text-primary anticon anticon-mail" />
                                <span>Email: </span>
                              </p>
                              <p className="col font-weight-semibold">
                                {this.state.email}
                              </p>
                            </li>
                            <li className="row">
                              <p className="col-sm-4 col-4 font-weight-semibold text-dark m-b-5">
                                <i className="m-r-10 text-primary anticon anticon-phone" />
                                <span>Status: </span>
                              </p>
                              <p className="col font-weight-semibold">
                                {this.state.status}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h4>View Assigned Sections</h4>
                  <div className="m-t-25">
                    <table id="data-table" className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Section</th>
                          <th>Students</th>
                          <th>Subject</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.assignedSections.map((data, index) => {
                          return (
                            <ViewTeacherAssignedSection
                              key={index}
                              sectionId={data.sectionId}
                              section={data.section}
                              numberOfStudents={data.subjectStudents}
                              subject={data.subject}
                              subjectId={data.subjectId}
                              lecturerId={this.state.teacherId}
                              assignId={data.assignId}
                              unAssign={() => {
                                this.unAssignTeacher(
                                  this.state.teacherId,
                                  data.assignId
                                );
                              }}
                            />
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>ID</th>
                          <th>Section</th>
                          <th>Students</th>
                          <th>Subjects</th>
                          <th>Action</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="footer-content">
              <p className="m-b-0">
                Copyright © 2020 COMSATS University. All rights reserved.
              </p>
              <span></span>
            </div>
          </footer>
        </div>
      );
    }
  };

  render() {
    return <div className="page-container">{this.isLoggedIn()}</div>;
  }
}

export default Viewteacherprofile;
