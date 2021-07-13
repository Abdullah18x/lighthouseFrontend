import React, { Component} from 'react';
const ls = require('local-storage')
const auth = require('../../axios/auth')
const admin = require('../../axios/admin')

class AdminAddStudent extends Component{
  state={
    adminId: ls.get('adminId'),
    userType: ls.get('userType'),
    token: ls.get('token'),
    userName:'',
    name:'',
    password:'12345',
    email:'',
    rollNo:'',
    loggedIn: true
  }

  verification = async () => {
    let verifyToken = await auth.verifyToken(this.state.adminId,this.state.userType,this.state.token)
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
  setUserName = (event) => {
    let value = event.target.value
    this.setState({
        userName:value
    })
  }

  setName = (event) => {
    let value = event.target.value
    this.setState({
        name:value
    })
}

setEmail = (event) => {
  let value = event.target.value
  this.setState({
      email:value
  })
}

setRollNo = (event) => {
    let value = event.target.value
    this.setState({
        rollNo:value
    })
  }
  
addStudent = async (event) => {
  try {
    event.preventDefault()
    if (this.state.userName === '' || this.state.name === '' || this.state.email === '') {
      alert('Please fill all Fields')
    }else{
      let addStudent = await admin.addStudent(this.state.userName, this.state.password, this.state.email, this.state.name, this.state.rollNo, this.state.token)
      if (addStudent instanceof Error) {
        alert('User Name Taken')
      }else{
        alert('Inserted')
      }
    }
  } catch (error) {
    console.log(error);
  }
}

  componentDidMount(){
    if(this.state.adminId === null || this.state.adminId === undefined || this.state.userType === null || this.state.userType === undefined || this.state.token === null || this.state.token === undefined){
      this.setState({
        loggedIn:false
      })
      window.location.href='/error'
    }else{
      this.verification()
      // this.getSubject()
      // this.getSection()
    }
    
  }

  isLoggedIn = () => {
    if(this.state.loggedIn){
      return(
        <div>
          <div className="main-content">
      <div className="page-header">
        <div className="header-sub-title">
          <nav className="breadcrumb breadcrumb-dash">
            <a href="#" className="breadcrumb-item"><i className="anticon anticon-home m-r-5" />Home</a>
            <a className="breadcrumb-item" href="#">Teacher</a>
            <span className="breadcrumb-item active">Add Student</span>
          </nav>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h4>Add New Student (Default Password is always 12345)</h4>
          <div className="m-t-25">
            <form>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <label htmlFor="inputEmail4">User Name</label>
                  <input type="text" className="form-control" id="inputEmail4" onChange={(e) => {this.setUserName(e)}} />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputEmail4">Name</label>
                  <input type="text" className="form-control" id="inputEmail4"  onChange={(e) => {this.setName(e)}} />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputEmail4">Email</label>
                  <input type="email" className="form-control" id="inputEmail4"  onChange={(e) => {this.setEmail(e)}} />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputEmail4">RollNo (example: FA17-BSE-000)</label>
                  <input type="text" className="form-control" id="inputEmail4"  onChange={(e) => {this.setRollNo(e)}} />
                </div>
                {/* <div className="form-group col-md-6">
                  <label htmlFor="inputState">Subject</label>
                  <select id="inputState" className="form-control"  onChange={(e) => {this.setSubject(e)}}>
                    <option selected value={0}>Choose...</option>
                    {
                      this.state.subjectList.map((data, index) => {
                        return(
                          <option value={data.subjectId}>{data.subject}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputState">Section</label>
                  <select id="inputState" className="form-control"  onChange={(e) => {this.setSection(e)}}>
                    <option selected value={0}>Choose...</option>
                    {
                      this.state.sectionList.map((data, index) => {
                        return(
                          <option value={data.sectionId}>{data.section}</option>
                        )
                      })
                    }
                  </select>
                </div> */}
              </div>
              <button onClick={this.addStudent} type="button" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h4>Add Bulk Students</h4>
          <div className="m-t-25">
            <form>
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="customFile" />
                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
              </div>
              <button  type="button" className="m-t-30 btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <footer className="footer">
      <div className="footer-content">
        <p className="m-b-0">Copyright © 2020 COMSATS University. All rights reserved.</p>
        <span>
        </span>
      </div>
    </footer>
    {this.props.children}
        </div>
      )
  }
  else{
    window.location.href='/error'
  }
}

  render() {
    return (
      <div className="page-container">
    {this.isLoggedIn()}
  </div>
  
  )
  }
}

export default AdminAddStudent

