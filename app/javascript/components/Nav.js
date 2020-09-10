import React from "react"
import PropTypes from "prop-types"

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser
    }
  }

  render () {
    const { currentUser } = this.state;
    let navSection;
    let notifications;

    if (currentUser.notifications.length > 0) {
      notifications = currentUser.notifications.map(notification => {
        <li className={notification.unread ? "bg-light-grey" : ""}>
          <a href="#" method="PATCH" id={`notification-${notification.id}`}>{notification.message}</a>
        </li>
      })
    } else {
      notifications = <li>Nothing new...</li>
    }

    if (currentUser.signedIn) {
      navSection = 
      <>
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
            <li ><a href="#">Sign Out</a></li>
          </ul>
        </li>
        </>
    } else {
      navSection = (<><li><a href="#">Sign Up</a></li>
        <li><a href="#">Sign In</a></li></>)
    }

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

// Nav.propTypes = {
//   currentUser: PropTypes.string
// };
export default Nav
