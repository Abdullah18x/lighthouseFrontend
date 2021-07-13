import React, { Component } from "react";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const admin = require("../../axios/admin");

class AdminAddDataSet extends Component {
  state = {
    adminId: ls.get("adminId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    title: "",
    totalMarks: 0,
    timeNeeded: 0,
    ifC: 0,
    switchC: 0,
    whileL: 0,
    dowhileL: 0,
    forL: 0,
    multipleClasses: 0,
    methods: 0,
    arrays: 0,
    expectedAnsType: 1,
    expectedAns: "",
    subject: 0,
    subjectList: [],
    resourceMaterial: "",
    fileName: "Choose File",
    details: "",
    resourceLinks: "",
    solution: "",
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
      if (verifyToken.expired === 1) {
        this.setState({
          loggedIn: false,
        });
      }
    }
  };
  setTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  setTotalMarks = (event) => {
    let num = event.target.value;
    if (Number.isInteger(parseInt(num))) {
      this.setState({
        totalMarks: num,
      });
    }
  };

  setTimeNeeded = (event) => {
    let num = event.target.value;
    if (Number.isInteger(parseInt(num))) {
      this.setState({
        timeNeeded: num,
      });
    }
  };

  setSubject(e) {
    this.setState({
      subject: e.target.value,
    });
  }
  setExpectedAns(e) {
    this.setState({
      expectedAns: e.target.value,
    });
  }

