import React, { Component } from "react";
const ls = require("local-storage");
const auth = require("../../axios/auth");
const lecturer = require("../../axios/lecturer");

class TeacherViewSingleDataSet extends Component {
  state = {
    lecturerId: ls.get("teacherId"),
    userType: ls.get("userType"),
    token: ls.get("token"),
    datasetId: this.props.location.state.datasetId,
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
    subject: '',
    subjectList: [],
    resourceMaterial: "",
    fileName: "Choose File",
    tempfileName: "",
    details: "",
    resourceLinks:[],
    solution: "",
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
  
  getDataSet = async () => {
    let getDataSet = await lecturer.getDataSet(
      this.state.datasetId,
      this.state.token
    );
    let removedNewLines = getDataSet[0].resourceLinks.replace(/[\r\n]+/g," ")
    let links = removedNewLines.split(' ')
    console.log(links)
    this.setState({
      title: getDataSet[0].title,
      totalMarks: getDataSet[0].totalMarks,
      timeNeeded: getDataSet[0].timeNeeded,
      ifC: getDataSet[0].ifC,
      switchC: getDataSet[0].switchC,
      whileL: getDataSet[0].whileL,
      dowhileL: getDataSet[0].dowhileL,
      forL: getDataSet[0].forL,
      multipleClasses: getDataSet[0].multipleClasses,
      methods: getDataSet[0].methods,
      arrays: getDataSet[0].arrays,
      expectedAnsType: getDataSet[0].expectedAnsType,
      expectedAns: getDataSet[0].expectedAns,
      subject: getDataSet[0].subject,
      fileName: getDataSet[0].resourceMaterial,
      tempfileName: getDataSet[0].resourceMaterial,
      details: getDataSet[0].details,
      resourceLinks: links,
      solution: getDataSet[0].solution,
    });

    if (this.state.ifC === 1) {
      document.getElementById("IF").setAttribute("checked", "1");
    }
    if (this.state.ifC === 2) {
      document.getElementById("IEI").setAttribute("checked", "1");
    }
    if (this.state.switchC === 1) {
      document.getElementById("Switch").setAttribute("checked", "1");
    }
    if (this.state.whileL === 1) {
      document.getElementById("WL").setAttribute("checked", "1");
    }
    if (this.state.dowhileL === 1) {
      document.getElementById("DWL").setAttribute("checked", "1");
    }
    if (this.state.forL === 1) {
      document.getElementById("FR").setAttribute("checked", "1");
    }
    if (this.state.multipleClasses === 1) {
      document.getElementById("MC").setAttribute("checked", "1");
    }
    if (this.state.methods === 1) {
      document.getElementById("Methods").setAttribute("checked", "1");
    }
    if (this.state.arrays === 1) {
      document.getElementById("Arrays").setAttribute("checked", "1");
    }
    if (this.state.expectedAnsType === 1) {
      document.getElementById("String").setAttribute("checked", "1");
    }
    if (this.state.expectedAnsType === 2) {
      document.getElementById("Number").setAttribute("checked", "1");
    }
    if (this.state.expectedAnsType === 3) {
      document.getElementById("Sequence").setAttribute("checked", "1");
    }
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
      this.getDataSet();
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
                <div className="m-t-25">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="assignmentTitle">
                          Assignment Title
                        </label>
                        <h5>{this.state.title}</h5>
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="totalMarks">Total Marks</label>
                        <h5>{this.state.totalMarks}</h5>
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="totalMarks">Time Needed</label>
                        <h5>{this.state.timeNeeded}</h5>
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
                          disabled
                        />
                        <label htmlFor="IF" className="p-l-10">
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
                        />
                        <label htmlFor="MC" className="p-l-10">
                          Multiple Classes{" "}
                        </label>
                      </div>
                      <div className="form-group col-md-2">
                        <br />
                        <input
                          value={1}
                          id="Methods"
                          type="checkbox"
                          onClick={(e) => this.setMethods(e)}
                          disabled
                        />
                        <label htmlFor="Methods" className="p-l-10">
                          Methods
                        </label>
                      </div>
                      <div className="form-group col-md-2">
                        <br />
                        <input
                          value={1}
                          id="Arrays"
                          type="checkbox"
                          onClick={(e) => this.setArrays(e)}
                          disabled
                        />
                        <label htmlFor="Arrays" className="p-l-10">
                          Arrays
                        </label>
                      </div>
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
                          disabled
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
                          disabled
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
                          disabled
                        />
                        <label htmlFor="Sequence" className="p-l-10">
                          Sequence
                        </label>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Expected Answer</label>
                        <h5>{this.state.expectedAns}</h5>
                      </div>
                    </div>
                    <div className="form-row" id="assignNowRow">
                      <div class="form-group col-md-3">
                        <label>Subject</label>
                        <h5>{this.state.subject}</h5>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Resource Material</label>
                      <div className="custom-file">
                        <h5>{this.state.fileName}</h5>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Details</label>
                        <p>{this.state.details}</p>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">
                          Resource Links
                        </label>
                        
                        <ul>
                        {
                            this.state.resourceLinks.map((data, index) => (
                            <li key={index}><a href={data}>{data}</a> </li>
                            ))
                        }
                      </ul>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="solution">Solution</label>
                        <p>{this.state.solution}</p>
                      </div>
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

export default TeacherViewSingleDataSet;
