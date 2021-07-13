import React, { Component } from "react";
import { Link } from "@reach/router";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const lecturer = require("../../axios/lecturer");

class TeacherAssignments extends Component {
  state = {
    lecturerId: ls.get("teacherId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    assignments: [],
    option: 1,
    toBeAssignedId: 0,
    toBeAssignedTitle: "",
    toBeSetSubejectId: 0,
    section: 0,
    subject: 0,
    subjectList: [],
    sectionList: [],
    dueDate: "",
    dueTime: "",
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
  setDueDate(e) {
    this.setState({
      dueDate: e.target.value,
    });
  }
  setDueTime(e) {
    this.setState({
      dueTime: e.target.value,
    });
  }

  getSections = async () => {
    try {
      let sectionList = await lecturer.getLecturerSectionList(
        this.state.lecturerId,
        this.state.token
      );
      this.setState({
        sectionList: sectionList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  setSection = async (e) => {
    if (parseInt(e.target.value)) {
      await this.getSubjects(e.target.value);
      document.getElementById("subjectList").removeAttribute("disabled");
      this.setState({
        section: e.target.value,
      });
    } else {
      document.getElementById("subjectList").setAttribute("disabled", "true");
      this.setState({
        section: "",
      });
    }
  };

  setSection2 = async (e) => {
    if (parseInt(e.target.value)) {
      await this.getSubjects(e.target.value);
      document.getElementById("subjectList2").removeAttribute("disabled");
      this.setState({
        section: e.target.value,
      });
    } else {
      document.getElementById("subjectList2").setAttribute("disabled", "true");
      this.setState({
        section: "",
      });
    }
  };
  getSubjects = async (sectionId) => {
    try {
      let subjectList = await lecturer.getSectionSubejct(
        this.state.lecturerId,
        sectionId,
        this.state.token
      );
      this.setState({
        subjectList: subjectList,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };
  setSubject(e) {
    e = parseInt(e.target.value);
    this.setState({
      subject: e,
    });
  }

  setAssignments = async () => {
    try {
      let returnedAssignments = await lecturer.getAssignments(
        this.state.lecturerId,
        this.state.token
      );
      this.setState({
        assignments: returnedAssignments,
      });
    } catch (error) {
      console.log(error);
    }
  };

  setDataSets = async () => {
    try {
      let returnedDataSets = await lecturer.getDataSets(this.state.token);
      this.setState({
        assignments: returnedDataSets,
      });
    } catch (error) {
      console.log(error);
    }
  };

  changeAssignments = async (e) => {
    if (e.target.value === "assignments") {
      this.setState({
        option: 1,
      });
      this.setAssignments();
    } else {
      this.setState({
        option: 0,
      });
      this.setDataSets();
    }
  };

  delete = async (assignmentId) => {
    try {
      let deleteAssignment = await lecturer.deleteAssignment(
        assignmentId,
        this.state.token
      );
      this.setAssignments();
    } catch (error) {
      console.log(error);
    }
  };

  setValuesA(id, title, subjectId) {
    if (subjectId) {
      this.setState({
        toBeAssignedId: id,
        toBeAssignedTitle: title,
        toBeSetSubejectId: subjectId,
      });
    } else {
      this.setState({
        toBeAssignedId: id,
        toBeAssignedTitle: title,
      });
    }
  }

  reset() {
    this.setState({
      toBeAssignedId: 0,
      toBeAssignedTitle: "",
      section: 0,
      subject: 0,
      dueDate: "",
      dueTime: "",
    });
  }

  assignAssignment = async () => {
    try {
      if (
        this.state.dueDate === "" ||
        this.state.dueTime === "" ||
        this.state.section === 0 ||
        this.state.subject === 0
      ) {
        alert("please fill out the entire form");
        return;
      }
      let dueDate = this.state.dueDate.concat(" ".concat(this.state.dueTime));
      let checkAssigned = await lecturer.checkAssigned(
        this.state.toBeAssignedId,
        this.state.section,
        this.state.section,
        this.state.token
      );
      if (checkAssigned.length > 0) {
        alert("This Assignments is already assigned to this section");
        return;
      }
      let assignAssignment = await lecturer.assignAssignment(
        this.state.toBeAssignedId,
        this.state.section,
        this.state.section,
        dueDate,
        this.state.token
      );
      let changStatus = await lecturer.changeAssignmentStatus(
        this.state.toBeAssignedId,
        1,
        this.state.token
      );
      alert("assigned");
    } catch (error) {
      console.log(error);
    }
  };

  assignDataSet = async () => {
    try {
      if (
        this.state.dueDate === "" ||
        this.state.dueTime === "" ||
        this.state.section === 0 ||
        this.state.subject === 0
      ) {
        alert("please fill out the entire form");
        return;
      }
      if (this.state.toBeSetSubejectId === this.state.subject) {
        let checkAssigned = await lecturer.checkAssigned2(
          this.state.toBeAssignedId,
          this.state.section,
          this.state.section,
          this.state.token
        );
        if (checkAssigned.length > 0) {
          alert("This DataSet is already assigned to this section");
          return;
        }
        let dueDate = this.state.dueDate.concat(" ".concat(this.state.dueTime));
        let assignAssignment = await lecturer.assignDataSet(
          this.state.lecturerId,
          this.state.toBeAssignedId,
          this.state.section,
          this.state.subject,
          dueDate,
          this.state.token
        );
        alert("assigned");
      } else {
        alert("This data set is not built for the selected subject");
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderAssignments() {
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Total Marks</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.assignments.map((data, index) => {
              let status = "Not Assigned";
              if (data) {
                if (data.status === 1) {
                  status = "Assigned";
                }
              }
              return (
                <tr key={index}>
                  <td>{data.assignmentId}</td>
                  <td>{data.title}</td>
                  <td>{data.totalMarks}</td>
                  <td>{status}</td>
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
                          to="/teacher/viewAssignment"
                          state={{
                            assignmentId: data.assignmentId,
                          }}
                        >
                          <i className="anticon anticon-eye" />
                          <span className="m-l-10">View Assignment</span>
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/teacher/updateAssignment"
                          state={{
                            assignmentId: data.assignmentId,
                          }}
                        >
                          <i className="anticon anticon-eye" />
                          <span className="m-l-10">Update</span>
                        </Link>
                        <button
                          type="button"
                          class="dropdown-item"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => {
                            this.setValuesA(data.assignmentId, data.title);
                          }}
                        >
                          <i className="anticon anticon-delete" />
                          <span className="m-l-10">Assign</span>
                        </button>
                        <button
                          onClick={() => {
                            this.delete(data.assignmentId);
                          }}
                          className="dropdown-item"
                          type="button"
                        >
                          <i className="anticon anticon-delete" />
                          <span className="m-l-10">Delete</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  renderDataSets() {
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Total Marks</th>
              <th>Subject</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.assignments.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.datasetId}</td>
                  <td>{data.title}</td>
                  <td>{data.totalMarks}</td>
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
                          to="/teacher/viewDataSet"
                          state={{
                            datasetId: data.datasetId,
                          }}
                        >
                          <i className="anticon anticon-eye" />
                          <span className="m-l-10">View DataSet</span>
                        </Link>
                        <button
                          type="button"
                          class="dropdown-item"
                          data-toggle="modal"
                          data-target="#exampleModal2"
                          onClick={() => {
                            this.setValuesA(
                              data.datasetId,
                              data.title,
                              data.subjectId
                            );
                          }}
                        >
                          <i className="anticon anticon-delete" />
                          <span className="m-l-10">Assign</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
      this.setAssignments();
      this.getSections();
    }
  }

  isLoggedIn = () => {
    if (this.state.loggedIn) {
      return (
        <div>
          <div className="main-content">
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Assign: {this.state.toBeAssignedTitle}
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
                    <div className="form-row" id="assignNowRow">
                      <div className="form-group col-md-4">
                        <label>Due Date</label>
                        <input
                          type="date"
                          id="dueDate"
                          name="dueDate"
                          onChange={(e) => {
                            this.setDueDate(e);
                          }}
                        />
                        <input
                          type="time"
                          id="dueTime"
                          name="dueTime"
                          onChange={(e) => {
                            this.setDueTime(e);
                          }}
                        />
                      </div>
                      <div class="form-group col-md-4">
                        <label>Section</label>
                        <select
                          id="sectionList"
                          class="form-control"
                          onChange={(e) => {
                            this.setSection(e);
                          }}
                        >
                          <option value={0} selected>
                            Select An Option
                          </option>
                          {this.state.sectionList.map((data, index) => {
                            return (
                              <option
                                key={data.sectionId}
                                value={data.sectionId}
                              >
                                {data.section}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div class="form-group col-md-4">
                        <label>Subject</label>
                        <select
                          id="subjectList"
                          class="form-control"
                          onChange={(e) => {
                            this.setSubject(e);
                          }}
                          disabled
                        >
                          <option value={0} selected>
                            Select An Option
                          </option>
                          {this.state.subjectList.map((data, index) => {
                            return (
                              <option
                                key={data.subjectId}
                                value={data.subjectId}
                              >
                                {data.subject}
                              </option>
                            );
                          })}
                        </select>
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
                      onClick={() => {
                        this.assignAssignment();
                      }}
                      type="button"
                      class="btn btn-primary"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="exampleModal2"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Assign: {this.state.toBeAssignedTitle}
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
                    <div className="form-row" id="assignNowRow">
                      <div className="form-group col-md-4">
                        <label>Due Date</label>
                        <input
                          type="date"
                          id="dueDate"
                          name="dueDate"
                          onChange={(e) => {
                            this.setDueDate(e);
                          }}
                        />
                        <input
                          type="time"
                          id="dueTime"
                          name="dueTime"
                          onChange={(e) => {
                            this.setDueTime(e);
                          }}
                        />
                      </div>
                      <div class="form-group col-md-4">
                        <label>Section</label>
                        <select
                          id="sectionList"
                          class="form-control"
                          onChange={(e) => {
                            this.setSection2(e);
                          }}
                        >
                          <option value={0} selected>
                            Select An Option
                          </option>
                          {this.state.sectionList.map((data, index) => {
                            return (
                              <option
                                key={data.sectionId}
                                value={data.sectionId}
                              >
                                {data.section}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div class="form-group col-md-4">
                        <label>Subject</label>
                        <select
                          id="subjectList2"
                          class="form-control"
                          onChange={(e) => {
                            this.setSubject(e);
                          }}
                          disabled
                        >
                          <option value={0} selected>
                            Select An Option
                          </option>
                          {this.state.subjectList.map((data, index) => {
                            return (
                              <option
                                key={data.subjectId}
                                value={data.subjectId}
                              >
                                {data.subject}
                              </option>
                            );
                          })}
                        </select>
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
                      onClick={() => {
                        this.assignDataSet();
                      }}
                      type="button"
                      class="btn btn-primary"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
                    View All Assignments
                  </span>
                </nav>
              </div>
              <div className="container-fluid">
                <div className="card" id="list-view">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <h4>View All Assignments</h4>
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

export default TeacherAssignments;
