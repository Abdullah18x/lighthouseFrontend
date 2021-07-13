import React, { Component} from 'react';

export default props => (
<div className="page-container">
  <div className="main-content">
    <div className="page-header">
      <h2 className="header-title">Profile</h2>
      <div className="header-sub-title">
        <nav className="breadcrumb breadcrumb-dash">
          <a href="#" className="breadcrumb-item"><i className="anticon anticon-home m-r-5" />Home</a>
          <a className="breadcrumb-item" href="#">Pages</a>
          <span className="breadcrumb-item active">Profile</span>
        </nav>
      </div>
    </div>
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-7">
              <div className="d-md-flex align-items-center">
                <div className="text-center text-sm-left ">
                  <div className="avatar avatar-image" style={{width: '150px', height: '150px'}}>
                    <img src="../assets/images/avatars/thumb.jpg" alt="" />
                  </div>
                </div>
                <div className="text-center text-sm-left m-v-15 p-l-30">
                  <h2 className="m-b-5">ALI ZAIN</h2>
                  <p className="text-opacity font-size-13">FA17-BSE-016</p>
                  <button className="btn btn-primary btn-tone">Edit Profile</button>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="row">
                <div className="d-md-block d-none border-left col-1" />
                <div className="col">
                  <ul className="list-unstyled m-t-10">
                    <li className="row">
                      <p className="col-sm-4 col-4 font-weight-semibold text-dark m-b-5">
                        <i className="m-r-10 text-primary anticon anticon-mail" />
                        <span>Email: </span> 
                      </p>
                      <p className="col font-weight-semibold">fa17-bse-016@isb.comsats.edu.pk</p>
                    </li>
                    <li className="row">
                      <p className="col-sm-4 col-4 font-weight-semibold text-dark m-b-5">
                        <i className="m-r-10 text-primary anticon anticon-phone" />
                        <span>Phone: </span> 
                      </p>
                      <p className="col font-weight-semibold">+92 335 498 3303</p>
                    </li>
                    <li className="row">
                      <p className="col-sm-4 col-5 font-weight-semibold text-dark m-b-5">
                        <i className="m-r-10 text-primary anticon anticon-compass" />
                        <span>Section: </span> 
                      </p>
                      <p className="col font-weight-semibold">ISB-BSE-7A</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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