  setResourceMaterial = async (e) => {
    try {
      let fileName = await e.target.files[0].name;
      this.setState({
        resourceMaterial: e.target.files[0],
        fileName: fileName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  setDetails(e) {
    this.setState({
      details: e.target.value,
    });
  }
  setResourceLinks(e) {
    this.setState({
      resourceLinks: e.target.value,
    });
  }
  setSolution(e) {
    this.setState({
      solution: e.target.value,
    });
  }

  setifC(e) {
    this.setState({
      ifC: e.target.value,
    });
  }

  setSwitchC(e) {
    if (e.target.checked) {
      this.setState({
        switchC: e.target.value,
      });
    } else {
      this.setState({
        switchC: 0,
      });
    }
  }

  setWhileL(e) {
    if (e.target.checked) {
      this.setState({
        whileL: e.target.value,
      });
    } else {
      this.setState({
        whileL: 0,
      });
    }
  }
  setDowhileL(e) {
    if (e.target.checked) {
      this.setState({
        dowhileL: e.target.value,
      });
    } else {
      this.setState({
        dowhileL: 0,
      });
    }
  }
  setForL(e) {
    if (e.target.checked) {
      this.setState({
        forL: e.target.value,
      });
    } else {
      this.setState({
        forL: 0,
      });
    }
  }

  setMultipleClasses(e) {
    if (e.target.checked) {
      this.setState({
        multipleClasses: e.target.value,
      });
    } else {
      this.setState({
        multipleClasses: 0,
      });
    }
  }

  setMethods(e) {
    if (e.target.checked) {
      this.setState({
        methods: e.target.value,
      });
    } else {
      this.setState({
        methods: 0,
      });
    }
  }

  setArrays(e) {
    if (e.target.checked) {
      this.setState({
        arrays: e.target.value,
      });
    } else {
      this.setState({
        arrays: 0,
      });
    }
  }

  setExpectedAnsType(e) {
    this.setState({
      expectedAnsType: e.target.value,
    });
  }

  getSubjects = async () => {
    let getSubjects = await admin.getSubjects(this.state.token);
    this.setState({
      subjectList: getSubjects,
    });
  };

  saveDataSet = async () => {
    try {
      var data = new FormData();
      if (
        this.state.title === "" ||
        this.state.subject === 0 ||
        !this.state.fileName.localeCompare("Choose File") ||
        this.state.details === "" ||
        this.state.resourceLinks === "" ||
        this.state.expectedAns === "" ||
        this.state.solution === ""
      ) {
        alert("please fill out the entire form");
        return;
      }
      data.append("title", this.state.title);
      data.append("totalMarks", this.state.totalMarks);
      data.append("timeNeeded", this.state.timeNeeded);
      data.append("ifC", this.state.ifC);
      data.append("switchC", this.state.switchC);
      data.append("whileL", this.state.whileL);
      data.append("dowhileL", this.state.dowhileL);
      data.append("forL", this.state.forL);
      data.append("multipleClasses", this.state.multipleClasses);
      data.append("methods", this.state.methods);
      data.append("arrays", this.state.arrays);
      data.append("expectedAnsType", this.state.expectedAnsType);
      data.append("expectedAns", this.state.expectedAns);
      data.append("subjectId", this.state.subject);
      data.append("resourceMaterial", this.state.resourceMaterial);
      data.append("details", this.state.details);
      data.append("resourceLinks", this.state.resourceLinks);
      data.append("solution", this.state.solution);
      let uploaded = await admin.saveDataSet(data, this.state.token);
      alert("Inserted");
    } catch (error) {
      console.log(error);
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
      this.getSubjects();
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
                    Admin
                  </a>
                  <span className="breadcrumb-item active">Add DataSet</span>
                </nav>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h4 className="m-b-25">Add DataSet</h4>
                <div className="m-t-25">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="assignmentTitle">
                          Assignment Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="assignmentTitle"
                          placeholder="Title"
                          onChange={(e) => this.setTitle(e)}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="totalMarks">Total Marks</label>
                        <input
                          type="number"
                          className="form-control"
                          id="totalMarks"
                          placeholder="Marks"
                          onChange={(e) => this.setTotalMarks(e)}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="totalMarks">Time Needed</label>
                        <input
                          type="number"
                          className="form-control"
                          id="timeNeeded"
                          placeholder="Minutes"
                          onChange={(e) => this.setTimeNeeded(e)}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-2">
                        <h5>Conditionals</h5>
                        <input
                          value={1}
                          id="IF"
                          type="radio"
                          name="ifElse"
                          onClick={(e) => this.setifC(e)}
                        />
                        <label htmlFor="IF" className="p-l-10">
                          {" "}
                          IF
                        </label>
                      </div>
                      <div className="form-group col-md-2">
                        <br />
                        <input
                          value={2}
                          id="IEI"
                          type="radio"
                          name="ifElse"
                          onClick={(e) => this.setifC(e)}
                        />
                        <label htmlFor="IEI" className="p-l-10">
                          IF ELSE IF
                        </label>
                      </div>
                      <div className="form-group col-md-2">
                        <br />
                        <input
                          value={1}
                          id="Switch"
                          type="checkbox"
                          onClick={(e) => this.setSwitchC(e)}
                        />
                        <label htmlFor="Switch" className="p-l-10">
                          Switch
                        </label>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-2">
                        <h5>Loops</h5>
                        <input
                          value={1}
                          id="WL"
                          type="checkbox"
                          onClick={(e) => this.setWhileL(e)}
                        />
                        <label htmlFor="WL" className="p-l-10">
                          WHILE LOOP{" "}
                        </label>
                      </div>
                      <div className="form-group col-md-2">
                        <br />
                        <input
                          value={1}
                          id="DWL"
                          type="checkbox"
                          onClick={(e) => this.setDowhileL(e)}
                        />
                        <label htmlFor="DWL" className="p-l-10">
                          DO WHILE LOOP
                        </label>
                      </div>
                      <div className="form-group col-md-2">
                        <br />
                        <input
                          value={1}
                          id="FR"
                          type="checkbox"
                          onClick={(e) => this.setForL(e)}
                        />
                        <label htmlFor="FR" className="p-l-10">
                          FOR LOOP
                        </label>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-2">
                        <h5>More Elements </h5>
                        <input
                          value={1}
                          id="MC"
                          type="checkbox"
                          onClick={(e) => this.setMultipleClasses(e)}
                        />
                        <label htmlFor="MC" className="p-l-10">
                          Multiple Classes{" "}
                        </label>
                      </div>
                      {/* <div className="form-group col-md-2">
                    <br/>
                    <input value={1} id="Methods" type="checkbox" onClick={(e) => this.setMethods(e)}/>
                    <label htmlFor="Methods" className="p-l-10">Methods</label>
                    
                </div>
                <div className="form-group col-md-2">
                    <br/>
                    <input value={1} id="Arrays" type="checkbox" onClick={(e) => this.setArrays(e)}/>
                    <label htmlFor="Arrays" className="p-l-10">Arrays</label>
                    
                </div> */}
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-2">
                        <h5>Expected answer type </h5>
                        <input
                          value={1}
                          id="String"
                          type="radio"
                          name="answerType"
                          onClick={(e) => this.setExpectedAnsType(e)}
                        />
                        <label htmlFor="String" className="p-l-10">
                          String{" "}
                        </label>
                      </div>
                      <div className="form-group col-md-2">
                        <br />
                        <input
                          value={2}
                          id="Number"
                          type="radio"
                          name="answerType"
                          onClick={(e) => this.setExpectedAnsType(e)}
                        />
                        <label htmlFor="Number" className="p-l-10">
                          Number
                        </label>
                      </div>
                      <div className="form-group col-md-2">
                        <br />
                        <input
                          value={3}
                          id="Sequence"
                          type="radio"
                          name="answerType"
                          onClick={(e) => this.setExpectedAnsType(e)}
                        />
                        <label htmlFor="Sequence" className="p-l-10">
                          Sequence
                        </label>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Expected Answer</label>
                        <textarea
                          className="form-control"
                          id="input5"
                          placeholder="Answer expected from student"
                          onChange={(e) => {
                            this.setExpectedAns(e);
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-row" id="assignNowRow">
                      <div class="form-group col-md-3">
                        <label>Subject</label>
                        <select
                          id="subjectList"
                          class="form-control"
                          onChange={(e) => {
                            this.setSubject(e);
                          }}
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
                    <div className="form-group">
                      <label>Resource Material</label>
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="customFile"
                          onChange={this.setResourceMaterial}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          {this.state.fileName}
                        </label>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Details</label>
                        <textarea
                          className="form-control"
                          id="input5"
                          placeholder="Details"
                          onChange={(e) => {
                            this.setDetails(e);
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">
                          Resource Links ~ Please give space bewteen links or
                          enter each one in a new line
                        </label>
                        <textarea
                          className="form-control"
                          id="input5"
                          placeholder="Helping Links"
                          onChange={(e) => {
                            this.setResourceLinks(e);
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="solution">Solution</label>
                        <textarea
                          className="form-control"
                          id="solution"
                          placeholder="Result"
                          onChange={(e) => {
                            this.setSolution(e);
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-row">
                      <button
                        id="saveAssignment"
                        type="button"
                        className="btn btn-primary"
                        onClick={this.saveDataSet}
                      >
                        Save
                      </button>
                    </div>
                  </form>
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

export default AdminAddDataSet;
