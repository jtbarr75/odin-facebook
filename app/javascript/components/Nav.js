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

  handleNotificationClick(event, notification) {
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    event.preventDefault()
    axios.patch(`/api/v1/notifications/${notification.id}`)
      .then((response) => {
        window.location.href = `/posts/${response.data.id}`
      })
      .catch((err) => console.log(err))
  }

  render () {
    const { currentUser } = this.state;
    if ( Object.keys(currentUser).length === 0) {
      return null;
    }
    let notifications;
    if (currentUser.notifications.length > 0) {
      notifications = currentUser.notifications.map((notification, index) => {
          return (
          <a href={`/api/v1/notifications/${notification.id}`} key={index} className="dropdown-item" 
            id={`notification-${notification.id}`} onClick={(event) => this.handleNotificationClick(event, notification)}>
            {notification.message}
          </a>)
      })
    } else {
      notifications = <a href="#" className="dropdown-item">Nothing new...</a>
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">FriendPost</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/users">Users</a>
            </li>
          </ul>
          <form className="form-inline mr-auto" action="/action_page.php">
            <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
            <button className="btn btn-success" type="submit">Search</button>
          </form>
          <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Notifications <span className="badge badge-primary"> {currentUser.notifications.length} </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                {notifications}
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {currentUser.name}
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Your Profile</a>
                <a className="dropdown-item" href="#">Edit Profile</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" onClick={this.handleLogout}>Sign Out</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav
