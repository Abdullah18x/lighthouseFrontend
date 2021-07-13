import React from 'react'
import {Link} from '@reach/router'

const viewTeacherList = (props) => {
    return(
        <tr>
                  <td>{props.id}</td>
                  <td>{props.name}</td>
                  <td>{props.userName}</td>
                  <td>{props.email}</td>
                  <td>{props.status}</td>
                  <td>
                    <div className="dropdown dropdown-animated scale-left">
                      <a className="text-gray font-size-18" href="javascript:void(0);" data-toggle="dropdown">
                        <i className="anticon anticon-ellipsis" />
                      </a>
                      <div className="dropdown-menu">
                        <Link 
                          className="dropdown-item"
                          to='/admin/teachersProfile'
                          state={{
                            teacherId:props.id
                          }}
                        >
                          <i className="anticon anticon-eye" />
                          <span className="m-l-10">View</span>
                        </Link>
                        <Link 
                          className="dropdown-item"
                          to='/admin/assigneSection'
                          state={{
                            teacherId:props.id
                          }}
                        >
                          <i className="anticon anticon-eye" />
                          <span className="m-l-10">Assign Section</span>
                        </Link>
                        {/* <button onClick={props.assignSection} className="dropdown-item" type="button">
                          <i className="anticon anticon-download" />
                          <span className="m-l-10">Assign Section</span>
                        </button> */}
                        <button id={props.id} onClick={props.deleteLecturer} className="dropdown-item" type="button">
                          <i className="anticon anticon-delete" />
                          <span className="m-l-10">Delete</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
    )
}

export default viewTeacherList