import React, { Component } from "react";
import { Link } from "@reach/router";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const lecturer = require("../../axios/lecturer");

class TeacherDashboard extends Component {
  state = {
    lecturerId: ls.get("teacherId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    userName: "",
    email: "",
    name: "",
    status: "",
    recentSubmission: [],
    atRiskStudents: [],
    totalAtRiskStudents: 0,
    students: [],
    assignments: [],
    totalStudents: 0,
    option: 1,
    loggedIn: true,
  };

  setLecturer = async () => {
    let lecturerData = await lecturer.getUser(
      this.state.lecturerId,
      this.state.token
    );
    this.setState({
      userName: lecturerData.userName,
      email: lecturerData.email,
      name: lecturerData.name,
      status: lecturerData.status,
    });
  };

  changeAssignments = async (e) => {
    if (e.target.value === "assignments") {
      this.setState({
        option: 1,
      });
      this.getRecentSubmissions()
    } else {
      this.setState({
        option: 0,
      });
      this.getRecentSubmissionsD();
    }
  };

  getAtRiskStudents = async () => {
    let returenedAtRiskStudents = await lecturer.getLecturerAtRiskStudents(
      this.state.lecturerId,
      this.state.token
    );
    let totalAtRiskStudents = returenedAtRiskStudents.length;
    this.setState({
      atRiskStudents: returenedAtRiskStudents,
      totalAtRiskStudents: totalAtRiskStudents,
    });
  };

  getStudents = async () => {
    let returenedStudents = await lecturer.getStudents(
      this.state.lecturerId,
      this.state.token
    );
    let totalStudents = returenedStudents.length;
    this.setState({
      students: returenedStudents,
      totalStudents: totalStudents,
    });
  };

  getRecentSubmissions = async () => {
    let returnedSubmissions = await lecturer.getRecentSubmissions(
      this.state.lecturerId,
      this.state.token
    );
    console.log(returnedSubmissions);
    this.setState({
      recentSubmission: returnedSubmissions,
    });
  };

  getRecentSubmissionsD = async () => {
    let returnedSubmissions = await lecturer.getRecentSubmissionsD(
      this.state.lecturerId,
      this.state.token
    );
    console.log(returnedSubmissions);
    this.setState({
      recentSubmission: returnedSubmissions,
    });
  };

  setAssignments = async () => {
    try {
      let returnedAssignments = await lecturer.getAssignedAssignments(
        this.state.lecturerId,
        this.state.token
      );
      console.log(returnedAssignments);
      this.setState({
        assignments: returnedAssignments,
      });
    } catch (error) {
      console.log(error);
    }
  };

  formatDate = (date) => {
    let format = date.replace("T", " ").replace(".000Z", "");
    return format;
  };

  verification = async () => {
    let verifyToken = await auth.verifyToken(
      this.state.lecturerId,
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

  renderRecenetAssignments() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Registration #</th>
            <th>Name</th>
            <th>Section</th>
            <th>Subject</th>
            <th>Return Date</th>
            <th>Assignment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.state.recentSubmission.map((data, index) => {
            // let late = this.checkIfLateSubmission(this.formatDate(data.submittedAt))
            let marks = "Unchecked";

            if (data.checked === 1) {
              marks = data.marksObtained;
            }
            return (
              <tr key={index}>
                <td>{data.rollNo}</td>
                <td>{data.name}</td>
                <td>{data.section}</td>
                <td>{data.subject}</td>
                <td>{this.formatDate(data.submittedAt)}</td>
                <td>{data.title}</td>
                <td>{marks}</td>
                {/* <div className="d-flex align-items-center">
                                <span className="badge badge-success badge-dot m-r-10" />
                                <span>Approved</span>
                              </div> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  renderRecentDataSets() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Registration #</th>
            <th>Name</th>
            <th>Section</th>
            <th>Subject</th>
            <th>Return Date</th>
            <th>Assignment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.state.recentSubmission.map((data, index) => {
            // let late = this.checkIfLateSubmission(this.formatDate(data.submittedAt))
            let marks = "Unchecked";

            if (data.checked === 1) {
              marks = data.marksObtained;
            }
            return (
              <tr key={index}>
                <td>{data.rollNo}</td>
                <td>{data.name}</td>
                <td>{data.section}</td>
                <td>{data.subject}</td>
                <td>{this.formatDate(data.submittedAt)}</td>
                <td>{data.title}</td>
                <td>{marks}</td>
                {/* <div className="d-flex align-items-center">
                                <span className="badge badge-success badge-dot m-r-10" />
                                <span>Approved</span>
                              </div> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  componentDidMount() {
    if (
      this.state.lecturerId === null ||
      this.state.lecturerId === undefined ||
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
      this.setLecturer();
      this.getAtRiskStudents();
      this.getStudents();
      this.getRecentSubmissions();
      this.setAssignments();
    }
  }

  isLoggedIn = () => {
    if (this.state.loggedIn) {
      return (
        <div>
          <div className="main-content">
            <div className="page-header no-gutters">
              <div className="d-md-flex align-items-md-center justify-content-between">
                <div className="media m-v-10 align-items-center">
                  <div className="avatar avatar-image avatar-lg">
                    <img src="../assets/images/avatars/thumb.jpg" alt="" />
                  </div>
                  <div className="media-body m-l-15">
                    <h4 className="m-b-0">
                      Welcome back, {this.state.userName}
                    </h4>
                  </div>
                </div>
                <div className="d-md-flex align-items-center d-none">
                  <div className="media align-items-center m-r-40 m-v-5">
                    <div className="font-size-27">
                      <i className="text-primary anticon anticon-profile" />
                    </div>
                    <div className="d-flex align-items-center m-l-10">
                      <h2 className="m-b-0 m-r-5">
                        {this.state.assignments.length}
                      </h2>
                      <span className="text-gray">Assignments Assigned</span>
                    </div>
                  </div>
                  <div className="media align-items-center m-r-40 m-v-5">
                    <div className="font-size-27">
                      <i className="text-danger anticon anticon-team" />
                    </div>
                    <div className="d-flex align-items-center m-l-10">
                      <h2 className="m-b-0 m-r-5">
                        {this.state.totalAtRiskStudents}
                      </h2>
                      <span className="text-gray">At Risk Students</span>
                    </div>
                  </div>
                  <div className="media align-items-center m-v-5">
                    <div className="font-size-27">
                      <i className="text-success anticon anticon-team" />
                    </div>
                    <div className="d-flex align-items-center m-l-10">
                      <h2 className="m-b-0 m-r-5">
                        {this.state.totalStudents}
                      </h2>
                      <span className="text-gray">Total Students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <h4>Recent Submissions</h4>
                      </div>
                      <div className="col-md-4">
                        <select
                          id="inputState"
                          className="form-control"
                          onChange={(e) => {
                            this.changeAssignments(e);
                          }}
                        >
                          <option value="assignments" selected>
                            Assignments
                          </option>
                          <option value="dataSets">Data Sets</option>
                        </select>
                      </div>
                    </div>
                    <div className="table-responsive">
                      {this.state.option
                        ? this.renderRecenetAssignments()
                        : this.renderRecentDataSets()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>At Risk Students</h5>
                      <div>
                        {/* <a href="javascript:void(0);" className="btn btn-sm btn-default">View All</a> */}

                        <Link
                          className="btn btn-sm btn-default"
                          to="/teacher/studentCallibration"
                        >
                          View All
                        </Link>
                      </div>
                    </div>
                    <div className="m-t-30">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Roll No</th>
                              <th>Email</th>
                              <th>Section</th>
                              <th>Subject</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.atRiskStudents
                              .slice(0, 5)
                              .map((data, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{data.studentId}</td>
                                    <td>{data.name}</td>
                                    <td>{data.rollNo}</td>
                                    <td>{data.email}</td>
                                    <td>{data.section}</td>
                                    <td>{data.subject}</td>
                                    <td>
                                      <div className="dropdown dropdown-animated scale-left">
                                        <a
                                          className="text-gray font-size-18"
                                          href="javascript:void(0);"
                                          data-toggle="dropdown"
                                        >
                                          <i className="anticon anticon-ellipsis" />
                                        </a>
                                        <div className="dropdown-menu">
                                          <Link
                                            className="dropdown-item"
                                            to="/teacher/studentProfile"
                                            state={{
                                              studentId: data.studentId,
                                            }}
                                          >
                                            <i className="anticon anticon-eye" />
                                            <span className="m-l-10">
                                              View Profile
                                            </span>
                                          </Link>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>Assigned Assignments</h5>
                      <div>
                        {/* <a href="javascript:void(0);" className="btn btn-sm btn-default">View All</a> */}

                        <Link
                          className="btn btn-sm btn-default"
                          to="/teacher/assignedAssignments"
                        >
                          View All
                        </Link>
                      </div>
                    </div>
                    <div className="m-t-30">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Section</th>
                            <th>Subject</th>
                            <th>Assigned</th>
                            <th>Due</th>
                            <th>Total Marks</th>
                            <th>Action</th>
                          </thead>
                          <tbody>
                            {this.state.assignments
                              .slice(0, 5)
                              .map((data, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{data.assignmentId}</td>
                                    <td>{data.title}</td>
                                    <td>{data.section}</td>
                                    <td>{data.subject}</td>
                                    <td>{this.formatDate(data.assigned)}</td>
                                    <td>{this.formatDate(data.due)}</td>
                                    <td>{data.totalMarks}</td>
                                    <td>
                                      <div className="dropdown dropdown-animated scale-left">
                                        <a
                                          className="text-gray font-size-18"
                                          href="javascript:void(0);"
                                          data-toggle="dropdown"
                                        >
                                          <i className="anticon anticon-ellipsis" />
                                        </a>
                                        <div className="dropdown-menu">
                                          <Link
                                            className="dropdown-item"
                                            to="/teacher/viewAssignedAssignment"
                                            state={{
                                              assignedId: data.assignedId,
                                              assignmentId: data.assignmentId,
                                            }}
                                          >
                                            <i className="anticon anticon-eye" />
                                            <span className="m-l-10">
                                              View Assignment
                                            </span>
                                          </Link>
                                          {/* <button onClick={() => {this.editDueDate(data.assignmentId)}} className="dropdown-item" type="button">
                                  <i className="anticon anticon-delete" />
                                  <span className="m-l-10">Edit Due Date</span>
                                </button>
                                <button onClick={() => {this.deleteAssigned(data.assignmentId,data.assignedId)}} className="dropdown-item" type="button">
                                  <i className="anticon anticon-delete" />
                                  <span className="m-l-10">Un-Assign</span>
                                </button> */}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
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

export default TeacherDashboard;
