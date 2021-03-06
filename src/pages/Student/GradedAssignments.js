import React, { Component} from 'react';
import { Link } from "@reach/router";
const ls = require('local-storage')
const auth = require('../../axios/auth')
const student = require('../../axios/student')

class GradedAssignments extends Component{
  state={
    studentId: ls.get('studentId'),
    userType: ls.get('userType'),
    token: ls.get('token'),
    assignments:[],
    option:1,
    loggedIn: true
  }

  verification = async () => {
    let verifyToken = await auth.verifyToken(this.state.studentId,this.state.userType,this.state.token)
    if(verifyToken.length === 0 ){
      this.setState({
        loggedIn:false
      })
    }else{
      if(verifyToken.expired === 1){
        this.setState({
          loggedIn:false
        })
      }
    }
  }

  setAssignments = async () => {
    try {
      let returnedStudent = await student.getStudent(this.state.studentId, this.state.token)
      console.log(returnedStudent)
      let returnedAssignments = await student.getAssignments2(this.state.studentId, this.state.token)
      console.log(returnedAssignments)
      this.setState({
        assignments:returnedAssignments
      })
    } catch (error) {
      console.log(error)
    }
  }

  setDataSets = async () => {
    try {
      let returnedDataSets = await student.getDataSets2(this.state.studentId, this.state.token);
      this.setState({
        assignments: returnedDataSets,
      });
    } catch (error) {
      console.log(error);
    }
  };

  delete = async (assignmentId) =>{
    try {
      let deleteAssignment = await student.deleteAssignment(assignmentId, this.state.token)
      this.setAssignments()
    } catch (error) {
      console.log(error)
    }
  }
  formatDate = (date) =>{
    let format = date.replace('T', ' ').replace('.000Z','')
    return format
  }
  

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

  renderAssignments() {
    return(
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Obtained Marks</th>
              <th>Total Marks</th>
              <th>Section</th>
              <th>Subject</th>
              <th>Submission</th>
              <th>Status</th>
              
            </tr>
          </thead>
          <tbody>
          {
            this.state.assignments.map((data, index) => {
                let late = 'On Time'
                let checked = 'Not Checked'
                if (data.late === 1) {
                    late = 'Late Submission'
                }
                if (data.checked === 1) {
                    checked = 'Checked'
                }
              return (
                <tr key={index}>
                  <td>{data.assignmentId}</td>
                  <td>{data.title}</td>
                  <td>{data.marksObtained}</td>
                  <td>{data.totalMarks}</td>
                  <td>{data.section}</td>
                  <td>{data.subject}</td>
                  <td>{late}</td>
                  <td>{checked}</td>
                  
                </tr>
              )
            })
          }
            
          </tbody>
        </table>
      </div>
    )
  }

  renderDataSets() {
    return(
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
            <th>ID</th>
              <th>Title</th>
              <th>Obtained Marks</th>
              <th>Total Marks</th>
              <th>Section</th>
              <th>Subject</th>
              <th>Submission</th>
              <th>Status</th>
              
            </tr>
          </thead>
          <tbody>
          {
            this.state.assignments.map((data, index) => {
                let late = 'On Time'
                let checked = 'Not Checked'
                if (data.late === 1) {
                    late = 'Late Submission'
                }
                if (data.checked === 1) {
                    checked = 'Checked'
                }
              return (
                <tr key={index}>
                  <td>{data.datasetId}</td>
                  <td>{data.title}</td>
                  <td>{data.marksObtained}</td>
                  <td>{data.totalMarks}</td>
                  <td>{data.section}</td>
                  <td>{data.subject}</td>
                  <td>{late}</td>
                  <td>{checked}</td>
                  
                </tr>
              )
            })
          }
            
          </tbody>
        </table>
      </div>
    )
  }

  componentDidMount(){
    if(this.state.studentId === null || this.state.studentId === undefined || this.state.userType === null || this.state.userType === undefined || this.state.token === null || this.state.token === undefined){
      this.setState({
        loggedIn:false
      })
      window.location.href='/error'
    }else{
      this.verification()
    }
    if(this.state.loggedIn){
      this.setAssignments()
    }
    
  }

  isLoggedIn = () => {
    
    if(this.state.loggedIn){
      return (
        <div>
          <div className="main-content">
          <div className="page-header">
          <div className="header-sub-title">
                        <nav className="breadcrumb breadcrumb-dash">
                        <a href="#" className="breadcrumb-item"><i className="anticon anticon-home m-r-5" />Home</a>
                        <a className="breadcrumb-item" href="#">Sections</a>
                        <span className="breadcrumb-item active">View All Assignments</span>
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
              <p className="m-b-0">Copyright ?? 2020 COMSATS University. All rights reserved.</p>
              <span>
              </span>
            </div>
          </footer>
                
            {this.props.children}
            </div>
      )
  }else{
    window.location.href='/error'
  }
}

  render(){
    return(
      <div className="page-container">
        {this.isLoggedIn()}
</div>
    )
  }
}

export default GradedAssignments