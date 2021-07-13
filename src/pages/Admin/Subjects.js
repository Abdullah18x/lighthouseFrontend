import React, { Component } from "react";
import { Link } from "@reach/router";
var ls = require("local-storage");
const auth = require("../../axios/auth");
const admin = require("../../axios/admin");

class Subjects extends Component {
  state = {
    adminId: ls.get("adminId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    studentsList: [],
    subject: "",
    editSubjectId: 0,
    editSubject: "",
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
    } else {
      if (verifyToken[0].expired === 1) {
        this.setState({
          loggedIn: false,
        });
      }
    }
  };

  setSubjects = async () => {
    let studentsList = await admin.getSubjects(this.state.token);
    this.setState({
      studentsList: studentsList,
    });
  };

  setSubject = (e) => {
    let subject = e.target.value;
    this.setState({
      subject: subject,
    });
  };

  insertSubject = async () => {
    let insertSubject = await admin.insertSubject(
      this.state.subject,
      this.state.token
    );
    this.setSubjects();
  };

  setToEditSubjectValues = (a, b) => {
    this.setState({
      editSubjectId: a,
      editSubject: b,
    });
  };
  setToEditSubject = (e) => {
    this.setState({
      editSubject: e.target.value,
    });
  };
  updateSubject = async () => {
    if (this.state.editSubject != "") {
      let editSubject = await admin.updateSubject(
        this.state.editSubjectId,
        this.state.editSubject,
        this.state.token
      );
      this.setSubjects();
    } else {
      alert("Cannot set Empty Value");
    }
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
      this.setSubjects();
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
                    Students
                  </a>
                  <span className="breadcrumb-item active">
                    View All Students
                  </span>
                </nav>
              </div>
            </div>
            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit Subject:
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
                  <div className="modal-body">
                    <div className="form-group">
                      <div className="input-affix">
                        <i className="prefix-icon anticon anticon-user" />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Subject"
                          value={this.state.editSubject}
                          onChange={(e) => this.setToEditSubject(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={this.updateSubject}
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <label className="font-weight-semibold" htmlFor="userName">
                  Insert Subject:
                </label>
                <div className="row">
                  <div className="form-group">
                    <div className="input-affix">
                      <i className="prefix-icon anticon anticon-user" />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        onChange={(e) => this.setSubject(e)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="d-flex align-items-center justify-content-between">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.insertSubject}
                      >
                        Insert
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h4>View All Subjects</h4>
                <div className="m-t-25">
                  <table id="data-table" className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.studentsList.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.subjectId}</td>
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
                                  <button
                                    id={data.subjectId}
                                    onClick={() => {
                                      this.setToEditSubjectValues(
                                        data.subjectId,
                                        data.subject
                                      );
                                    }}
                                    className="dropdown-item"
                                    type="button"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                  >
                                    <i className="anticon anticon-delete" />
                                    <span className="m-l-10">Edit</span>
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </table>
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

export default Subjects;
