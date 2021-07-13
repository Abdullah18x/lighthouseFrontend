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
    submittedBy: "",
    critical: "",
    resolved: "",
    description: "",
    comment: "",
    comments: [],
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

  getFeedback = async () => {
    try {
      let getFeedback = await lecturer.getfeedback(
        this.props.location.state.fbId,
        this.state.token
      );
      let critical = "No";
      let resolved = "No";
      if (getFeedback[0].critical === 1) {
        critical = "Yes";
      }
      if (getFeedback[0].resolved === 2) {
        resolved = "Yes";
      }
      this.setState({
        title: getFeedback[0].title,
        submittedBy: getFeedback[0].userDetails,
        critical: critical,
        resolved: resolved,
        description: getFeedback[0].feedback,
      });
    } catch (error) {}
  };

  setComment(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  getComments = async () => {
    try {
      let comments = await lecturer.getComments(
        this.props.location.state.fbId,
        this.state.token
      );
      this.setState({
        comments: comments,
      });
    } catch (error) {
      console.log(error);
    }
  };

  comment = async () => {
    try {
      let getLecturer = await lecturer.getUser(
        this.state.lecturerId,
        this.state.token
      );
      let userDetails = "Lecturer (".concat(getLecturer.name.concat(")"));
      if (this.state.comment != "") {
        let addComment = await lecturer.comment(
          this.props.location.state.fbId,
          userDetails,
          this.state.comment,
          this.state.token
        );
        this.getComments();
      }
    } catch (error) {}
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
      this.getFeedback();
      this.getComments();
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
                                <h5 className="m-b-0">
                                  Feedback Submitted By ({" "}
                                  {this.state.submittedBy} )
                                </h5>
                                <h5 className="m-b-0">
                                  Resolved: ( {this.state.critical} )
                                </h5>
                                <h5 className="m-b-0">
                                  Critical: ( {this.state.resolved} )
                                </h5>
                              </div>
                            </div>
                          </div>
                          <div className="m-t-40">
                            <h6>Description:</h6>
                            <p>{this.state.description}</p>
                          </div>
                        </div>
                        <div className="m-t-30">
                          <ul className="nav nav-tabs">
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                data-toggle="tab"
                                href="#solutionTab"
                              >
                                Discussion
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content m-t-15 p-25">
                            <div
                              className="tab-pane fade show active"
                              id="solutionTab"
                              role="tabpanel"
                              aria-labelledby="links"
                            >
                              <h4>Comment</h4>
                              <div className="form-row">
                                <div className="form-group col-md-12">
                                  <textarea
                                    className="form-control"
                                    id="input5"
                                    placeholder="Comment"
                                    onChange={(e) => {
                                      this.setComment(e);
                                    }}
                                  ></textarea>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  onClick={this.comment}
                                >
                                  Comment
                                </button>
                              </div>
                              {this.state.comments.map((data, fields) => {
                                return (
                                  <div>
                                    <hr />
                                    <h5
                                      style={{
                                        float: "left",
                                        marginRight: "10px",
                                      }}
                                    >
                                      {data.userDetails}:{" "}
                                    </h5>
                                    <p>{data.comment}</p>
                                    <hr />
                                  </div>
                                );
                              })}
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
