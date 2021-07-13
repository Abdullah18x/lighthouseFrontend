import React from 'react'
import {Link} from '@reach/router'

const sectionList = (props) => {
    return(
        <tr>
                <td>{props.sectionId}</td>
                <td>{props.section}</td>
                <td>{props.lecturers}</td>
                <td>{props.students}</td>
                
                <td>
                  <div className="dropdown dropdown-animated scale-left">
                    <a className="text-gray font-size-18" href="javascript:void(0);" data-toggle="dropdown">
                      <i className="anticon anticon-ellipsis" />
                    </a>
                    <div className="dropdown-menu">
                      <Link 
                          className="dropdown-item"
                          to='/admin/sectionDetails'
                          state={{
                            sectionId:props.sectionId
                          }}
                        >
                          <i className="anticon anticon-eye" />
                          <span className="m-l-10">View</span>
                      </Link>
                      <Link 
                          className="dropdown-item"
                          to='/admin/editSection'
                          state={{
                            sectionId:props.sectionId
                          }}
                        >
                          <i className="anticon anticon-eye" />
                          <span className="m-l-10">Edit</span>
                      </Link>
                      {/* <button className="dropdown-item" type="button" onClick={props.remove}>
                        <i className="anticon anticon-delete" />
                        <span className="m-l-10">Remove</span>
                      </button> */}
                    </div>
                  </div>
                </td>
              </tr>
    )
}

export default sectionList