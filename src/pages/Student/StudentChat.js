import React, {Component} from 'react';

class StudentChat extends React.Component {
    render() {
        return (
            <div className="page-container">
            <div className="main-content">
              <div className="container-fluid p-h-0">
                <div className="chat chat-app row">
                  <div className="chat-list">
                    <div className="chat-user-tool">
                      <i className="anticon anticon-search search-icon p-r-10 font-size-20" />
                      <input placeholder="Search..." />
                    </div>
                    <div className="chat-user-list">
                      <a className="chat-list-item p-h-25" href="javascript:void(0);">
                        <div className="media align-items-center">
                          <div className="avatar avatar-image">
                            <img src="../assets/images/avatars/thumb.jpg" alt="" />
                          </div>
                          <div className="p-l-15">
                            <h5 className="m-b-0">Erin Gonzales</h5>
                            <p className="msg-overflow m-b-0 text-muted font-size-13">
                              Wow, that was cool!
                            </p>
                          </div>
                        </div>
                      </a>
                      <a className="chat-list-item p-h-25" href="javascript:void(0);">
                        <div className="media align-items-center">
                          <div className="avatar avatar-image">
                            <img src="../assets/images/avatars/thumb.jpg" alt="" />
                          </div>
                          <div className="p-l-15">
                            <h5 className="m-b-0">Darryl Day</h5>
                            <p className="msg-overflow m-b-0 text-muted font-size-13">
                              Okay! Thank you
                            </p>
                          </div>
                        </div>
                      </a>
                      <a className="chat-list-item p-h-25" href="javascript:void(0);">
                        <div className="media align-items-center">
                          <div className="avatar avatar-image">
                            <img src="../assets/images/avatars/thumb.jpg" alt="" />
                          </div>
                          <div className="p-l-15">
                            <h5 className="m-b-0">Marshall Nichols</h5>
                            <p className="msg-overflow m-b-0 text-muted font-size-13">
                              It's me..can you hear me..!!
                            </p>
                          </div>
                        </div>
                      </a>
                      <a className="chat-list-item p-h-25" href="javascript:void(0);">
                        <div className="media align-items-center">
                          <div className="avatar avatar-image">
                            <img src="../assets/images/avatars/thumb.jpg" alt="" />
                          </div>
                          <div className="p-l-15">
                            <h5 className="m-b-0">Virgil Gonzales</h5>
                            <p className="msg-overflow m-b-0 text-muted font-size-13">
                              ...but I wan to party
                            </p>
                          </div>
                        </div>
                      </a>
                      <a className="chat-list-item p-h-25" href="javascript:void(0);">
                        <div className="media align-items-center">
                          <div className="avatar avatar-image">
                            <img src="../assets/images/avatars/thumb.jpg" alt="" />
                          </div>
                          <div className="p-l-15">
                            <h5 className="m-b-0">Pamela Wanda</h5>
                            <p className="msg-overflow m-b-0 text-muted font-size-13">
                              The strongest man in the world is blowing up a hot water bottle.
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>   
                  </div>
                  <div className="chat-content">
                    <div className="conversation">
                      <div className="conversation-wrapper">
                        <div className="conversation-header justify-content-between">
                          <div className="media align-items-center">
                            <a href="javascript:void(0);" className="chat-close m-r-20 d-md-none d-block text-dark font-size-18 m-t-5">
                              <i className="anticon anticon-left-circle" />
                            </a>
                            <div className="avatar avatar-image">
                              <img src="../assets/images/avatars/thumb.jpg" alt="" />
                            </div>
                            <div className="p-l-15">
                              <h6 className="m-b-0">Erin Gonzales</h6>
                              <p className="m-b-0 text-muted font-size-13 m-b-0">
                                <span className="badge badge-success badge-dot m-r-5" />
                                <span>Online</span>
                              </p>
                            </div>
                          </div>
                          <div className="dropdown dropdown-animated scale-left">
                            <a className="text-dark font-size-20" href="javascript:void(0);" data-toggle="dropdown">
                              <i className="anticon anticon-setting" />
                            </a>
                            <div className="dropdown-menu">
                              <button className="dropdown-item" type="button">Action</button>
                              <button className="dropdown-item" type="button">Another action</button>
                              <button className="dropdown-item" type="button">Something else here</button>
                            </div>
                          </div>
                        </div>
                        <div className="conversation-body">
                          <div className="msg justify-content-center">
                            <div className="font-weight-semibold font-size-12"> 7:57PM </div>
                          </div>
                          <div className="msg msg-recipient">
                            <div className="m-r-10">
                              <div className="avatar avatar-image">
                                <img src="../assets/images/avatars/thumb.jpg" alt="" />
                              </div>
                            </div>
                            <div className="bubble">
                              <div className="bubble-wrapper">
                                <span>Hey, let me show you something nice!</span>
                              </div>
                            </div>
                          </div>
                          <div className="msg msg-sent">
                            <div className="bubble">
                              <div className="bubble-wrapper">
                                <span>Sae</span>
                              </div>
                            </div>
                          </div>
                          <div className="msg msg-recipient">
                            <div className="m-r-10">
                              <div className="avatar avatar-image">
                                <img src="../assets/images/avatars/thumb.jpg" alt="" />
                              </div>
                            </div>
                            <div className="bubble">
                              <div className="bubble-wrapper">
                                <span>SAE!</span>
                              </div>
                            </div>
                          </div>
                          <div className="msg msg-recipient">
                            <div className="m-r-10">
                              <div className="avatar avatar-image">
                                <img src="../assets/images/avatars/thumb.jpg" alt="" />
                              </div>
                            </div>
                            <div className="bubble">
                              <div className="bubble-wrapper">
                                <span>SAE!</span>
                              </div>
                            </div>
                          </div>
                          <div className="msg msg-recipient">
                            <div className="m-r-10">
                              <div className="avatar avatar-image">
                                <img src="../assets/images/avatars/thumb.jpg" alt="" />
                              </div>
                            </div>
                            <div className="bubble">
                              <div className="bubble-wrapper">
                                <span>SAE!</span>
                              </div>
                            </div>
                          </div>
                          <div className="msg msg-sent">
                            <div className="bubble">
                              <div className="bubble-wrapper">
                                <span>Wow, that was cool!</span>
                              </div>
                            </div>
                          </div>
                        </div> 
                        <div className="conversation-footer">
                          <input className="chat-input" type="text" placeholder="Type a message..." />
                          <ul className="list-inline d-flex align-items-center m-b-0">
                            <li className="list-inline-item m-r-15">
                              <a className="text-gray font-size-20" href="javascript:void(0);" data-toggle="tooltip" title="Emoji">
                                <i className="anticon anticon-smile" />
                              </a>
                            </li> 
                            <li className="list-inline-item m-r-15">
                              <a className="text-gray font-size-20" href="javascript:void(0);" data-toggle="tooltip" title="Attachment">
                                <i className="anticon anticon-paper-clip" />
                              </a>
                            </li>    
                            <li className="list-inline-item">
                              <button className="d-none d-md-block btn btn-primary">
                                <span className="m-r-10">Send</span>
                                <i className="far fa-paper-plane" />
                              </button>
                              <a href="javascript:void(0);" className="text-gray font-size-20 d-md-none d-block">
                                <i className="far fa-paper-plane" />
                              </a>
                            </li>
                          </ul>
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
    }
}

export default StudentChat