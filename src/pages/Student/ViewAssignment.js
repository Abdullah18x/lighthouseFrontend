import React, { Component} from 'react';
import { Link } from "@reach/router";
const ls = require('local-storage')
const auth = require('../../axios/auth')
const student = require('../../axios/student')

class ViewAssignment extends Component{
  state={
    studentId: ls.get('studentId'),
    userType: ls.get('userType'),
    token: ls.get('token'),
    title:'',
    description:'',
    links:[],
    attachment:'',
    resourceMaterial:'',
    totalMarks:0,
    solution:'Solve Assignment to show your solution here',
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

  downloadFile = async () => {
    // try {
    //     let downloading = student.downloadFile(this.state.resourceMaterial, this.state.token)
    // } catch (error) {
    //     console.log(error)
    // }
  }

  getAssignment = async () => {
      try {
          let assignmentId = this.props.location.state.assignmentId
          let returnedAssignment = await student.getAssignment(assignmentId, this.state.token)
          
          let removedNewLines = returnedAssignment[0].resourceLinks.replace(/[\r\n]+/g," ")
          let links = removedNewLines.split(' ')
        console.log(returnedAssignment)
          this.setState({
              title:returnedAssignment[0].title,
              describe:returnedAssignment[0].details,
              links:links,
              resourceMaterial:returnedAssignment[0].resourceMaterial,
              totalMarks:returnedAssignment[0].totalMarks
          })
      } catch (error) {
          
      }
  }

  openIde = () => {
    const url = `http://localhost:5500/?studentId=${this.state.studentId}&assignmentId=${this.props.location.state.assignmentId}&assignmentType=${this.props.location.state.assignmentType}&assignedId=${this.props.location.state.assignedId}&ide=${this.state.token}`;
    window.open(url, '_blank');
   
  }

  gettingSolution = async () => {
    try {
      let submittedAssignment = await student.getStudentSubmissionS(this.props.location.state.assignedId,this.state.studentId, this.state.token)
      console.log(submittedAssignment)
      if (submittedAssignment.length > 0) {
        this.setState({
          solution: submittedAssignment[0].solution
        })
      }
    } catch (error) {
      
    }
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
        this.getAssignment()
        this.gettingSolution()
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
                        <span className="breadcrumb-item active">View Assignment</span>
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
                      <button type='button' onClick={this.openIde} class="btn btn-primary btn-tone">Attemp Assignment</button>
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
                    {/* <li className="nav-item">
                      <a className="nav-link active" data-toggle="tab" href="#submitted">Submitted</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="lab-acitivity-1-tab" data-toggle="tab" href="#non-submitted" role="tab" aria-controls="non-submitted" aria-selected="false">Non Submitted</a>
                    </li> */}
                    <li className="nav-item">
                      <a className="nav-link active" id="home-acitivity-1-tab" data-toggle="tab" href="#links" role="tab" aria-controls="home-activity-1" aria-selected="false">Links</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#project-details-attachment">Attachment</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#solutionTab">Solution</a>
                    </li>
                  </ul>
                  <div className="tab-content m-t-15 p-25">
                    {/* <div className="tab-pane fade show active" id="submitted">
                      <table id="data-table" className="table">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Registration Number</th>
                              <th>Section</th>
                              <th>Subject</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Ali Zain</td>
                              <td>FA17-BSE-016</td>
                              <td>SE-7A</td>
                              <td>OOP</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <th>Name</th>
                              <th>Registration Number</th>
                              <th>Section</th>
                              <th>Subject</th>
                            </tr>
                          </tfoot>
                        </table>
                    </div> */}
                    {/* <div className="tab-pane fade" id="non-submitted">
                      <table id="data-table" className="table">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Registration Number</th>
                                <th>Section</th>
                                <th>Subject</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Ali Zain</td>
                                <td>FA17-BSE-016</td>
                                <td>SE-7A</td>
                                <td>OOP</td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                <th>Name</th>
                                <th>Registration Number</th>
                                <th>Section</th>
                                <th>Subject</th>
                              </tr>
                            </tfoot>
                          </table>
                    </div> */}
                    <div className="tab-pane fade" id="project-details-attachment">
                        
                      <div className="file" style={{minWidth: '200px'}}>
                        <div className="media align-items-center">
                          <div className="avatar avatar-icon avatar-cyan rounded m-r-15">
                            <i className="anticon anticon-file-exclamation font-size-20" />
                          </div>
                          <div>
                            <h6 className="mb-0">{this.state.resourceMaterial}</h6>
                          </div>
                        </div>
                      </div>
                      {/* <div className="file" style={{minWidth: '200px'}}>
                        <div className="media align-items-center">
                          <div className="avatar avatar-icon avatar-blue rounded m-r-15">
                            <i className="anticon anticon-file-word font-size-20" />
                          </div>
                          <div>
                            <h6 className="mb-0">Guideline.doc</h6>
                            <span className="font-size-13 text-muted">128 KB</span>
                          </div>
                        </div>
                      </div>
                      <div className="file" style={{minWidth: '200px'}}>
                        <div className="media align-items-center">
                          <div className="avatar avatar-icon avatar-gold rounded m-r-15">
                            <i className="anticon anticon-file-image font-size-20" />
                          </div>
                          <div>
                            <h6 className="mb-0">Logo.png</h6>
                            <span className="font-size-13 text-muted">128 KB</span>
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <div className="tab-pane fade show" id="solutionTab" role="tabpanel" aria-labelledby="links">
                      <h3>Solution:</h3>
                      <pre>{this.state.solution}</pre>
                      
                      
                    </div>
                    <div className="tab-pane fade show active" id="links" role="tabpanel" aria-labelledby="links">
                      <h3>Links for help:</h3>
                      <ul>
                        {
                            this.state.links.map((data, index) => (
                            <li key={index}><a href={data}>{data}</a> </li>
                            ))
                        }
                      </ul>
                      
                      
                    </div>
                    
                    {/* <div className="tab-pane fade" id="project-details-attachment" role="tabpanel" aria-labelledby="lab-activity-1-tab">
                      <h3>Activity 1:</h3>
                      <p>Use above functions to implement basic objects using lines, rectangles, ellipses.</p>
                    </div> */}
                    {/* <div className="tab-pane fade" id="home-activity-1" role="tabpanel" aria-labelledby="home-activity-1-tab">
                      <h3>Home Activity 1:</h3>
                      <p>Use all the functions provided to build a simple sketch that involves basic polygons</p>
                      <button id="trigger-loading" className="btn btn-primary m-r-5">
                        <i className="anticon anticon-loading m-r-5" />
                        <span>Open IDE</span>
                      </button>
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
                <p className="m-b-0">Copyright © 2020 COMSATS University. All rights reserved.</p>
                <span>
                </span>
                </div>
            </footer>
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

export default ViewAssignment