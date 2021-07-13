import React, {Component} from 'react';

class StudentView extends React.Component {
    render() {
        return (
<div className="page-container">
  <div className="main-content">
    <div className="page-header">
      <h2 className="header-title">OOP - Assignment 1</h2>
      <div className="header-sub-title">
        <nav className="breadcrumb breadcrumb-dash">
          <a href="#" className="breadcrumb-item"><i className="anticon anticon-home m-r-5" />Home</a>
          <a className="breadcrumb-item" href="#">Assignments</a>
          <span className="breadcrumb-item active">OOP - Assignment 1</span>
        </nav>
      </div>
    </div>
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="media align-items-center">
                      <div className="m-l-10">
                        <h4 className="m-b-0">OOP - Assignment 1</h4>
                      </div>
                    </div>
                    <div>
                      <span className="badge badge-pill badge-blue">In Progress</span>
                    </div>
                  </div>
                  <div className="m-t-40">
                    <h6>Description:</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias recusandae, officiis! Doloremque non molestiae quis accusamus consequuntur ad animi minima quo, veniam iusto dicta voluptatem eos, incidunt ratione. Praesentium, quaerat.</p>
                    <p>Ah, it is a rock, though. Should beat everything. Gob: There's not a lot of logic to it. Let's make Ann the backup, okay? Very good way to think about her, as a backup.</p>
                  </div>
                  <div className="d-md-flex m-t-30 align-items-center justify-content-between">
                    <div className="m-t-10 m-l-auto">
                      <span className="font-weight-semibold m-r-10 m-b-5 text-dark">Due Date: </span>
                      <span>16 Dec 2020</span>
                    </div>
                  </div>
                </div>
                <div className="m-t-30">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a className="nav-link active" data-toggle="tab" href="#project-details-tasks">Lab Activities (8)</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="lab-acitivity-1-tab" data-toggle="tab" href="#lab-activity-1" role="tab" aria-controls="lab-activity-1" aria-selected="false">Lab Activity 1</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="home-acitivity-1-tab" data-toggle="tab" href="#home-activity-1" role="tab" aria-controls="home-activity-1" aria-selected="false">Home Activity 1</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#project-details-comments">Comments</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#project-details-attachment">Attachment</a>
                    </li>
                  </ul>
                  <div className="tab-content m-t-15 p-25">
                    <div className="tab-pane fade show active" id="project-details-tasks">
                      <div className="checkbox m-b-20">
                        <input id="task-1" type="checkbox" />
                        <label htmlFor="task-1">Lab Acitivity - 1</label>
                      </div>
                      <div className="checkbox m-b-20">
                        <input id="task-2" type="checkbox" />
                        <label htmlFor="task-2">Lab Acitivity - 2</label>
                      </div>
                      <div className="checkbox m-b-20">
                        <input id="task-3" type="checkbox" defaultChecked />
                        <label htmlFor="task-3">Lab Acitivity - 3</label>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="project-details-comments">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item p-h-0">
                          <div className="media m-b-15">
                            <div className="avatar avatar-image">
                              <img src="../assets/images/avatars/thumb.jpg" alt="" />
                            </div>
                            <div className="media-body m-l-20">
                              <h6 className="m-b-0">
                                <a href className="text-dark">Lillian Stone</a>
                              </h6>
                              <span className="font-size-13 text-gray">28th Jul 2018</span>
                            </div>
                          </div>
                          <p>The palatable sensation we lovingly refer to as The Cheeseburger has a distinguished and illustrious history. It was born from humble roots, only to rise to well-seasoned greatness.</p>
                        </li>
                        <li className="list-group-item p-h-0">
                          <div className="media m-b-15">
                            <div className="avatar avatar-image">
                              <img src="../assets/images/avatars/thumb.jpg" alt="" />
                            </div>
                            <div className="media-body m-l-20">
                              <h6 className="m-b-0">
                                <a href className="text-dark">Victor Terry</a>
                              </h6>
                              <span className="font-size-13 text-gray">28th Jul 2018</span>
                            </div>
                          </div>
                          <p>The palatable sensation we lovingly refer to as The Cheeseburger has a distinguished and illustrious history. It was born from humble roots, only to rise to well-seasoned greatness.</p>
                        </li>
                        <li className="list-group-item p-h-0">
                          <div className="media m-b-15">
                            <div className="avatar avatar-image">
                              <img src="../assets/images/avatars/thumb-10.jpg" alt="" />
                            </div>
                            <div className="media-body m-l-20">
                              <h6 className="m-b-0">
                                <a href className="text-dark">Wilma Young</a>
                              </h6>
                              <span className="font-size-13 text-gray">28th Jul 2018</span>
                            </div>
                          </div>
                          <p>The palatable sensation we lovingly refer to as The Cheeseburger has a distinguished and illustrious history. It was born from humble roots, only to rise to well-seasoned greatness.</p>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-pane fade" id="project-details-attachment">
                      <div className="file" style={{minWidth: '200px'}}>
                        <div className="media align-items-center">
                          <div className="avatar avatar-icon avatar-cyan rounded m-r-15">
                            <i className="anticon anticon-file-exclamation font-size-20" />
                          </div>
                          <div>
                            <h6 className="mb-0">Mockup.zip</h6>
                            <span className="font-size-13 text-muted">7MB</span>
                          </div>
                        </div>
                      </div>
                      <div className="file" style={{minWidth: '200px'}}>
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
                      </div>
                    </div>
                    <div className="tab-pane fade" id="lab-activity-1" role="tabpanel" aria-labelledby="lab-activity-1-tab">
                      <h3>Activity 1:</h3>
                      <p>Use above functions to implement basic objects using lines, rectangles, ellipses.</p>
                    </div>
                    <div className="tab-pane fade" id="home-activity-1" role="tabpanel" aria-labelledby="home-activity-1-tab">
                      <h3>Home Activity 1:</h3>
                      <p>Use all the functions provided to build a simple sketch that involves basic polygons</p>
                      <button id="trigger-loading" className="btn btn-primary m-r-5">
                        <i className="anticon anticon-loading m-r-5" />
                        <span>Open IDE</span>
                      </button>
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

export default StudentView