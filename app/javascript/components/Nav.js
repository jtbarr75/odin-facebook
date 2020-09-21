import React, { Fragment } from "react"
import axios from "axios";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(e) {
    e.preventDefault()
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    axios.delete('/users/sign_out')
    .then(() => {
      window.location.href = "/login"
    })
  }

  render () {
    const { currentUser } = this.state;
    if ( Object.keys(currentUser).length === 0) {
      return null;
    }
    let notifications;

    if (currentUser.notifications.length > 0) {
      notifications = currentUser.notifications.map(notification => {
        <li className={notification.unread ? "bg-light-grey" : ""}>
          <a href="#" id={`notification-${notification.id}`}>{notification.message}</a>
        </li>
      })
    } else {
      notifications = <li>Nothing new...</li>
    }

    const navSection = 
      <Fragment>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Notifications 
            <span className="badge">
              {currentUser.notifications.length}
            </span> <span className="caret"></span>
          </a>
          <ul className="dropdown-menu scrollable-menu" role="menu">
            {notifications}
          </ul>
        </li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            {currentUser.name} <span className="caret"></span>
          </a>
          <ul className="dropdown-menu">
            <li><a href="#">Your Profile</a></li>
            <li><a href="#">Edit Profile</a></li>
            <li role="separator" className="divider"></li>
            <li ><button onClick={this.handleLogout}>Sign Out</button></li>
          </ul>
        </li>
      </Fragment>

    return (
      <Fragment>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a href="/" className="navbar-brand">Home</a>
            </div>

            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><a href="/users">Users</a></li>
              </ul>
              <form className="navbar-form navbar-left">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search"/>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
              <ul className="nav navbar-nav navbar-right">
                {navSection}
              </ul>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default Nav
