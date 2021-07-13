import React, {Component} from 'react';

class StudentMail extends React.Component {
    render() {
        return (
            <div className="page-container">
            <div className="main-content">
              <div className="mail-wrapper">
                <div className="mail-nav" id="mail-nav">
                  <div className="p-h-25 m-t-25">
                    <div className="p-b-15 d-md-none d-inline-block">
                      <a className="text-dark font-size-18 mail-close-nav" href="javascript:void(0);">
                        <i className="anticon anticon-menu-fold" />
                      </a>
                    </div>
                    <button className="btn btn-primary w-100 mail-open-compose">
                      <i className="anticon anticon-edit" />
                      <span className="m-l-5">Compose</span>
                    </button>
                  </div>
                  <div className="p-v-15">
                    <ul className="menu nav flex-column">
                      <li className="nav-item">
                        <a href className="nav-link active">
                          <i className="anticon anticon-inbox" />
                          <span>Inbox</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href className="nav-link">
                          <i className="anticon anticon-mail" />
                          <span>Sent Mail</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href className="nav-link">
                          <i className="anticon anticon-file-done" />
                          <span>Drafts</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href className="nav-link">
                          <i className="anticon anticon-star" />
                          <span>Favorite</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href className="nav-link">
                          <i className="anticon anticon-delete" />
                          <span>Deleted</span>
                        </a>
                      </li>
                    </ul>
                    <ul className="menu nav flex-column m-t-25">
                      <li className="nav-item">
                        <h6 className="nav-link d-inline-block">Labels</h6>
                      </li>
                      <li className="nav-item">
                        <a href className="nav-link">
                          <div className="d-flex align-items-center m-r-10">
                            <span className="badge badge-success badge-dot m-r-10" />
                            <span>Works</span>
                          </div>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href className="nav-link">
                          <div className="d-flex align-items-center m-r-10">
                            <span className="badge badge-danger badge-dot m-r-10" />
                            <span>Private</span>
                          </div>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href className="nav-link">
                          <div className="d-flex align-items-center m-r-10">
                            <span className="badge badge-warning badge-dot m-r-10" />
                            <span>Important</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div id="mail-list" className="mail-content">
                  <div className="p-h-10 p-v-5 d-md-none d-inline-block">
                    <a className="text-dark font-size-18 mail-open-nav" href="javascript:void(0);">
                      <i className="anticon anticon-menu-unfold" />
                    </a>
                  </div>
                  <div className="row d-flex align-items-center justify-content-between p-10">
                    <div className="col-md-2 d-none d-md-flex align-items-baseline m-b-10">
                      <div className="checkbox d-inline-block">
                        <input id="checkAll" type="checkbox" />
                        <label htmlFor="checkAll" />
                      </div>
                      <select className="custom-select">
                        <option selected>Fliter By</option>
                        <option value="All">All</option>
                        <option value="Unread">Unread</option>
                        <option value="Date">Date</option>
                        <option value="Name">Name</option>
                      </select>
                    </div>
                    <div className="d-flex align-items-center col-md-3 m-b-10">
                      <div className="input-affix m-r-10">
                        <i className="prefix-icon anticon anticon-search" />
                        <input type="text" className="form-control" placeholder="Search" />
                      </div>
                      <button className="btn btn-icon btn-default">
                        <i className="anticon anticon-reload" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="mail-list">
                      <div className="checkbox d-inline-block">
                        <input id="mail-checkbox-1" type="checkbox" />
                        <label htmlFor="mail-checkbox-1" />
                      </div>
                      <table className="table list-info">
                        <tbody><tr>
                            <td className="list-sender">
                              <div className="media align-items-center">
                                <div className="avatar avatar-image avatar-sm">
                                  <img src="../assets/images/avatars/thumb.jpg" alt="" />
                                </div>
                                <h6 className="m-l-10 m-b-0">Erin Gonzales</h6>
                              </div>
                            </td>
                            <td className="list-content">
                              <div className="list-msg">
                                <span className="list-title">All flight trooper</span>
                                <span className="m-h-5 d-none d-lg-inline-block"> - </span>
                                <span className="list-text text-gray"> Hi Erin, Somebody's coming. Oh! Luke! Where's Leia? What? She didn't come back? I thought she was with you. We got separated. Hey, we better go look for her. Take the squad ahead. We'll meet at the shield generator at 0300. Come on, Artoo. We'll need your scanners. Don't worry, Master Luke. We know what to do. And you said it was </span>
                              </div>
                            </td>
                            <td className="list-date">
                              <span>12:06PM</span>
                            </td>
                          </tr>
                        </tbody></table>
                    </div>
                    <div className="mail-list">
                      <div className="checkbox d-inline-block">
                        <input id="mail-checkbox-2" type="checkbox" />
                        <label htmlFor="mail-checkbox-2" />
                      </div>
                      <table className="table list-info">
                        <tbody><tr>
                            <td className="list-sender">
                              <div className="media align-items-center">
                                <div className="avatar avatar-image avatar-sm">
                                  <img src="../assets/images/avatars/thumb.jpg" alt="" />
                                </div>
                                <h6 className="m-l-10 m-b-0">Darryl Day</h6>
                              </div>
                            </td>
                            <td className="list-content">
                              <div className="list-msg">
                                <span className="list-title">What are you doing?</span>
                                <span className="m-h-5 d-none d-lg-inline-block"> - </span>
                                <span className="list-text text-gray"> Hi Darryl, Good luck. You're gonna need it. General Madine. We have stolen a small Imperial shuttle. Disguised as a cargo ship, and using a secret Imperial code, a strike team will land on the moon and deactivate the shield generator. Sounds dangerous. I wonder who they found to</span>
                              </div>
                            </td>
                            <td className="list-date">
                              <span>5:34AM</span>
                            </td>
                          </tr>
                        </tbody></table>
                    </div>
                    <div className="mail-list">
                      <div className="checkbox d-inline-block">
                        <input id="mail-checkbox-3" type="checkbox" />
                        <label htmlFor="mail-checkbox-3" />
                      </div>
                      <table className="table list-info">
                        <tbody><tr>
                            <td className="list-sender">
                              <div className="media align-items-center">
                                <div className="avatar avatar-image avatar-sm">
                                  <img src="../assets/images/avatars/thumb.jpg" alt="" />
                                </div>
                                <h6 className="m-l-10 m-b-0">Marshall Nichols</h6>
                              </div>
                            </td>
                            <td className="list-content">
                              <div className="list-msg">
                                <span className="list-title">Leave that to me</span>
                                <span className="m-h-5 d-none d-lg-inline-block"> - </span>
                                <span className="list-text text-gray"> Run! Yes. A Jedi's strength flows from the Force. But beware of the dark side. Anger...fear...aggression. The dark side of the Force are they. </span>
                              </div>
                            </td>
                            <td className="list-date">
                              <span>Feb 6</span>
                            </td>
                          </tr>
                        </tbody></table>
                    </div>
                    <div className="mail-list">
                      <div className="checkbox d-inline-block">
                        <input id="mail-checkbox-4" type="checkbox" />
                        <label htmlFor="mail-checkbox-4" />
                      </div>
                      <table className="table list-info">
                        <tbody><tr>
                            <td className="list-sender">
                              <div className="media align-items-center">
                                <div className="avatar avatar-image avatar-sm">
                                  <img src="../assets/images/avatars/thumb.jpg" alt="" />
                                </div>
                                <h6 className="m-l-10 m-b-0">Virgil Gonzales</h6>
                              </div>
                            </td>
                            <td className="list-content">
                              <div className="list-msg">
                                <span className="list-title">My Brother</span>
                                <span className="m-h-5 d-none d-lg-inline-block"> - </span>
                                <span className="list-text text-gray">Fredo, you're my older brother, and I love you. But don't ever take sides with anyone against the Family again.</span>
                              </div>
                            </td>
                            <td className="list-date">
                              <span>Feb 4</span>
                            </td>
                          </tr>
                        </tbody></table>
                    </div>
                    <div className="mail-list">
                      <div className="checkbox d-inline-block">
                        <input id="mail-checkbox-5" type="checkbox" />
                        <label htmlFor="mail-checkbox-5" />
                      </div>
                      <table className="table list-info">
                        <tbody><tr>
                            <td className="list-sender">
                              <div className="media align-items-center">
                                <div className="avatar avatar-image avatar-sm">
                                  <img src="../assets/images/avatars/thumb.jpg" alt="" />
                                </div>
                                <h6 className="m-l-10 m-b-0">Nicole Wyne</h6>
                              </div>
                            </td>
                            <td className="list-content">
                              <div className="list-msg">
                                <span className="list-title">Major Keys to Success</span>
                                <span className="m-h-5 d-none d-lg-inline-block"> - </span>
                                <span className="list-text text-gray">Major key, don’t fall for the trap, stay focused. It’s the ones closest to you that want to see you fail. </span>
                              </div>
                            </td>
                            <td className="list-date">
                              <span>Feb 3</span>
                            </td>
                          </tr>
                        </tbody></table>
                    </div>
                    <div className="mail-list">
                      <div className="checkbox d-inline-block">
                        <input id="mail-checkbox-6" type="checkbox" />
                        <label htmlFor="mail-checkbox-6" />
                      </div>
                      <table className="table list-info">
                        <tbody><tr>
                            <td className="list-sender">
                              <div className="media align-items-center">
                                <div className="avatar avatar-image avatar-sm">
                                  <img src="../assets/images/avatars/thumb.jpg" alt="" />
                                </div>
                                <h6 className="m-l-10 m-b-0">Riley Newman</h6>
                              </div>
                            </td>
                            <td className="list-content">
                              <div className="list-msg">
                                <span className="list-title">Take my coffee</span>
                                <span className="m-h-5 d-none d-lg-inline-block"> - </span>
                                <span className="list-text text-gray">Caramelization saucer robust aftertaste decaffeinated qui aged. Caramelization black white black wings, mocha americano white half and half variety latte.</span>
                              </div>
                            </td>
                            <td className="list-date">
                              <span>Feb 2</span>
                            </td>
                          </tr>
                        </tbody></table>
                    </div>
                    <div className="mail-list">
                      <div className="checkbox d-inline-block">
                        <input id="mail-checkbox-7" type="checkbox" />
                        <label htmlFor="mail-checkbox-7" />
                      </div>
                      <table className="table list-info">
                        <tbody><tr>
                            <td className="list-sender">
                              <div className="media align-items-center">
                                <div className="avatar avatar-image avatar-sm">
                                  <img src="../assets/images/avatars/thumb.jpg" alt="" />
                                </div>
                                <h6 className="m-l-10 m-b-0">Pamela Wanda</h6>
                              </div>
                            </td>
                            <td className="list-content">
                              <div className="list-msg">
                                <span className="list-title">The cat was chasing the mouse scratch</span>
                                <span className="m-h-5 d-none d-lg-inline-block"> - </span>
                                <span className="list-text text-gray">Poop in the plant pot. Shove bum in owner's face like camera lens. Licks your face play time, or pooping rainbow while flying i</span>
                              </div>
                            </td>
                            <td className="list-date">
                              <span>Jan 29</span>
                            </td>
                          </tr>
                        </tbody></table>
                    </div>
                    <div className="mail-list">
                      <div className="checkbox d-inline-block">
                        <input id="mail-checkbox-8" type="checkbox" />
                        <label htmlFor="mail-checkbox-8" />
                      </div>
                      <table className="table list-info">
                        <tbody><tr>
                            <td className="list-sender">
                              <div className="media align-items-center">
                                <div className="avatar avatar-image avatar-sm">
                                  <img src="../assets/images/avatars/thumb.jpg" alt="" />
                                </div>
                                <h6 className="m-l-10 m-b-0">Emily Shaw</h6>
                              </div>
                            </td>
                            <td className="list-content">
                              <div className="list-msg">
                                <span className="list-title">Put A Cheeseburger</span>
                                <span className="m-h-5 d-none d-lg-inline-block"> - </span>
                                <span className="list-text text-gray">Epic cheeseburgers come in all kinds of manifestations, but we want them in and around our mouth no matter what. </span>
                              </div>
                            </td>
                            <td className="list-date">
                              <span>Jan 29</span>
                            </td>
                          </tr>
                        </tbody></table>
                    </div>
                    <div className="mail-list">
                      <div className="checkbox d-inline-block">
                        <input id="mail-checkbox-9" type="checkbox" />
                        <label htmlFor="mail-checkbox-9" />
                      </div>
                      <table className="table list-info">
                        <tbody><tr>
                            <td className="list-sender">
                              <div className="media align-items-center">
                                <div className="avatar avatar-image avatar-sm">
                                  <img src="../assets/images/avatars/thumb.jpg" alt="" />
                                </div>
                                <h6 className="m-l-10 m-b-0">Shane Hawkins</h6>
                              </div>
                            </td>
                            <td className="list-content">
                              <div className="list-msg">
                                <span className="list-title">BLUTH</span>
                                <span className="m-h-5 d-none d-lg-inline-block"> - </span>
                                <span className="list-text text-gray">The Man Inside Me seems well reviewed. George Bush doesn't care about black puppets. No borders, no limits… go ahead, touch the Cornballer… you know best?</span>
                              </div>
                            </td>
                            <td className="list-date">
                              <span>Jan 27</span>
                            </td>
                          </tr>
                        </tbody></table>
                    </div>
                    <div className="mail-list">
                      <div className="checkbox d-inline-block">
                        <input id="mail-checkbox-10" type="checkbox" />
                        <label htmlFor="mail-checkbox-10" />
                      </div>
                      <table className="table list-info">
                        <tbody><tr>
                            <td className="list-sender">
                              <div className="media align-items-center">
                                <div className="avatar avatar-image avatar-sm">
                                  <img src="../assets/images/avatars/thumb-10.jpg" alt="" />
                                </div>
                                <h6 className="m-l-10 m-b-0">Wyatt Wallace</h6>
                              </div>
                            </td>
                            <td className="list-content">
                              <div className="list-msg">
                                <span className="list-title">Pretty sweet, right?</span>
                                <span className="m-h-5 d-none d-lg-inline-block"> - </span>
                                <span className="list-text text-gray">Cotton candy topping chupa chups pudding dessert cake muffin gummi bears jelly beans. Lemon drops jelly beans powder apple pie jelly-o macaroon cake.</span>
                              </div>
                            </td>
                            <td className="list-date">
                              <span>Jan 26</span>
                            </td>
                          </tr>
                        </tbody></table>
                    </div>
                    <div className="mail-list">
                      <div className="checkbox d-inline-block">
                        <input id="mail-checkbox-11" type="checkbox" />
                        <label htmlFor="mail-checkbox-11" />
                      </div>
                      <table className="table list-info">
                        <tbody><tr>
                            <td className="list-sender">
                              <div className="media align-items-center">
                                <div className="avatar avatar-image avatar-sm">
                                  <img src="../assets/images/avatars/thumb-11.jpg" alt="" />
                                </div>
                                <h6 className="m-l-10 m-b-0">Alice Matthews</h6>
                              </div>
                            </td>
                            <td className="list-content">
                              <div className="list-msg">
                                <span className="list-title">Believe it or not?</span>
                                <span className="m-h-5 d-none d-lg-inline-block"> - </span>
                                <span className="list-text text-gray">Believe it or not I'm walking on air. I never thought I could feel so free. Flying away on a wing and a prayer.</span>
                              </div>
                            </td>
                            <td className="list-date">
                              <span>Jan 25</span>
                            </td>
                          </tr>
                        </tbody></table>
                    </div>
                  </div>
                  <div className="m-t-20 text-right">
                    <ul className="pagination justify-content-end">
                      <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                      <li className="page-item active"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                  </div>
                </div>
                <div id="mail-content" className="mail-content d-none">
                  <div className="d-lg-flex align-items-center justify-content-between">
                    <div className="media align-items-center m-b-15">
                      <a id="back" className="text-gray m-r-15 font-size-18" href="javascript:void(0);">
                        <i className="anticon anticon-left-circle" />
                      </a>
                      <div className="avatar avatar-image">
                        <img src="../assets/images/avatars/thumb.jpg" alt="" />
                      </div>
                      <div className="m-l-10">
                        <h6 className="m-b-0">Erin Gonzales</h6>
                        <span className="text-muted font-size-13">To: nathan@themenate.com</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center m-b-15 p-l-30">
                      <span className="text-gray m-r-15">12:06PM</span>
                      <a className="text-gray font-size-18 m-r-20">
                        <i className="fas fa-reply" />
                      </a>
                      <a className="text-gray font-size-18 m-r-20">
                        <i className="far fa-star" />
                      </a>
                      <a className="text-gray font-size-18 m-r-20">
                        <i className="far fa-trash-alt" />
                      </a>
                    </div>
                  </div>
                  <div className="m-t-30 p-h-30">
                    <h4>All flight trooper</h4>
                    <div className="m-t-30">
                      <p>Hi Erin,</p>
                      <p>Somebody's coming. Oh! Luke! Where's Leia? What? She didn't come back? I thought she was with you. We got separated. Hey, we better go look for her. Take the squad ahead. We'll meet at the shield generator at 0300. Come on, Artoo. We'll need your scanners. Don't worry, Master Luke. We know what to do. And you said it was pretty here. Ugh!.</p>
                      <p>This can't be! Artoo, you're playing the wrong message. There will be no bargain. We're doomed. I will not give up my favorite decoration. I like Captain Solo where he is. Artoo, look! Captain Solo. And he's still frozen in carbonite. What could possibly have come over Master Luke. Is it something I did? He never expressed any unhappiness with my work. Oh! Oh! Hold it! Ohh!</p>
                      <p>Your fleet has lost. And your friends on the Endor moon will not survive. There is no escape, my young apprentice. </p>
                      <p>Moruth Doole, </p>
                    </div>
                    <div className="m-t-30">
                      <a className="file" href style={{minWidth: '200px'}}>
                        <div className="media align-items-center">
                          <div className="m-r-15 font-size-30">
                            <i className="anticon anticon-file-pdf text-danger" />
                          </div>
                          <div>
                            <h6 className="mb-0">Prospectus.doc</h6>
                            <span className="font-size-13 text-muted">1MB</span>
                          </div>
                        </div>
                      </a>
                      <a className="file" href style={{minWidth: '200px'}}>
                        <div className="media align-items-center">
                          <div className="m-r-15 font-size-30">
                            <i className="anticon anticon-file-excel text-success" />
                          </div>
                          <div>
                            <h6 className="mb-0">Financial_Report.xls</h6>
                            <span className="font-size-13 text-muted">652KB</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div id="mail-compose" className="mail-content d-none">
                  <div className="p-b-15 m-r-15 d-md-none d-inline-block">
                    <a className="text-dark font-size-18 mail-open-nav" href="javascript:void(0);">
                      <i className="anticon anticon-menu-unfold" />
                    </a>
                  </div>
                  <h5 className="m-b-20">New Message</h5>
                  <form>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="To" />
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Subject" />
                    </div>
                    <div id="mail-compose-editor" />
                  </form>
                  <div className="text-right m-t-25">
                    <button className="m-r-10 btn btn-default mail-close-compose">Discard</button>
                    <button className="btn btn-primary">Send</button>
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

export default StudentMail