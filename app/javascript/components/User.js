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
      <Fragment>
        <div className="container">
          <h2 align="left ">{user.name}</h2>
          {/* <img href={user.picture && user.picture.url} > */}
          <p><a href="#">{user.friends.length} Friends</a></p>
          <p>Email: { user.email }</p>
          {edit}
          {friendOptions}
          <Posts currentUser={currentUser} posts={this.props.user.posts}/>
        </div>
      </Fragment>
    )
  }
}

export default User
