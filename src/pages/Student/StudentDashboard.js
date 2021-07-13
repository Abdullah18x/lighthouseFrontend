import React, { Component } from "react";
import { Link } from "@reach/router";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const student = require("../../axios/student");

class StudentDashboard extends Component {
  state = {
    studentId: ls.get("studentId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    name: "",
    rollNo: "",
    loggedIn: true,
  };

  verification = async () => {
    let verifyToken = await auth.verifyToken(
      this.state.studentId,
      this.state.userType,
      this.state.token
    );
    if (verifyToken.length === 0) {
      this.setState({
        loggedIn: false,
      });
    } else {
      if (verifyToken.expired === 1) {
        this.setState({
          loggedIn: false,
        });
      }
    }
  };

  getStudent = async () => {
    try {
      let returnedStudent = await student.getStudent(
        this.state.studentId,
        this.state.token
      );
      console.log(returnedStudent);
      this.setState({
        name: returnedStudent[0].name,
        rollNo: returnedStudent[0].rollNo,
      });
    } catch (error) {}
  };

  componentDidMount() {
    if (
      this.state.studentId === null ||
      this.state.studentId === undefined ||
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
      this.getStudent();
    }
  }

  isLoggedIn = () => {
    if (this.state.loggedIn) {
      return (
        <div>
          <div className="main-content">
            <div className="page-header">
              <div className="header-sub-title">
                <nav className="breadcrumb breadcrumb-dash">
                  <a href="#" className="breadcrumb-item">
                    <i className="anticon anticon-home m-r-5" />
                    Home
                  </a>
                  <span className="breadcrumb-item active">Dashboard</span>
                </nav>
              </div>
            </div>
            <div className="page-header no-gutters">
              <div className="d-md-flex align-items-md-center justify-content-between">
                <div className="media m-v-10 align-items-center">
                  <div className="avatar avatar-image avatar-lg">
                    <img src="../assets/images/avatars/thumb.jpg" alt="" />
                  </div>
                  <div className="media-body m-l-15">
                    <h4 className="m-b-0">Welcome back, {this.state.name}!</h4>
                    <span className="text-gray">{this.state.rollNo}</span>
                  </div>
                </div>
                <div className="d-md-flex align-items-center d-none">
                  <div className="media align-items-center m-r-40 m-v-5">
                    <div className="font-size-27">
                      <i className="text-success  anticon anticon-appstore" />
                    </div>
                    <div className="d-flex align-items-center m-l-10">
                      <h2 className="m-b-0 m-r-5">2</h2>
                      <span className="text-gray">Assignments Pending</span>
                    </div>
                  </div>
                  <div className="media align-items-center m-v-5">
                    <div className="font-size-27">
                      <i className="text-danger anticon anticon-team" />
                    </div>
                    <div className="d-flex align-items-center m-l-10">
                      <h2 className="m-b-0 m-r-5">12</h2>
                      <span className="text-gray">Assignments Returned</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Assignments</h5>
                      <div>
                        <a href className="btn btn-default btn-sm">
                          View All
                        </a>
                      </div>
                    </div>
                    <div className="table-responsive m-t-30">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Lecturer</th>
                            <th>Subject</th>
                            <th>Tasks</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th>Progress</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className="avatar avatar-image"
                                  style={{ minWidth: "40px" }}
                                >
                                  <img
                                    src="../assets/images/avatars/thumb.jpg"
                                    alt=""
                                  />
                                </div>
                                <span className="m-l-10">Teacher's Name</span>
                              </div>
                            </td>
                            <td>
                              <div className="media align-items-center">
                                <div>
                                  <span>OOP</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span>31</span>
                            </td>
                            <td>
                              <span className="badge badge-pill badge-green font-size-12">
                                Returned
                              </span>
                            </td>
                            <td>16 Dec, 2020</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="progress progress-sm w-100 m-b-0">
                                  <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{ width: "100%" }}
                                  />
                                </div>
                                <div className="m-l-10">
                                  <i className="anticon anticon-check-o text-success" />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className="avatar avatar-image"
                                  style={{ minWidth: "40px" }}
                                >
                                  <img
                                    src="../assets/images/avatars/thumb.jpg"
                                    alt=""
                                  />
                                </div>
                                <span className="m-l-10">Teacher's Name</span>
                              </div>
                            </td>
                            <td>
                              <div className="media align-items-center">
                                <div>
                                  <span>Programming Fundamentals</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span>56</span>
                            </td>
                            <td>
                              <span className="badge badge-pill badge-blue font-size-12">
                                Pending
                              </span>
                            </td>
                            <td>16 Dec, 2020</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="progress progress-sm w-100 m-b-0">
                                  <div
                                    className="progress-bar bg-primary"
                                    role="progressbar"
                                    style={{ width: "76%" }}
                                  />
                                </div>
                                <div className="m-l-10">76%</div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className="avatar avatar-image"
                                  style={{ minWidth: "40px" }}
                                >
                                  <img
                                    src="../assets/images/avatars/thumb.jpg"
                                    alt=""
                                  />
                                </div>
                                <span className="m-l-10">Teacher's Name</span>
                              </div>
                            </td>
                            <td>
                              <div className="media align-items-center">
                                <div>
                                  <span>Software Testing</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span>21</span>
                            </td>
                            <td>
                              <span className="badge badge-pill badge-blue font-size-12">
                                Pending
                              </span>
                            </td>
                            <td>16 Dec, 2020</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="progress progress-sm w-100 m-b-0">
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: "87%" }}
                                  />
                                </div>
                                <div className="m-l-10">87%</div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className="avatar avatar-image"
                                  style={{ minWidth: "40px" }}
                                >
                                  <img
                                    src="../assets/images/avatars/thumb.jpg"
                                    alt=""
                                  />
                                </div>
                                <span className="m-l-10">Teacher's Name</span>
                              </div>
                            </td>
                            <td>
                              <div className="media align-items-center">
                                <div>
                                  <span>Visual Programming</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span>68</span>
                            </td>
                            <td>
                              <span className="badge badge-pill badge-blue font-size-12">
                                Pending
                              </span>
                            </td>
                            <td>16 Dec, 2020</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="progress progress-sm w-100 m-b-0">
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: "68%" }}
                                  />
                                </div>
                                <div className="m-l-10">68%</div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className="avatar avatar-image"
                                  style={{ minWidth: "40px" }}
                                >
                                  <img
                                    src="../assets/images/avatars/thumb.jpg"
                                    alt=""
                                  />
                                </div>
                                <span className="m-l-10">Teacher's Name</span>
                              </div>
                            </td>
                            <td>
                              <div className="media align-items-center">
                                <div>
                                  <span>Web Technologies</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span>165</span>
                            </td>
                            <td>
                              <span className="badge badge-pill badge-green font-size-12">
                                Returned
                              </span>
                            </td>
                            <td>16 Dec, 2020</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="progress progress-sm w-100 m-b-0">
                                  <div
                                    className="progress-bar bg-danger"
                                    role="progressbar"
                                    style={{ width: "28%" }}
                                  />
                                </div>
                                <div className="m-l-10">
                                  <i className="anticon anticon-close-o text-danger" />
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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

          {this.props.children}
        </div>
      );
    } else {
      window.location.href = "/error";
    }
  };

  render() {
    return <div className="page-container">{this.isLoggedIn()}</div>;
  }
}

export default StudentDashboard;
