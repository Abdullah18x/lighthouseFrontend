import React, {Component} from 'react';

class IDE extends React.Component {
    render() {
        return (
            <div className="page-container">
            <div className="main-content">
              <div className="page-header no-gutters has-tab">
                <h2 className="font-weight-normal">Settings</h2>
              </div>
              <div className="container">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Basic Infomation</h4>
                  </div>
                  <div className="card-body">
                    <div className="media align-items-center">
                      <div className="avatar avatar-image  m-h-10 m-r-15" style={{height: '80px', width: '80px'}}>
                        <img src="assets/images/avatars/thumb.jpg" alt="" />
                      </div>
                      <div className="m-l-20 m-r-20">
                        <h5 className="m-b-5 font-size-18">Change Avatar</h5>
                        <p className="opacity-07 font-size-13 m-b-0">
                          Recommended Dimensions: <br />
                          120x120 Max fil size: 5MB
                        </p>
                      </div>
                      <div>
                        <button className="btn btn-tone btn-primary">Upload</button>
                      </div>
                    </div>
                    <hr className="m-v-25" />
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label className="font-weight-semibold" htmlFor="userName">User Name:</label>
                          <input type="text" className="form-control" id="userName" placeholder="User Name" defaultValue="Ali Zain" />
                        </div>
                        <div className="form-group col-md-6">
                          <label className="font-weight-semibold" htmlFor="email">Email:</label>
                          <input type="password" className="form-control" id="email" placeholder="email" defaultValue="@marshallnich" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label className="font-weight-semibold" htmlFor="phoneNumber">Phone Number:</label>
                          <input type="text" className="form-control" id="phoneNumber" placeholder="Phone Number" />
                        </div>
                        <div className="form-group col-md-4">
                          <label className="font-weight-semibold" htmlFor="dob">Date of Birth:</label>
                          <input type="text" className="form-control" id="dob" placeholder="Date of Birth" />
                        </div>
                        <div className="form-group col-md-4">
                          <label className="font-weight-semibold" htmlFor="language">Language</label>
                          <select id="language" className="form-control">
                            <option>English</option>
                            <option>France</option>
                            <option>German</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Change Password</h4>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label className="font-weight-semibold" htmlFor="oldPassword">Old Password:</label>
                          <input type="password" className="form-control" id="oldPassword" placeholder="Old Password" />
                        </div>
                        <div className="form-group col-md-3">
                          <label className="font-weight-semibold" htmlFor="newPassword">New Password:</label>
                          <input type="password" className="form-control" id="newPassword" placeholder="New Password" />
                        </div>
                        <div className="form-group col-md-3">
                          <label className="font-weight-semibold" htmlFor="confirmPassword">Confirm Password:</label>
                          <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
                        </div>
                        <div className="form-group col-md-3">
                          <button className="btn btn-primary m-t-30">Change</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Address Details</h4>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label className="font-weight-semibold" htmlFor="fullAddress">Full Address:</label>
                          <input type="text" className="form-control" id="fullAddress" placeholder="Full Address" />
                        </div>
                        <div className="form-group col-md-6">
                          <label className="font-weight-semibold" htmlFor="City">City:</label>
                          <input type="text" className="form-control" id="City" placeholder="City" />
                        </div>
                        <div className="form-group col-md-6">
                          <label className="font-weight-semibold" htmlFor="language">Province</label>
                          <select id="province-2" className="form-control">
                            <option>Islamabad Capital Territory</option>
                            <option>AJK</option>
                            <option>KPK</option>
                            <option>Punjab</option>
                            <option>Balochistan</option>
                            <option>Sindh</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mx-auto">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Notification Config</h4>
                      </div>
                      <div className="card-body">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item p-h-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-icon avatar-blue">
                                  <i className="anticon anticon-user" />
                                </div>
                                <div className="m-l-15">
                                  <h5 className="font-weight-semibold m-b-0">Everyone can look me up</h5>
                                  <p className="m-b-0 font-weight-normal">Allow people found on your public.</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="switch m-t-5 m-l-10">
                                  <input type="checkbox" id="switch-config-1" defaultChecked />
                                  <label htmlFor="switch-config-1" />
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item p-h-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-icon avatar-cyan">
                                  <i className="anticon anticon-mobile" />
                                </div>
                                <div className="m-l-15">
                                  <h5 className="font-weight-semibold m-b-0">Everyone can contact me</h5>
                                  <p className="m-b-0 font-weight-normal">Allow any peole to contact.</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="switch m-t-5 m-l-10">
                                  <input type="checkbox" id="switch-config-2" defaultChecked /> 
                                  <label htmlFor="switch-config-2" />
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item p-h-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-icon avatar-gold">
                                  <i className="anticon anticon-environment" />
                                </div>
                                <div className="m-l-15">
                                  <h5 className="font-weight-semibold m-b-0">Show my location</h5>
                                  <p className="m-b-0 font-weight-normal">Turning on Location lets you explore what's around you.</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="switch m-t-5 m-l-10">
                                  <input type="checkbox" id="switch-config-3" />
                                  <label htmlFor="switch-config-3" />
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item p-h-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-icon avatar-purple">
                                  <i className="anticon anticon-mail" />
                                </div>
                                <div className="m-l-15">
                                  <h5 className="font-weight-semibold m-b-0">Email Notifications</h5>
                                  <p className="m-b-0 font-weight-normal">Receive daily email notifications.</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="switch m-t-5 m-l-10">
                                  <input type="checkbox" id="switch-config-4" defaultChecked />
                                  <label htmlFor="switch-config-4" />
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item p-h-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-icon avatar-red">
                                  <i className="anticon anticon-question" />
                                </div>
                                <div className="m-l-15">
                                  <h5 className="font-weight-semibold m-b-0">Unknow Source</h5>
                                  <p className="m-b-0 font-weight-normal">Allow all downloads from unknow source.</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="switch m-t-5 m-l-10">
                                  <input type="checkbox" id="switch-config-5" />
                                  <label htmlFor="switch-config-5" />
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item p-h-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-icon avatar-green">
                                  <i className="anticon anticon-swap" />
                                </div>
                                <div className="m-l-15">
                                  <h5 className="font-weight-semibold m-b-0">Data Synchronization</h5>
                                  <p className="m-b-0 font-weight-normal">Allow data synchronize with cloud server.</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="switch m-t-5 m-l-10">
                                  <input type="checkbox" id="switch-config-6" defaultChecked />
                                  <label htmlFor="switch-config-6" />
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item p-h-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-icon avatar-orange">
                                  <i className="anticon anticon-usergroup-add" />
                                </div>
                                <div className="m-l-15">
                                  <h5 className="font-weight-semibold m-b-0">Groups Invitation</h5>
                                  <p className="m-b-0 font-weight-normal">Allow any groups invitation</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="switch m-t-5 m-l-10">
                                  <input type="checkbox" id="switch-config-7" defaultChecked />
                                  <label htmlFor="switch-config-7" />
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul> 
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
    }
}

export default IDE