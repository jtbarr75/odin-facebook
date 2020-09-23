import React, { Fragment } from "react"
import Posts from './Posts/Posts'

class User extends React.Component {
  render () {
    const { user, currentUser } = this.props
    let edit;
    if (currentUser.id == user.i) {
      edit = (
        <p><a href="#" className="btn btn-xs btn-primary">Edit Profile</a></p>
      )
    }
    let friendOptions = <p>Not Friends yet</p>;
    // if (user.friends.includes(currentUser.id)) {
    //   friendOptions = <p><span className="label label-success">Friends!</span></p>
    // } else if (currentUser.notifications.sentFriendRequests.includes(user.id)) {
    //   friendOptions = <p><span className="label label-primary">Request Sent</span></p>
    // } else if (currentUser.notifications.recievedFriendRequests.includes(user.id)) {
    //   friendOptions = <p><span className="label label-primary">Accept Friend Request</span></p>
    // } else {
    //   friendOptions = <p><span className="label label-primary">Send Friend Request</span></p>
    // }
    
    return (
      <Posts currentUser={this.props.currentUser} />
    )
  }
}

export default User
