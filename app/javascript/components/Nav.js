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
          <a href="#" className="dropdown-item" id={`notification-${notification.id}`}>{notification.message}</a>
      })
    } else {
      notifications = <a href="#" className="dropdown-item">Nothing new...</a>
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">FriendPost</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Users</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {currentUser.name}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Your Profile</a>
                <a className="dropdown-item" href="#">Edit Profile</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" onClick={this.handleLogout}>Sign Out</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Notifications <span className="badge"> {currentUser.notifications.length} </span> <span className="caret"></span>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {notifications}
              </div>
            </li>
          </ul>
          <form className="form-inline" action="/action_page.php">
            <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
            <button className="btn btn-success" type="submit">Search</button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Nav
