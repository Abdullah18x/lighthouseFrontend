import React, {Component} from 'react';

class Search extends React.Component {
    render() {
        return (
            <div className="modal modal-left fade search" id="search-drawer">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header justify-content-between align-items-center">
                            <h5 className="modal-title">Search</h5>
                            <button type="button" className="close" data-dismiss="modal">
                                <i className="anticon anticon-close" />
                            </button>
                        </div>
                        <div className="modal-body scrollable">
                            <div className="input-affix">
                                <i className="prefix-icon anticon anticon-search" />
                                <input type="text" className="form-control" placeholder="Search" />
                            </div>
                            <div className="m-t-30">
                                <h5 className="m-b-20">Files</h5>
                                <div className="d-flex m-b-30">
                                    <div className="avatar avatar-cyan avatar-icon">
                                        <i className="anticon anticon-file-excel" />
                                    </div>
                                    <div className="m-l-15">
                                        <a href="javascript:void(0);" className="text-dark m-b-0 font-weight-semibold">Quater Report.exl</a>
                                        <p className="m-b-0 text-muted font-size-13">by Finance</p>
                                    </div>
                                </div>
                                <div className="d-flex m-b-30">
                                    <div className="avatar avatar-blue avatar-icon">
                                        <i className="anticon anticon-file-word" />
                                    </div>
                                    <div className="m-l-15">
                                        <a href="javascript:void(0);" className="text-dark m-b-0 font-weight-semibold">Documentaion.docx</a>
                                        <p className="m-b-0 text-muted font-size-13">by Developers</p>
                                    </div>
                                </div>
                                <div className="d-flex m-b-30">
                                    <div className="avatar avatar-purple avatar-icon">
                                        <i className="anticon anticon-file-text" />
                                    </div>
                                    <div className="m-l-15">
                                        <a href="javascript:void(0);" className="text-dark m-b-0 font-weight-semibold">Recipe.txt</a>
                                        <p className="m-b-0 text-muted font-size-13">by The Chef</p>
                                    </div>
                                </div>
                                <div className="d-flex m-b-30">
                                    <div className="avatar avatar-red avatar-icon">
                                        <i className="anticon anticon-file-pdf" />
                                    </div>
                                    <div className="m-l-15">
                                        <a href="javascript:void(0);" className="text-dark m-b-0 font-weight-semibold">Project Requirement.pdf</a>
                                        <p className="m-b-0 text-muted font-size-13">by Project Manager</p>
                                    </div>
                                </div>
                            </div>
                            <div className="m-t-30">
                                <h5 className="m-b-20">Members</h5>
                                <div className="d-flex m-b-30">
                                    <div className="avatar avatar-image">
                                        <img src="assets/images/avatars/thumb.jpg" alt="" />
                                    </div>
                                    <div className="m-l-15">
                                        <a href="javascript:void(0);" className="text-dark m-b-0 font-weight-semibold">Erin Gonzales</a>
                                        <p className="m-b-0 text-muted font-size-13">UI/UX Designer</p>
                                    </div>
                                </div>
                                <div className="d-flex m-b-30">
                                    <div className="avatar avatar-image">
                                        <img src="assets/images/avatars/thumb.jpg" alt="" />
                                    </div>
                                    <div className="m-l-15">
                                        <a href="javascript:void(0);" className="text-dark m-b-0 font-weight-semibold">Darryl Day</a>
                                        <p className="m-b-0 text-muted font-size-13">Software Engineer</p>
                                    </div>
                                </div>
                                <div className="d-flex m-b-30">
                                    <div className="avatar avatar-image">
                                        <img src="assets/images/avatars/thumb.jpg" alt="" />
                                    </div>
                                    <div className="m-l-15">
                                        <a href="javascript:void(0);" className="text-dark m-b-0 font-weight-semibold">Marshall Nichols</a>
                                        <p className="m-b-0 text-muted font-size-13">Data Analyst</p>
                                    </div>
                                </div>
                            </div>
                            <div className="m-t-30">
                                <h5 className="m-b-20">News</h5>
                                <div className="d-flex m-b-30">
                                    <div className="avatar avatar-image">
                                        <img src="assets/images/others/img-1.jpg" alt="" />
                                    </div>
                                    <div className="m-l-15">
                                        <a href="javascript:void(0);" className="text-dark m-b-0 font-weight-semibold">5 Best Handwriting Fonts</a>
                                        <p className="m-b-0 text-muted font-size-13">
                                            <i className="anticon anticon-clock-circle" />
                                            <span className="m-l-5">25 Nov 2018</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search