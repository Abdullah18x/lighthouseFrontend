import React, { Component } from "react";
import { Link } from "@reach/router";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const lecturer = require("../../axios/lecturer");

class StudentSubmission extends Component {
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
    studentSolution: "",
    marksObtained: 0,
    name: "",
    rollNo: "",
    timeTaken: 0,
    noOfErrors: 0,
    errors: [],
    submissionId: 0,
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

  markAssignment = async () => {
    try {
      let mark = await lecturer.gradeAssignment(
        this.state.submissionId,
        this.state.marksObtained,
        this.state.token
      );
      this.getAssignment();
    } catch (error) {
      console.location(error);
    }
  };

  setMarksObtained = (event) => {
    let num = event.target.value;
    if (Number.isInteger(parseInt(num))) {
      if (parseInt(num) > -1 && parseInt(num) <= this.state.totalMarks) {
        this.setState({
          marksObtained: num,
        });
      }
    }
  };

  getStudentSubmission = async () => {
    try {
      let getStudentSolution = await lecturer.getStudentSubmission(
        this.props.location.state.studentId,
        this.props.location.state.assignedId,
        this.state.token
      );
      console.log(getStudentSolution);
      this.setState({
        studentSolution: getStudentSolution[0].solution,
        marksObtained: getStudentSolution[0].marksObtained,
        name: getStudentSolution[0].name,
        rollNo: getStudentSolution[0].rollNo,
        submissionId: getStudentSolution[0].submissionId,
        timeTaken: getStudentSolution[0].timeTaken,
        noOfErrors: getStudentSolution[0].errorsNo,
        errors: getStudentSolution[0].errorsList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // formatErrors = () =>{
  //   let errorsList = this.state.errors
  //   errorsList = errorsList.toString().replace('[','').slice(0,-1)

  //   return (<p>{errorsList}</p> )
  // }

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
      this.getStudentSubmission();
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
                                <h4 className="m-b-0">
                                  {this.state.name}: {this.state.rollNo}
                                </h4>
                                <h4 className="m-b-0">{this.state.title}</h4>
                              </div>
                            </div>
                            <div>
                              <p>Obtained Marks: </p>
                              <input
                                type="number"
                                className="form-control"
                                id="totalMarks"
                                placeholder="Marks"
                                onChange={(e) => {
                                  this.setMarksObtained(e);
                                }}
                                value={this.state.marksObtained}
                              />
                              <p>Total Marks: {this.state.totalMarks}</p>
                              <button
                                id="saveAssignment"
                                type="button"
                                className="btn btn-primary"
                                onClick={this.markAssignment}
                              >
                                Mark
                              </button>
                            </div>
                          </div>
                          <div className="m-t-40">
                            <h6>Description:</h6>
                            <p>{this.state.describe}</p>
                          </div>
                        </div>
                        <div className="m-t-30">
                          <ul className="nav nav-tabs">
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                data-toggle="tab"
                                href="#studentSolutionTab"
                              >
                                Student Solution
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
                            {/* <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#errorTab">Errors ({this.state.noOfErrors-1})</a>
                    </li> */}
                          </ul>
                          <div className="tab-content m-t-15 p-25">
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
                              className="tab-pane fade show active"
                              id="studentSolutionTab"
                              role="tabpanel"
                              aria-labelledby="links"
                            >
                              <h3>Student Solution:</h3>
                              <p>Time Taken: {this.state.timeTaken} minutes</p>
                              <p>
                                Errors Occurred: {this.state.noOfErrors - 1}
                              </p>
                              <pre>{this.state.studentSolution}</pre>
                            </div>

                            {/* <div className="tab-pane fade show" id="errorTab" role="tabpanel" aria-labelledby="links">
                      <h3>Errors:</h3>
                      <pre>{this.formatErrors()}</pre>
                      
                      
                    </div> */}
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

export default StudentSubmission;
