import React, { Component } from "react";
import { Link } from "@reach/router";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const lecturer = require("../../axios/lecturer");

class ViewAssignedAssignment extends Component {
  state = {
    lecturerId: ls.get("teacherId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    title: "",
    description: "",
    links: [],
    attachment: "",
    resourceMaterial: "",
    totalMarks: 0,
    solution: "",
    dueDate: "",
    submissions: 0,
    submittedAssignments: [],
    nonSubmissions: 0,
    notSubmitted: [],
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

  downloadFile = async () => {
    // try {
    //     let downloading = lecturer.downloadFile(this.state.resourceMaterial, this.state.token)
    // } catch (error) {
    //     console.log(error)
    // }
  };

  getAssignment = async () => {
    try {
      let assignmentId = this.props.location.state.assignmentId;
      let returnedAssignment = await lecturer.getAssignment(
        assignmentId,
        this.state.token
      );

      let removedNewLines = returnedAssignment[0].resourceLinks.replace(
        /[\r\n]+/g,
        " "
      );
      let links = removedNewLines.split(" ");
      console.log(returnedAssignment);
      this.setState({
        title: returnedAssignment[0].title,
        describe: returnedAssignment[0].details,
        links: links,
        resourceMaterial: returnedAssignment[0].resourceMaterial,
        totalMarks: returnedAssignment[0].totalMarks,
        solution: returnedAssignment[0].solution,
      });
    } catch (error) {}
  };

  getSubmittedAssignments = async () => {
    try {
      let returnedSubmittedAssignments = await lecturer.getSubmittedAssignments(
        this.state.lecturerId,
        this.props.location.state.assignedId,
        this.state.token
      );
      let submissions = returnedSubmittedAssignments.length;
      console.log(returnedSubmittedAssignments);
      this.setState({
        submissions: submissions,
        submittedAssignments: returnedSubmittedAssignments,
      });
    } catch (error) {
      console.log(error);
    }
  };

  getPendingStudents = async () => {
    try {
      let returnedPendingStudents = await lecturer.getPendingStudents(
        this.props.location.state.assignedId,
        this.state.lecturerId,
        this.state.token
      );
      console.log(returnedPendingStudents);
      this.setState({
        nonSubmissions: returnedPendingStudents.length,
        notSubmitted: returnedPendingStudents,
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteSubmission = async (submissionId) => {
    try {
      let deleteSubmission = await lecturer.deleteStudentSubmission(
        submissionId,
        this.state.token
      );
      this.getSubmittedAssignments();
      this.getPendingStudents();
    } catch (error) {}
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

  getAssignedAssignment = async () => {
    try {
      let returnedAssignment = await lecturer.getAssignedAssignment(
        this.props.location.state.assignedId,
        this.state.token
      );
      console.log(returnedAssignment);
      let dueDate = this.formatDate(returnedAssignment[0].due);
      this.setState({
        dueDate: dueDate,
      });
    } catch (error) {
      console.log(error);
    }
  };
  checkIfLateSubmission = (date) => {
    let submissionDate = this.seperateDateValues(date);
    let dueDate = this.seperateDateValues(this.state.dueDate);
    console.log(date);
    console.log(this.state.dueDate);
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
    // if (dueDate[1] >= submissionDate[1]) {
    //   if (dueDate[2] >= submissionDate[2]) {
    //     if (dueDate[3] >= submissionDate[3]) {
    //       if (dueDate[4] >= submissionDate[4]) {

    //       }else{
    //         return 1
    //       }
    //     }else{
    //       return 1
    //     }
    //   }else{
    //     return 1
    //   }
    // }else{
    //   return 1
    // }
  };

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
      this.getAssignment();
      this.getAssignedAssignment();
      this.getSubmittedAssignments();
      this.getPendingStudents();
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
                    View Assignment
                  </span>
                </nav>
              </div>
            </div>
            <div className="container-fluid">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="media align-items-center">
                              <div className="m-l-10">
                                <h4 className="m-b-0">{this.state.title}</h4>
                              </div>
                            </div>
                            <div>
                              {/* <span className="badge badge-pill badge-green">Assigned</span> */}
                              <p>Total Marks: {this.state.totalMarks}</p>
                            </div>
                          </div>
                          <div className="m-t-40">
                            <h6>Description:</h6>
                            <p>{this.state.describe}</p>
                          </div>
                          {/* <div className="d-md-flex m-t-30 align-items-center justify-content-between" >
                    <div className="m-t-10 m-l-auto" style={{display:'none'}}>
                      <span className="font-weight-semibold m-r-10 m-b-5 text-dark">Due Date: </span>
                      <span>16 Dec 2020</span>
                    </div>
                  </div> */}
                        </div>
                        <div className="m-t-30">
                          <ul className="nav nav-tabs">
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                data-toggle="tab"
                                href="#submitted"
                              >
                                Submitted: {this.state.submissions}
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                id="lab-acitivity-1-tab"
                                data-toggle="tab"
                                href="#non-submitted"
                                role="tab"
                                aria-controls="non-submitted"
                                aria-selected="false"
                              >
                                Non Submitted: {this.state.nonSubmissions}
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link "
                                id="home-acitivity-1-tab"
                                data-toggle="tab"
                                href="#links"
                                role="tab"
                                aria-controls="home-activity-1"
                                aria-selected="false"
                              >
                                Links
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href="#project-details-attachment"
                              >
                                Attachment
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href="#solutionTab"
                              >
                                Solution
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content m-t-15 p-25">
                            <div
                              className="tab-pane fade show active"
                              id="submitted"
                            >
                              <table id="data-table" className="table">
                                <thead>
                                  <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Registration Number</th>
                                    <th>Section</th>
                                    <th>Subject</th>
                                    <th>Submitted At</th>
                                    <th>On Time / Late</th>
                                    <th>Marks Obtained</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.submittedAssignments.map(
                                    (data, index) => {
                                      let late = this.checkIfLateSubmission(
                                        this.formatDate(data.submittedAt)
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
                                          <td>{data.studentId}</td>
                                          <td>{data.name}</td>
                                          <td>{data.rollNo}</td>
                                          <td>{data.section}</td>
                                          <td>{data.subject}</td>
                                          <td>
                                            {this.formatDate(data.submittedAt)}
                                          </td>
                                          <td>{late}</td>
                                          <td>{marks}</td>
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
                                                <Link
                                                  className="dropdown-item"
                                                  to="/teacher/studentSubmission"
                                                  state={{
                                                    assignedId:
                                                      this.props.location.state
                                                        .assignedId,
                                                    assignmentId:
                                                      this.props.location.state
                                                        .assignmentId,
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
                                <tfoot>
                                  <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Registration Number</th>
                                    <th>Section</th>
                                    <th>Subject</th>
                                    <th>Submitted At</th>
                                    <th>On Time / Late</th>
                                    <th>Marks Obtained</th>
                                    <th>Action</th>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                            <div className="tab-pane fade" id="non-submitted">
                              <table id="data-table" className="table">
                                <thead>
                                  <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Registration Number</th>
                                    <th>Section</th>
                                    <th>Subject</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.notSubmitted.map(
                                    (data, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{data.studentId}</td>
                                          <td>{data.name}</td>
                                          <td>{data.rollNo}</td>
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
                                                {/* <button
                                                  onClick={() => {
                                                    this.markAsUnsubmitted(
                                                      data.studentId
                                                    );
                                                  }}
                                                  className="dropdown-item"
                                                  type="button"
                                                >
                                                  <i className="anticon anticon-delete" />
                                                  <span className="m-l-10">
                                                    Mark As not Submitted
                                                  </span>
                                                </button> */}
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Registration Number</th>
                                    <th>Section</th>
                                    <th>Subject</th>
                                    <th>Action</th>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="project-details-attachment"
                            >
                              <div
                                className="file"
                                style={{ minWidth: "200px" }}
                              >
                                <div className="media align-items-center">
                                  <div className="avatar avatar-icon avatar-cyan rounded m-r-15">
                                    <i className="anticon anticon-file-exclamation font-size-20" />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">
                                      {this.state.resourceMaterial}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade show"
                              id="solutionTab"
                              role="tabpanel"
                              aria-labelledby="links"
                            >
                              <h3>Solution:</h3>
                              <pre>{this.state.solution}</pre>
                            </div>
                            <div
                              className="tab-pane fade show "
                              id="links"
                              role="tabpanel"
                              aria-labelledby="links"
                            >
                              <h3>Links for help:</h3>
                              <ul>
                                {this.state.links.map((data, index) => {
                                  return (
                                    <li key={index}>
                                      <a href={data}>{data}</a>{" "}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.props.children}
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

export default ViewAssignedAssignment;
