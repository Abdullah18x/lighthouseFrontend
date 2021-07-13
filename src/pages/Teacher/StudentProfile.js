import React, { Component } from "react";
import { Link } from "@reach/router";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const lecturer = require("../../axios/lecturer");

class StudentProfile extends Component {
  state = {
    lecturerId: ls.get("teacherId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    name: "",
    email: "",
    rollNo: "",
    section: "",
    subjects: [],
    atRiskStatus: [],
    recentSubmission: [],
    option:1,
    loggedIn: true,
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

  getStudent = async () => {
    let returnedStudent = await lecturer.getStudent(
      this.state.lecturerId,
      this.props.location.state.studentId,
      this.state.token
    );
    console.log(returnedStudent);
    let subjects = [];
    let atRisk = [];
    for (let i = 0; i < returnedStudent.length; i++) {
      if (returnedStudent[i].atRisk === 1) {
        subjects.push({
          subject: returnedStudent[i].subject,
          status: "At Risk",
        });
      } else {
        subjects.push({
          subject: returnedStudent[i].subject,
          status: "Not At Risk",
        });
      }
    }
    // if (returnedStudent[0].atRisk != null || returnedStudent[0].atRisk != undefined) {
    //     if (returnedStudent[0].atRisk === 1) {
    //         atRisk = 'At Risk'
    //     }
    // }
    console.log(subjects);
    this.setState({
      name: returnedStudent[0].name,
      email: returnedStudent[0].email,
      rollNo: returnedStudent[0].rollNo,
      section: returnedStudent[0].section,
      subjects: subjects,
      atRiskStatus: atRisk,
    });
  };

  getRecentSTDSubmissions = async () => {
    let returnedSubmissions = await lecturer.getRecentSTDSubmissions(
      this.state.lecturerId,
      this.props.location.state.studentId,
      this.state.token
    );
    console.log(returnedSubmissions);
    this.setState({
      recentSubmission: returnedSubmissions,
    });
  };

  getRecentSTDSubmissions2 = async () => {
    let returnedSubmissions = await lecturer.getRecentSTDSubmissions2(
      this.state.lecturerId,
      this.props.location.state.studentId,
      this.state.token
    );
    console.log(returnedSubmissions);
    this.setState({
      recentSubmission: returnedSubmissions,
    });
  };

  formatDate = (date) => {
    let format = date.replace("T", " ").replace(".000Z", "");
    return format;
  };
  seperateDateValues = (date) => {
    date = date.replace(/-/g, " ").replace(/:/g, " ");
    let a = date.split(" ");
    return a;
  };

  checkIfLateSubmission = (date, date2) => {
    let submissionDate = this.seperateDateValues(date);
    let dueDate = this.seperateDateValues(date2);
    console.log(date);
    console.log(date2);
    let b = 1;
    for (let i = 1; i < 5; i++) {
      if (dueDate[i] > submissionDate[i]) {
        b = 0;
        break;
      } else if (dueDate[i] === submissionDate[i]) {
        b = 0;
      } else {
        b = 1;
        break;
      }
    }

    return b;
  };
  deleteSubmission = async (submissionId) => {
    try {
      let deleteSubmission = await lecturer.deleteStudentSubmission(
        submissionId,
        this.state.token
      );
      this.getSubmittedAssignments();
    } catch (error) {}
  };

  changeAssignments = async (e) => {
    if (e.target.value === "assignments") {
      this.setState({
        option: 1,
      });
      this.getRecentSTDSubmissions();
    } else {
      this.setState({
        option: 0,
      });
      this.getRecentSTDSubmissions2();
    }
  };

  renderAssignments() {
    return (
      <div className="m-t-30">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Subject</th>
                <th>Submitted At</th>
                <th>On Time / Late</th>
                <th>Marks Obtained</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.recentSubmission.map((data, index) => {
                let late = this.checkIfLateSubmission(
                  this.formatDate(data.submittedAt),
                  this.formatDate(data.due)
                );
                let marks = "Unchecked";
                if (late === 1) {
                  late = "Late Submission";
                } else {
                  late = "On Time";
                }
                if (data.checked === 1) {
                  marks = data.marksObtained;
                }
                return (
                  <tr key={index}>
                    <td>{data.assignmentId}</td>
                    <td>{data.title}</td>
                    <td>{data.subject}</td>
                    <td>{this.formatDate(data.submittedAt)}</td>
                    <td>{late}</td>
                    <td>{marks}</td>
                    {/* <div className="d-flex align-items-center">
                                                <span className="badge badge-success badge-dot m-r-10" />
                                                <span>Approved</span>
                                            </div> */}
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
                            to="/teacher/studentSubmission"
                            state={{
                              assignedId: data.assignedId,
                              assignmentId: data.assignmentId,
                              studentId: data.studentId,
                            }}
                          >
                            <i className="anticon anticon-eye" />
                            <span className="m-l-10">View Submission</span>
                          </Link>
                          {/* <button
                            onClick={() => {
                              this.deleteSubmission(data.submissionId);
                            }}
                            className="dropdown-item"
                            type="button"
                          >
                            <i className="anticon anticon-delete" />
                            <span className="m-l-10">Delete Submission</span>
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
    );
  }

  renderDataSets() {
    return (
      <div className="m-t-30">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Subject</th>
                <th>Submitted At</th>
                <th>On Time / Late</th>
                <th>Marks Obtained</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.recentSubmission.map((data, index) => {
                let late = this.checkIfLateSubmission(
                  this.formatDate(data.submittedAt),
                  this.formatDate(data.due)
                );
                let marks = "Unchecked";
                if (late === 1) {
                  late = "Late Submission";
                } else {
                  late = "On Time";
                }
                if (data.checked === 1) {
                  marks = data.marksObtained;
                }
                return (
                  <tr key={index}>
                    <td>{data.datasetId}</td>
                    <td>{data.title}</td>
                    <td>{data.subject}</td>
                    <td>{this.formatDate(data.submittedAt)}</td>
                    <td>{late}</td>
                    <td>{marks}</td>
                    {/* <div className="d-flex align-items-center">
                                                <span className="badge badge-success badge-dot m-r-10" />
                                                <span>Approved</span>
                                            </div> */}
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
                            to="/teacher/studentSubmission2"
                            state={{
                              assignedSId: data.assignedSId,
                              datasetId: data.datasetId,
                              studentId: data.studentId,
                            }}
                          >
                            <i className="anticon anticon-eye" />
                            <span className="m-l-10">View Submission</span>
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
      this.getStudent();
      this.getRecentSTDSubmissions();
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
                  <a className="breadcrumb-item" href="#">
                    Sections
                  </a>
                  <span className="breadcrumb-item active">
                    View All Sections
                  </span>
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
                          <p className="text-opacity font-size-13">
                            {this.state.rollNo}
                          </p>
                          {/* <button className="btn btn-primary btn-tone">Edit Profile</button> */}
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
                            {/* <li className="row">
                              <p className="col-sm-4 col-4 font-weight-semibold text-dark m-b-5">
                                  <i className="m-r-10 text-primary anticon anticon-phone" />
                                  <span>Phone: </span> 
                              </p>
                              <p className="col font-weight-semibold">+92 335 498 3303</p>
                              </li> */}
                            <li className="row">
                              <p className="col-sm-4 col-5 font-weight-semibold text-dark m-b-5">
                                <i className="m-r-10 text-primary anticon anticon-compass" />
                                <span>Section: </span>
                              </p>
                              <p className="col font-weight-semibold">
                                {this.state.section}
                              </p>
                            </li>
                            {/* <li className="row">
                              <p className="col-sm-4 col-5 font-weight-semibold text-dark m-b-5">
                                  <i className="m-r-10 text-primary anticon anticon-compass" />
                                  <span>Status: </span> 
                              </p>
                              <p className="col font-weight-semibold">{this.state.atRiskStatus}</p>
                              </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  {this.state.subjects.map((data) => {
                    return (
                      <div className="row">
                        <h3 style={{ marginRight: "20px" }}>
                          {data.subject}: {data.status}
                        </h3>
                        <button className="btn btn-primary btn-tone">
                          Remove Student
                        </button>
                      </div>
                    );
                  })}
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
                      {this.state.option
                        ? this.renderAssignments()
                        : this.renderDataSets()}
                      {/* <div className="m-t-30">
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Registration Number</th>
                                <th>Subject</th>
                                <th>Submitted At</th>
                                <th>On Time / Late</th>
                                <th>Marks Obtained</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.recentSubmission.map(
                                (data, index) => {
                                  let late = this.checkIfLateSubmission(
                                    this.formatDate(data.submittedAt),
                                    this.formatDate(data.due)
                                  );
                                  let marks = "Unchecked";
                                  if (late === 1) {
                                    late = "Late Submission";
                                  } else {
                                    late = "On Time";
                                  }
                                  if (data.checked === 1) {
                                    marks = data.marksObtained;
                                  }
                                  return (
                                    <tr key={index}>
                                      <td>{data.assignmentId}</td>
                                      <td>{data.title}</td>
                                      <td>{data.rollNo}</td>
                                      <td>{data.subject}</td>
                                      <td>
                                        {this.formatDate(data.submittedAt)}
                                      </td>
                                      <td>{late}</td>
                                      <td>{marks}</td>
                                      <div className="d-flex align-items-center">
                                          <span className="badge badge-success badge-dot m-r-10" />
                                          <span>Approved</span>
                                      </div>
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
                                              to="/teacher/studentSubmission"
                                              state={{
                                                assignedId: data.assignedId,
                                                assignmentId: data.assignmentId,
                                                studentId: data.studentId,
                                              }}
                                            >
                                              <i className="anticon anticon-eye" />
                                              <span className="m-l-10">
                                                View Submission
                                              </span>
                                            </Link>
                                            <button
                                              onClick={() => {
                                                this.deleteSubmission(
                                                  data.submissionId
                                                );
                                              }}
                                              className="dropdown-item"
                                              type="button"
                                            >
                                              <i className="anticon anticon-delete" />
                                              <span className="m-l-10">
                                                Delete Submission
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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

export default StudentProfile;
