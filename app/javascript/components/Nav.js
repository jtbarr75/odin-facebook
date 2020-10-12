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

  setToken() {
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
  }

  handleLogout(e) {
    e.preventDefault()
    this.setToken()
    axios.delete('/users/sign_out')
    .then(() => {
      window.location.href = "/login"
    })
  }

  handleNotificationClick(event, notification) {
    this.setToken()

    event.preventDefault()
    axios.patch(`/api/v1/notifications/${notification.id}`)
      .then((response) => {
        if (response.ok) {
          window.location.href = `/${response.data.type}/${response.data.parent.id}`
          this.updateNotifications(response.data.notification)
        }
      })
      .catch((err) => {
        window.flash_messages.addMessage({ id: "notification404", text: 'Notification no longer exists', type: 'danger' })
        this.setState({currentUser: err.response.data.currentUser})
      })
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
    const { currentUser } = this.state
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
    const notifications = [...this.state.currentUser.notifications]
    return notifications.filter(n => n.unread == true).length
  }

  render () {
    const { currentUser } = this.state;
    if ( Object.keys(currentUser).length === 0) {
      return null;
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand font-weight-bold" href="/">FriendPost</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/users">Users</a>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Notifications <span className="badge badge-light"> {this.unreadNotifications()} </span>
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
                <a className="dropdown-item" href={`/users/edit`}>Edit Profile</a>
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
