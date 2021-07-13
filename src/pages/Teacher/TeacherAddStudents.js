import React, { Component} from 'react';

export default props => (
<div className="page-container">
  <div className="main-content">
    <div className="page-header">
      <div className="header-sub-title">
        <nav className="breadcrumb breadcrumb-dash">
          <a href="#" className="breadcrumb-item"><i className="anticon anticon-home m-r-5" />Home</a>
          <a className="breadcrumb-item" href="#">Students</a>
          <span className="breadcrumb-item active">Add Students</span>
        </nav>
      </div>
    </div>
    <div className="card">
      <div className="card-body">
        <h4>Add New Student</h4>
        <div className="m-t-25">
          <form>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="inputEmail4">First Name</label>
                <input type="email" className="form-control" id="inputEmail4" placeholder />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputEmail4">Middle Name</label>
                <input type="email" className="form-control" id="inputEmail4" placeholder />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputEmail4">Last Name</label>
                <input type="email" className="form-control" id="inputEmail4" placeholder />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Student Registration Number</label>
                <input type="text" className="form-control" id="inputEmail4" placeholder="Registration Number" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputState">Section</label>
                <select id="inputState" className="form-control">
                  <option selected>Choose...</option>
                  <option>SE-7A</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
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
            <button type="submit" className="m-t-30 btn btn-primary">Submit</button>
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
</div>

    )