import React, {Component} from 'react'

class ErrorPage extends Component {
    goToLogin = () => {
        window.location.href='/'
    }
    render() {
        return (
            // <button type='button' onClick={this.goToLogin}>Could not verify login</button>
            <div className="app">
  <div className="container-fluid">
    <div className="d-flex full-height p-v-20 flex-column justify-content-between">
      <div className="d-none d-md-flex p-h-40">
        <img src="assets/images/logo/logo.png" alt="" />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="p-v-30">
              <h1 className="font-weight-semibold display-1 text-primary lh-1-2">404</h1>
              <h2 className="font-weight-light font-size-30">Whoops! Looks like you got lost</h2>
              <p className="lead m-b-30">We couldnt find what you were looking for.</p>
              <a onClick={this.goToLogin} href className="btn btn-primary btn-tone">Go Back</a>
            </div>
          </div>
          <div className="col-md-6 m-l-auto">
            <img className="img-fluid" src="assets/images/others/error-2.png" alt="" />
          </div>
        </div>
      </div>
      <div className="d-none d-md-flex  p-h-40 justify-content-between">
        <span className>Copyright © 2020 COMSATS University. All rights reserved.</span>
      </div>
    </div>
  </div>
</div>

        )
    }
    
}

export default ErrorPage