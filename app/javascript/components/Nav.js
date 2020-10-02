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
        console.log(response)
        window.location.href = `/${response.data.type}/${response.data.parent.id}`
        this.updateNotifications(response.data.notification)
      })
      .catch((err) => console.log(err))
  }

  updateNotifications(notification) {
    let notificationsCopy = [...this.state.currentUser.notifications]
    notificationsCopy = notificationsCopy.map(notif => notif.id == notification.id ? notification : notif)
    this.setState({
      currentUser: {
        ...this.state.currentUser,
        notifications: notificationsCopy
      }
    })
  }

  notificationSection() {
    const { currentUser } = this.props
    let notifications;
    if (currentUser.notifications.length > 0) {
      notifications = currentUser.notifications.map((notification, index) => {
          return (
          <a 
            href={`/api/v1/notifications/${notification.id}`} 
            key={index} 
            className={notification.unread ? "dropdown-item bg-primary text-white" : "dropdown-item"}
            id={`notification-${notification.id}`} 
            onClick={(event) => this.handleNotificationClick(event, notification)}
          >
            {notification.message}
          </a>)
      })
    } else {
      notifications = <a href="#" className="dropdown-item">Nothing new...</a>
    }
    return notifications
  }

  unreadNotifications(){
    const notifications = [...this.props.currentUser.notifications]
    return notifications.filter(n => n.unread == true).length
  }

  render () {
    const { currentUser } = this.state;
    if ( Object.keys(currentUser).length === 0) {
      return null;
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
                Notifications <span className="badge badge-primary"> {this.unreadNotifications()} </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right notifications" aria-labelledby="navbarDropdown">
                {this.notificationSection()}
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {currentUser.name}
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href={`/users/${currentUser.id}`}>Your Profile</a>
                <a className="dropdown-item" href={`/users/${currentUser.id}/edit`}>Edit Profile</a>
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
